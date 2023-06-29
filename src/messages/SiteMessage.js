import React from 'react';
import './SiteMessage.css';

function SiteMessage({ type, title, message }) {
    return (
        <div className={`notice-container ${type}`}>
            <h3>{title}</h3>
            <div className="notice">
                {message}
            </div>
        </div>
    )
}

export default SiteMessage;