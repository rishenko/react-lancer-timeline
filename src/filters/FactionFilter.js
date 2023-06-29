import React from 'react';
import FactionEntry from './FactionEntry';
import './FactionFilter.css';

function FactionFilter({ factions, toggleFactionVisibility, visibleFactions }) {
  return (
    <div className="faction-legend">
      {Object.keys(factions).map((key) => (
        <FactionEntry key={key} faction={factions[key]} factionKey={key} toggleFactionVisibility={toggleFactionVisibility} isVisible={visibleFactions[key]} />
      ))}
    </div>
  );
}

export default FactionFilter;
