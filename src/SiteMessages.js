import React from 'react';
import './SiteMessages.css';
import SiteUpdates from './SiteUpdates'
import SiteMessage from './SiteMessage'
import messageData from './site-messages.json';

function SiteMessages({ }) {
    return (
        <div id="site-messages">
            <SiteUpdates updates={messageData.updates} />
            {messageData.messages.map((message, idx) => {
                return <SiteMessage key={idx} type={message.type} title={message.title} message={message.message} />
            })}
        </div>
    )
}

export default SiteMessages;