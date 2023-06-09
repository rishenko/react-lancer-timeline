import React from 'react';
import TimelineEntry from './TimelineEntry';
import './Timeline.css';

function Timeline({ timelineEntries, factions, sources, visibleFactions, visibleSources }) {
    function isTimelineEntryVisible(entry) {

        if (entry.sources == null)
            entry.sources = [{ "sourceKey": "no-source", "sourceLocation": "" }];

        var anySourceVisible = false;
        entry.sources.forEach(source => {
            anySourceVisible = visibleSources[source.sourceKey] || anySourceVisible;
        })

        return visibleFactions[entry.faction == null ? 'no-faction' : entry.faction] && anySourceVisible;
    }

    return (
        <div className="timeline">
            <h2>Timeline</h2>
            <ul>
                {timelineEntries.map((entry, index) => {
                   return isTimelineEntryVisible(entry) && <TimelineEntry key={index} entry={entry} factions={factions} sources={sources} />
                })}
            </ul>
        </div>
    );
}

export default Timeline;