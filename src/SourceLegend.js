import React from 'react';
import SourceEntry from './SourceEntry';

function SourceLegend({ sources, toggleSourceVisibility, visibleSources }) {
  return (
    <div className="source-legend">
      {Object.keys(sources).map((key) => (
        <SourceEntry key={key} source={sources[key]} sourceKey={key} toggleSourceVisibility={toggleSourceVisibility} isVisible={visibleSources[key]} />
      ))}
    </div>
  );
}

export default SourceLegend;
