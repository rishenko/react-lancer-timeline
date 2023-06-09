import React from 'react';
import LegendEntry from './LegendEntry';
import './FactionLegend.css';

function FactionLegend({ factions, toggleFactionVisibility, visibleFactions }) {
  return (
    <div className="faction-legend">
      {Object.keys(factions).map((key) => (
        <LegendEntry key={key} faction={factions[key]} factionKey={key} toggleFactionVisibility={toggleFactionVisibility} isVisible={visibleFactions[key]} />
      ))}
    </div>
  );
}

export default FactionLegend;
