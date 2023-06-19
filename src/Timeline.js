import React from 'react';
import TimelineEntry from './TimelineEntry';
import './Timeline.css';

function Timeline({ timelineEntries, factions, sources, visibleFactions, visibleSources, showActionMessage }) {

    /**
     * Sorting function. Logic works as follows:
     * 1. by era: BU comes before U
     * 2. by year: BU years are descending, while U years are ascending
     * 3. by intraYearIndex: lower index values are shown first, no index is treated as an index with '999'
     */
    function timelineSortByEraYearIndex(a, b) {
        var intraYearIndexA = a.intraYearIndex == null ? 999 : a.intraYearIndex;
        var intraYearIndexB = b.intraYearIndex == null ? 999 : b.intraYearIndex;

        var eraYearComparisonResult = -1;
        if (a.era < b.era) {
            eraYearComparisonResult = -1;
        } else if (a.era > b.era) {
            eraYearComparisonResult = 1;
        } else if (a.era === 'BU') {
            eraYearComparisonResult = ((a.year - b.year) * -1) || intraYearIndexA - intraYearIndexB;
        } else if ( a.era === 'U') {
            eraYearComparisonResult = (a.year - b.year) || intraYearIndexA - intraYearIndexB;
        }

        return eraYearComparisonResult;
    }

    function isTimelineEntryVisible(entry) {
        if (entry.sources == null) {
            entry.sources = [{ "sourceKey": "no-source", "sourceLocation": "" }];
        }
        var anySourceVisible = false;
        entry.sources.forEach(source => {
            anySourceVisible = visibleSources[source.sourceKey] || anySourceVisible;
        })


        if (entry.factions == null) {
            entry.factions = ['no-faction'];
        }
        var anyFactionVisible = false;
        entry.factions.forEach(faction => {
            anyFactionVisible = visibleFactions[faction] || anyFactionVisible;
        })

        return anyFactionVisible && anySourceVisible;
    }

    return (
        <div className="timeline">
            <h2>Timeline</h2>
            <ul>
                {timelineEntries.sort((a, b) => timelineSortByEraYearIndex(a, b)).map((entry, index) => {
                    return isTimelineEntryVisible(entry) && <TimelineEntry key={entry.uuid} indexVal={index} entry={entry} factions={factions} sources={sources} showActionMessage={showActionMessage} anchorId={window.location.href.slice(window.location.href.indexOf("#") + 1)}/>
                })}
            </ul>
        </div>
    );
}

export default Timeline;