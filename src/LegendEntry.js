import React from 'react';

function FactionEntry({ faction, factionKey, toggleFactionVisibility, isVisible, showActionMessage}) {
  return (
    <button onClick={() => {toggleFactionVisibility(factionKey); showActionMessage(<span>Toggling filter {faction.name} {isVisible ? 'ON' : 'OFF'}.</span>)}}>
      <div className={`faction ${factionKey} ${isVisible ? '' : 'hidden'}`} style={{"--faction-color": faction.color, color: '#fff'}}>
        <div className={`fname ${factionKey}`} style={{"--faction-color": faction.color, color: '#fff'}}>
          <div className={`logo ${factionKey}`}  title={faction.name} />
          {faction.name}
        </div>
      </div>
    </button>
  );
}

export default FactionEntry;
