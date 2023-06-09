import React, { useState, useEffect, useRef } from 'react';
import data from './data/lancer-timeline-data.json';
import { ReactComponent as Logo } from './imgs/powered_by_Lancer.svg';
import FactionFilter from './filters/FactionFilter';
import SourceFilter from './filters/SourceFilter';
import PublishingAttributeFilter from './filters/PublishingAttributeFilter';
import Timeline from './timeline/Timeline';
import SourceTable from './source-table/SourceTable';
import { ActionMessageContext } from './ActionMessageContext.js';
import { EditModeContext } from './data-entry/EditModeContext.js';
import TimelineDataEntry from './data-entry/TimelineDataEntry';
import SiteMessages from './messages/SiteMessages';
import './App.css';

function App() {
  const [timelineData, setTimelineData] = useState([]);
  const [actionMessage, setActionMessage] = useState({});
  const [visibleFactions, setVisibleFactions] = useState({});
  const [visibleSources, setVisibleSources] = useState({});
  const [visiblePublishingAttributes, setVisiblePublishingAttributes] = useState({});
  const [timelineEntryAction, setTimelineEntryAction] = useState({});
  const [editMode, setEditMode] = useState({ isOn: false });

  useEffect(() => {
    // Initialize all factions, sources, and publishing attributes as visible
    const factionsVisibility = {};
    Object.keys(data.factions).forEach(factionKey => {
      factionsVisibility[factionKey] = true;
    });
    setVisibleFactions(factionsVisibility);

    const sourcesVisibility = {};
    Object.keys(data.sources).forEach(sourceKey => {
      if (data.sources[sourceKey].defaultFilteredStatus) {
        sourcesVisibility[sourceKey] = false;
      } else {
        sourcesVisibility[sourceKey] = true;
      }
    });
    setVisibleSources(sourcesVisibility);

    const publishingAttributesVisibility = {};
    Object.keys(data.publishingAttributes).forEach(attributeKey => {
      publishingAttributesVisibility[attributeKey] = true;
    });
    setVisiblePublishingAttributes(publishingAttributesVisibility);

    setTimelineData(data.timeline);

    setActionMessage({ "message": "" });
  }, []);

  useEffect(() => {
    if (timelineEntryAction.action === "remove") {
      var uuid = timelineEntryAction.entry.uuid;
      setTimelineData(timelineData.filter((entry) => { return entry.uuid !== uuid }));
    }
  }, [timelineEntryAction])

  /* Category visibility functions */
  function toggleVisibilities(allCategoryKey, categoryKey, visibleCategories, categoryVisibilityFunction) {
    if (categoryKey === allCategoryKey) {
      var toggleVal = !visibleCategories[categoryKey];
      const categoriesVisibility = {};
      Object.keys(visibleCategories).forEach(categoryKey => {
        categoriesVisibility[categoryKey] = toggleVal;
      });
      categoryVisibilityFunction(categoriesVisibility);
    } else {
      categoryVisibilityFunction(prevState => ({
        ...prevState,
        [categoryKey]: !prevState[categoryKey]
      }));
    }
  }

  function toggleFactionVisibility(factionKey) {
    toggleVisibilities("all-factions", factionKey, visibleFactions, setVisibleFactions);
  };

  function toggleSourceVisibility(sourceKey) {
    toggleVisibilities("all-sources", sourceKey, visibleSources, setVisibleSources);
  };

  function togglePublishingAttributeVisibility(attributeKey) {
    const attributeVisibility = !visiblePublishingAttributes[attributeKey];

    const sourcesVisibility = {};
    Object.keys(data.sources).forEach(sourceKey => {
      if (data.sources[sourceKey].publishingAttributes.includes(attributeKey)) {
        sourcesVisibility[sourceKey] = attributeVisibility;
      } else {
        sourcesVisibility[sourceKey] = visibleSources[sourceKey];
      }
    })
    setVisibleSources(sourcesVisibility);


    setVisiblePublishingAttributes(prevState => ({
      ...prevState,
      [attributeKey]: !prevState[attributeKey]
    }));
  }

  /* Message display function */
  const actionMessageRef = useRef(null);
  function showActionMessage(message, type) {
    type = type ? type : "notice";
    var classList = actionMessageRef.current.classList
    setActionMessage({ "message": message , "type": type });
    for (var classIndex = classList.length-1; classIndex>=0; classIndex--){
      classList.remove(classList[classIndex]);
    }
    void actionMessageRef.current.offsetWidth;
    classList.add(type);
    classList.add("animate");
    void actionMessageRef.current.offsetWidth;
  }

  return (
    <ActionMessageContext.Provider value={showActionMessage}>
      <EditModeContext.Provider value={editMode}>
        <div>
          <div id="action-message" ref={actionMessageRef}>{actionMessage["message"]}</div>
          <h1>Unofficial Lancer Universe Timeline</h1>
          <div className="intro">
            <SiteMessages />
            <div className="overview">
              <h2>Overview</h2>
              <p>
                This is an unofficial timeline for the amazing <a href="https://massifpress.com/lancer" target="_blank" rel="noreferrer">Lancer TTRPG</a> universe. It is a living document,
                which is to say that the timeline will be updated as more content is released for Lancer.
              </p>
              <p>
                If you would like to contribute your time to this project - whether functionality, typos,
                styling, or timeline entries - please <a href="https://github.com/rishenko/react-lancer-timeline" target="_blank" rel="noreferrer">visit the project page on Github</a>.
              </p>
            </div>
            <h2>Sources</h2>
            <p>
              The following table provides information and links to the publications that source many of the timeline entries.
            </p>
            <SourceTable sources={data.sources} publishingAttributes={data.publishingAttributes} />
            <h2>Filters</h2>
            <p>
              Please keep the following in mind when working with filters:
            </p>
            <ul>
              <li>Each filter button can be clicked to toggle the visibility of all associated timeline entries.</li>
              <li><em>Faction</em> filters toggle the visibility of timeline entries associated with that faction.</li>
              <li><em>Source</em> filters toggle the visibility of timeline entries associated with that source.</li>
              <li><em>Publishing Attribute</em> filters toggle the visibility of all sources with that publishing attribute.</li>
              <li>A timeline entry will remain visible as long as one or more factions AND one or more sources are still visible.</li>
              <li>Sources representing campaign modules are automatically filtered out by default to avoid accidentally spoilers.</li>
            </ul>
            <div className="filters">
              <div className="legend">
                <h3>Factions</h3>
                <FactionFilter factions={data.factions} toggleFactionVisibility={toggleFactionVisibility} visibleFactions={visibleFactions} />
              </div>
              <div className="sources">
                <h3>Sources</h3>
                <SourceFilter sources={data.sources} toggleSourceVisibility={toggleSourceVisibility} visibleSources={visibleSources} />
              </div>
              <div className="publishing-attributes">
                <h3>Publishing Attributes</h3>
                <PublishingAttributeFilter publishingAttributes={data.publishingAttributes} togglePublishingAttributeVisibility={togglePublishingAttributeVisibility} visiblePublishingAttributes={visiblePublishingAttributes} />
              </div>
            </div>
          </div>

          <TimelineDataEntry allData={data} timelineData={timelineData} setTimelineData={setTimelineData} factions={data.factions} sources={data.sources} timelineEntryAction={timelineEntryAction} setEditMode={setEditMode} />

          <Timeline timelineData={timelineData} factions={data.factions} sources={data.sources} visibleSources={visibleSources} visibleFactions={visibleFactions} setTimelineEntryAction={setTimelineEntryAction} />

          <div className="legal">
            <Logo alt="Powered by Lancer graphic by Massif Press" />
            <p><em>Unofficial Lancer Universe Timeline</em> is not an official Lancer product; it is a third party work, and is not affiliated with Massif Press. <em>Unofficial Lancer Universe Timeline</em> is published via the Lancer Third Party License. Lancer is copyright Massif Press.</p>
            <p>All timeline entries are owned and copyrighted by their respective authors and publishers.</p>
          </div>
        </div>
      </EditModeContext.Provider>
    </ActionMessageContext.Provider>
  );
}

export default App;