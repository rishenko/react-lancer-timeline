import React, {useContext} from 'react';
import './PublishingAttributeEntry.css';
import { ActionMessageContext } from './ActionMessageContext';

function PublishingAttributeEntry({ publishingAttribute, publishingAttributeKey, togglePublishingAttributeVisibility, isVisible }) {
  const showActionMessage = useContext(ActionMessageContext);
  const message = <span>Toggling filter "{publishingAttribute.name}" {isVisible ? 'ON' : 'OFF'}.</span>;
  return (
    <button onClick={() => {togglePublishingAttributeVisibility(publishingAttributeKey); showActionMessage(message)}}>
      <div className={`publishing-attribute ${publishingAttributeKey} ${isVisible ? '' : 'hidden'}`}>
        <div className="paname">{publishingAttribute.name}</div>
      </div>
    </button>
  );
}

export default PublishingAttributeEntry;
