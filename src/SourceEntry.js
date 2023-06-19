import React, {useContext} from 'react';
import { ActionMessageContext } from './ActionMessageContext';

function SourceEntry({ source, sourceKey, toggleSourceVisibility, isVisible }) {
  const showActionMessage = useContext(ActionMessageContext);
  const message = <span>Toggling filter {source.name} {isVisible ? 'ON' : 'OFF'}.</span>;
  return (
    <button onClick={() => {toggleSourceVisibility(sourceKey); showActionMessage(message)}}>
      <div className={`source ${source.name} ${isVisible ? '' : 'hidden'}`}>
        <div className="sname">{source.name}</div>
      </div>
    </button>
  );
}

export default SourceEntry;
