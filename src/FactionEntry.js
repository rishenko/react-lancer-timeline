import React, {useContext} from 'react';
import { ActionMessageContext } from './ActionMessageContext';

function FactionEntry({ faction, factionKey, toggleFactionVisibility, isVisible}) {
  const showActionMessage = useContext(ActionMessageContext);
  const message = <span>Toggling filter {faction.name} {isVisible ? 'ON' : 'OFF'}.</span>;
  return (
    <button onClick={() => {toggleFactionVisibility(factionKey); showActionMessage(message)}}>
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
