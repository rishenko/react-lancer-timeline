import React from 'react';
import LegendEntry from './LegendEntry';
import './FactionLegend.css';

function FactionLegend({ factions, toggleFactionVisibility, visibleFactions, showActionMessage }) {
  return (
    <div className="faction-legend">
      {Object.keys(factions).map((key) => (
        <LegendEntry key={key} faction={factions[key]} factionKey={key} toggleFactionVisibility={toggleFactionVisibility} showActionMessage={showActionMessage} isVisible={visibleFactions[key]} />
      ))}
    </div>
  );
}

export default FactionLegend;
