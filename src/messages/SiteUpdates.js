import React from 'react';
import './SiteUpdates.css';
import SiteUpdate from './SiteUpdate';


function SiteUpdates({ updates }) {
    return (
        <div id="site-updates-container" className="notice-container">
            <h3>Site Updates</h3>
            <div id="site-updates" className="notice">
                <ul className="site-updates-list">
                    {updates.sort((a, b) => { return new Date(b.date) - new Date(a.date) }).map((update, idx) => {
                        return <SiteUpdate key={idx} date={update.date} details={update.details} />
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SiteUpdates;