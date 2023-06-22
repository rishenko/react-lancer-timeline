import React from 'react';
import './SiteMessages.css';
import SiteUpdates from './SiteUpdates'

function SiteMessages({}) {
    return (
        <div id="site-messages">
            <SiteUpdates />
            {/* <div className="notice site-status"></div> */}
            <div className="notice-container request">
                <h3>COMMUNITY REQUEST</h3>
                <div className="notice">
                    Content creators with finalized timelines and published (or near published) works are encouraged to submit factions, sources, and timeline data.
                </div>
            </div>
        </div>
    )
}

export default SiteMessages;