import React, { useRef, useContext, useEffect } from 'react';
import TimelineEntrySource from './TimelineEntrySource';
import CopyLink from './CopyLink';
import ModifyLink from './ModifyLink';
import './TimelineEntry.css';
import { EditModeContext } from '../data-entry/EditModeContext';

function TimelineEntry({ entry, factions, sources, anchorId, setTimelineEntryAction }) {
  const editMode = useContext(EditModeContext);

  const timelineEntryRef = useRef(null);
  useEffect(() => {
    if (anchorId === entry.uuid) {
      setTimeout(() => timelineEntryRef.current.scrollIntoView({ behavior: "smooth" }), 750);
    }
  }, []);

  if (entry.sources === null || entry.sources === []) {
    entry.sources = [{ "sourceKey": "no-source", "sourceLocation": "" }];
  }

  // Build list of source keys for applicable style classes
  const sourceKeys = [];
  entry.sources.forEach(sourceEntry => {
    sourceKeys.push(sourceEntry.sourceKey);
  })
  var sourceKeyText = sourceKeys.join(' ');

  const numFactions = entry.factions.length;

  var accentColors = {};
  entry.factions.forEach((faction, i) => {
    var accentKey = "--accent-color-" + (i + 1);
    accentColors[accentKey] = factions[faction].color;
  });

  /* This is for processing hash ids in urls and scrolling to entry */


  /* add marker class for those timeline entries with {"marker": true} set */
  var markerClass = entry.marker ? "marker" : "";

  return (
    <li id={entry.uuid} className={`timeline-entry ${sourceKeyText} ${markerClass} factions-${numFactions} ${entry.edited && editMode.isOn ? "edited" : ""}`} style={accentColors} ref={timelineEntryRef}>
      <div className="factions">{entry.factions.map((faction, i) => {
        return faction !== 'no-faction' && <span key={faction} className={faction} style={{ "--faction-color": factions[faction].color }} title={factions[faction].name} />;
      })}</div>
      <div className="date" style={accentColors}><span>{entry.year}{entry.era}</span></div>
      <div className="title"><ModifyLink entry={entry} setTimelineEntryAction={setTimelineEntryAction} action="remove" /><ModifyLink entry={entry} setTimelineEntryAction={setTimelineEntryAction} action="modify" /><CopyLink elementId={entry.uuid} name={entry.title} />{entry.title}</div>
      <div className="descr">{entry.descr}</div>
      <div className="source" style={{ "--num-sources": entry.sources.length }}>
        {entry.sources.map(sourceEntry => {
          return <TimelineEntrySource key={sourceEntry.sourceKey} sourceEntry={sourceEntry} source={sources[sourceEntry.sourceKey]} />;
        })}
      </div>
    </li>
  );
}

export default TimelineEntry;