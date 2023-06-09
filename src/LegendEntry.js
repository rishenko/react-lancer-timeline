import React from 'react';

function FactionEntry({ faction, factionKey, toggleFactionVisibility, isVisible }) {
  return (
    <button onClick={() => toggleFactionVisibility(factionKey)}>
      <div className={`faction ${factionKey} ${isVisible ? '' : 'hidden'}`}>
        <div className="fname" style={{background: faction.color, color: '#fff'}}>{faction.name}</div>
      </div>
    </button>
  );
}

export default FactionEntry;
