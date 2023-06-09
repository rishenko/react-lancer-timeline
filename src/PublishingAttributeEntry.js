import React from 'react';

function PublishingAttributeEntry({ publishingAttribute, publishingAttributeKey, togglePublishingAttributeVisibility, isVisible }) {
  return (
    <button onClick={() => togglePublishingAttributeVisibility(publishingAttributeKey)}>
      <div className={`publishing-attribute ${publishingAttribute.name} ${isVisible ? '' : 'hidden'}`}>
        <div className="paname">{publishingAttribute.name}</div>
      </div>
    </button>
  );
}

export default PublishingAttributeEntry;
