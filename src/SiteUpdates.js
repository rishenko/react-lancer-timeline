import React from 'react';
import './SiteUpdates.css';
import updateData from './site-update-details.json';

function SiteUpdates() {
    return (
        <div id="site-updates-container" className="notice-container">
            <h3>SITE UPDATES</h3>
            <div id="site-updates" className="notice">
                <ul className="site-updates-list">
                    {updateData.updates.sort((a, b) => { return new Date(b.date) - new Date(a.date) }).map((update, idx) => {
                        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                        const dateString = new Date(update.date).toLocaleDateString('en-us', options);

                        return (
                            <li key={`update-${idx}`} className='update'>
                                <div className='date'>{dateString}</div>
                                <ul>
                                    {update.details.map((detail, idxD) => {
                                        return <li key={`update-${idx}-${idxD}`}>{detail}</li>
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SiteUpdates;