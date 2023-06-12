import React from 'react';
import TimelineEntrySource from './TimelineEntrySource';
import './TimelineEntry.css';

function TimelineEntry({ indexVal, entry, factions, sources }) {

  if (entry.sources == null || entry.sources == []) {
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
  entry.factions.map((faction, i) => {
    var accentKey = "--accent-color-"+(i+1);
    accentColors[accentKey] = factions[faction].color;
  });

  return (
    <li className={`timeline-entry ${sourceKeyText} factions-${numFactions}`} style={accentColors}>
      <div className="factions">{entry.factions.map((faction, i) => {
        return <span key={faction} className={faction} style={{"--faction-color": factions[faction].color}} title={factions[faction].name}/>;
      })}</div>
      <div className="date" style={accentColors}>{entry.year}{entry.era}</div>
      <div className="title">{entry.title}</div>
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