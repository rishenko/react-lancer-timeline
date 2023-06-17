import React from 'react';
import './PublishingAttributeEntry.css';

function PublishingAttributeEntry({ publishingAttribute, publishingAttributeKey, togglePublishingAttributeVisibility, isVisible }) {
  return (
    <button onClick={() => togglePublishingAttributeVisibility(publishingAttributeKey)}>
      <div className={`publishing-attribute ${publishingAttributeKey} ${isVisible ? '' : 'hidden'}`}>
        <div className="paname">{publishingAttribute.name}</div>
      </div>
    </button>
  );
}

export default PublishingAttributeEntry;
