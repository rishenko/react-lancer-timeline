import React from 'react';

function SourceEntry({ source, sourceKey, toggleSourceVisibility, isVisible, showActionMessage }) {
  return (
    <button onClick={() => {toggleSourceVisibility(sourceKey); showActionMessage(<span>Toggling filter {source.name} {isVisible ? 'ON' : 'OFF'}.</span>)}}>
      <div className={`source ${source.name} ${isVisible ? '' : 'hidden'}`}>
        <div className="sname">{source.name}</div>
      </div>
    </button>
  );
}

export default SourceEntry;
