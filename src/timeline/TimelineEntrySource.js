import React from 'react';

function TimelineEntrySource({ sourceEntry, source }) {
  const sourceLocation = sourceEntry.sourceLocation === '' ? '' : ', ' + sourceEntry.sourceLocation

  return (
    <div className={`timeline-entry-source ${sourceEntry.sourceKey}`}>
      <a href={source.url ? source.url : "#"} target="_blank" rel="noreferrer">{source.name}</a> {sourceLocation}
    </div>
  );
}

export default TimelineEntrySource;
