import React from 'react';

function SourceEntry({ source, sourceKey, toggleSourceVisibility, isVisible }) {
  return (
    <button onClick={() => toggleSourceVisibility(sourceKey)}>
      <div className={`source ${source.name} ${isVisible ? '' : 'hidden'}`}>
        <div className="sname">{source.name}</div>
      </div>
    </button>
  );
}

export default SourceEntry;
