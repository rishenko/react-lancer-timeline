import React from 'react';
import TimelineEntry from './TimelineEntry';
import './Timeline.css';

function Timeline({ timelineEntries, factions, sources, visibleFactions, visibleSources }) {

    function timelineSortByEraYearIndex(a, b) {
        var intraYearIndexA = a.intraYearIndex == null ? 999 : a.intraYearIndex;
        var intraYearIndexB = b.intraYearIndex == null ? 999 : b.intraYearIndex;
        var result = a.era < b.era && a.year > b.year && intraYearIndexA >= intraYearIndexB ? 1 : -1;
        console.log(result)
        return result;
    }

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
                {timelineEntries.sort((a, b) => timelineSortByEraYearIndex(a, b)).map((entry, index) => {
                   return isTimelineEntryVisible(entry) && <TimelineEntry key={index} entry={entry} factions={factions} sources={sources} />
                })}
            </ul>
        </div>
    );
}

export default Timeline;