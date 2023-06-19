import React from 'react';
import SourceEntry from './SourceEntry';

function SourceLegend({ sources, toggleSourceVisibility, visibleSources, showActionMessage }) {
  return (
    <div className="source-legend">
      {Object.keys(sources).map((key) => (
        <SourceEntry key={key} source={sources[key]} sourceKey={key} toggleSourceVisibility={toggleSourceVisibility} isVisible={visibleSources[key]} showActionMessage={showActionMessage} />
      ))}
    </div>
  );
}

export default SourceLegend;
