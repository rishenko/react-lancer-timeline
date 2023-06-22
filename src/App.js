import React, { useContext, useState, useEffect, useRef } from 'react';
import data from './lancer-timeline-data.json';
import { ReactComponent as Logo } from './imgs/powered_by_Lancer.svg';
import FactionLegend from './FactionLegend';
import SourceLegend from './SourceLegend';
import PublishingAttributeLegend from './PublishingAttributeLegend';
import Timeline from './Timeline';
import SourceTable from './SourceTable';
import { ActionMessageContext } from './ActionMessageContext.js';
import SiteMessages from './SiteMessages';
import './App.css';

function App() {
  const [actionMessage, setActionMessage] = useState({});
  const [visibleFactions, setVisibleFactions] = useState({});
  const [visibleSources, setVisibleSources] = useState({});
  const [visiblePublishingAttributes, setVisiblePublishingAttributes] = useState({});

  useEffect(() => {
    // Initialize all factions, sources, and publishing attributes as visible
    const factionsVisibility = {};
    Object.keys(data.factions).forEach(factionKey => {
      factionsVisibility[factionKey] = true;
    });
    setVisibleFactions(factionsVisibility);

    const sourcesVisibility = {};
    Object.keys(data.sources).forEach(sourceKey => {
      sourcesVisibility[sourceKey] = true;
    });
    setVisibleSources(sourcesVisibility);

    const publishingAttributesVisibility = {};
    Object.keys(data.publishingAttributes).forEach(attributeKey => {
      publishingAttributesVisibility[attributeKey] = true;
    });
    setVisiblePublishingAttributes(publishingAttributesVisibility);

    setActionMessage({ "message": "" });
  }, []);

  function toggleFactionVisibility(factionKey) {
    setVisibleFactions(prevState => ({
      ...prevState,
      [factionKey]: !prevState[factionKey]
    }));
  };

  function toggleSourceVisibility(sourceKey) {
    setVisibleSources(prevState => ({
      ...prevState,
      [sourceKey]: !prevState[sourceKey]
    }));
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

  const actionMessageRef = useRef(null);
  function showActionMessage(message) {
    setActionMessage({ "message": message });
    actionMessageRef.current.classList.remove("animate");
    void actionMessageRef.current.offsetWidth;
    actionMessageRef.current.classList.add("animate");
    void actionMessageRef.current.offsetWidth;
  }

  return (
    <ActionMessageContext.Provider value={showActionMessage}>
      <div>
        <div id="action-message" ref={actionMessageRef}>{actionMessage["message"]}</div>
        <h1>Unofficial Lancer Universe Timeline</h1>
        <div className="intro">
          <SiteMessages />
          <div className="overview">
            <h2>Overview</h2>
            <p>
              This is an unofficial timeline for the amazing <a href="https://massifpress.com/lancer" target="_blank">Lancer TTRPG</a> universe. It is a living document,
              which is to say that the timeline will be updated as more content is released for Lancer.
            </p>
            <p>
              If you would like to contribute your time to this project - whether functionality, typos,
              styling, or timeline entries - please <a href="https://github.com/rishenko/react-lancer-timeline" target="_blank">visit the project page on Github</a>.
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
            <li>A timeline entry will remain visible as long as one or more associated factions AND one or more associated sources is still visible.</li>
          </ul>
          <div className="filters">
            <div className="legend">
              <h3>Factions</h3>
              <FactionLegend factions={data.factions} toggleFactionVisibility={toggleFactionVisibility} visibleFactions={visibleFactions} />
            </div>
            <div className="sources">
              <h3>Sources</h3>
              <SourceLegend sources={data.sources} toggleSourceVisibility={toggleSourceVisibility} visibleSources={visibleSources} />
            </div>
            <div className="publishing-attributes">
              <h3>Publishing Attributes</h3>
              <PublishingAttributeLegend publishingAttributes={data.publishingAttributes} togglePublishingAttributeVisibility={togglePublishingAttributeVisibility} visiblePublishingAttributes={visiblePublishingAttributes} />
            </div>
          </div>
        </div>

        <Timeline timelineEntries={data.timeline} factions={data.factions} sources={data.sources} visibleSources={visibleSources} visibleFactions={visibleFactions} />

        <div className="legal">
          <Logo alt="Powered by Lancer graphic by Massif Press" />
          <p><em>Unofficial Lancer Universe Timeline</em> is not an official Lancer product; it is a third party work, and is not affiliated with Massif Press. <em>Unofficial Lancer Universe Timeline</em> is published via the Lancer Third Party License. Lancer is copyright Massif Press.</p>
          <p>All timeline entries are owned and copyrighted by their respective authors and publishers.</p>
        </div>
      </div>
    </ActionMessageContext.Provider>
  );
}

export default App;