import React from 'react';

function SiteUpdate({ date, details }) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateString = new Date(date).toLocaleDateString('en-us', options);
    return (
        <li className='update'>
            <div className='date'>{dateString}</div>
            <ul>
                {details.map((detail, idxD) => {
                    return <li key={`update-${idxD}`}>{detail}</li>
                })}
            </ul>
        </li>
    );
}

export default SiteUpdate;