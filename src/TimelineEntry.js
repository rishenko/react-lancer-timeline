import React from 'react';
import TimelineEntrySource from './TimelineEntrySource';
import './TimelineEntry.css';

function TimelineEntry({ entry, factions, sources }) {
  const faction = factions[entry.faction];

  if (entry.sources == null || entry.sources == []) {
    entry.sources = [{ "sourceKey": "no-source", "sourceLocation": "" }];
  }

  // Build list of source keys for applicable style classes
  const sourceKeys = [];
  entry.sources.forEach(sourceEntry => {
    sourceKeys.push(sourceEntry.sourceKey);
  })
  var sourceKeyText = sourceKeys.join(' ');

  return (
    <li className={`timeline-entry ${entry.faction} ${sourceKeyText}`} style={{ "--accent-color": faction.color }}>
      <div className="date">{entry.year}{entry.era}</div>
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