import React from 'react';
import './PublishingAttributeEntry.css';

function PublishingAttributeEntry({ publishingAttribute, publishingAttributeKey, togglePublishingAttributeVisibility, isVisible, showActionMessage }) {
  return (
    <button onClick={() => {togglePublishingAttributeVisibility(publishingAttributeKey); showActionMessage(<span>Toggling filter {publishingAttribute.name} {isVisible ? 'ON' : 'OFF'}.</span>)}}>
      <div className={`publishing-attribute ${publishingAttributeKey} ${isVisible ? '' : 'hidden'}`}>
        <div className="paname">{publishingAttribute.name}</div>
      </div>
    </button>
  );
}

export default PublishingAttributeEntry;
