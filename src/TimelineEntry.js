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
  const lastFaction = entry.factions[numFactions - 1];
  var accentColor = factions[lastFaction].color;
  console.log(lastFaction);
  var backgroundStyle = { "--accent-color": accentColor };
  if (numFactions > 1) {
    var angle = indexVal % 2 == 0 ? 120 : 240;
    backgroundStyle = {
      "background-image": `linear-gradient(${angle}deg, ${entry.factions.map((faction, i) => `${factions[faction].color} ${i * 88 / numFactions}%, ${factions[faction].color} ${(i + 1) * 88 / numFactions}% `).join(",")}, var(--accent-color) 88%, var(--bgColor) 88.5%, var(--bgColor) 89%, var(--accent-color) 89.5%, var(--accent-color) 90.5%, var(--bgColor) 91%, var(--bgColor) 91.5%, var(--accent-color) 92%, var(--bgColor) 92.75%)`,
      "--accent-color": `${accentColor}`
    };
  }

  console.log(backgroundStyle);

  return (
    <li className={`timeline-entry ${entry.faction} ${sourceKeyText}`} style={{ "--accent-color": accentColor }}>
      <div className="date" style={backgroundStyle}>{entry.year}{entry.era}</div>
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