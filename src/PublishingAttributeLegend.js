import React from 'react';
import PublishingAttributeEntry from './PublishingAttributeEntry';

function PublishingAttributeLegend({ publishingAttributes, togglePublishingAttributeVisibility, visiblePublishingAttributes, showActionMessage }) {
  return (
    <div className="publishing-attribute-legend">
      {Object.keys(publishingAttributes).map((key) => (
        <PublishingAttributeEntry key={key} publishingAttribute={publishingAttributes[key]} publishingAttributeKey={key} togglePublishingAttributeVisibility={togglePublishingAttributeVisibility} isVisible={visiblePublishingAttributes[key]} showActionMessage={showActionMessage}/>
      ))}
    </div>
  );
}

export default PublishingAttributeLegend;
