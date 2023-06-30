import React, { useEffect } from 'react';
import TimelineEntry from './TimelineEntry';
import './Timeline.css';

function Timeline({ timelineData, factions, sources, visibleFactions, visibleSources, setTimelineEntryAction }) {

    // update the timeline anytime timelineData changes, for live update purposes
    useEffect(() => { }, [timelineData]);

    /**
     * Sorting function. Logic works as follows:
     * 1. by era: BU comes before U
     * 2. by year: BU years are descending, while U years are ascending
     * 3. by intraYearIndex: lower index values are shown first, no index is treated as an index with '999'
     */
    function timelineSortByEraYearIndex(a, b) {
        var eraYearComparisonResult = -1;
        if (a.era < b.era) {
            eraYearComparisonResult = -1;
        } else if (a.era > b.era) {
            eraYearComparisonResult = 1;
        } else if (a.era === 'BU') {
            eraYearComparisonResult = ((a.year - b.year) * -1) || intraYearIndexComparison(a.intraYearIndex, b.intraYearIndex);
        } else if (a.era === 'U') {
            eraYearComparisonResult = (a.year - b.year) || intraYearIndexComparison(a.intraYearIndex, b.intraYearIndex);
        }

        return eraYearComparisonResult;
    }

    function intraYearIndexComparison(a, b) {
        var aEmpty = !(isNaN(a) || a == null);
        var bEmpty = !(isNaN(b) || b == null);
        if (aEmpty && bEmpty) {
            return a - b;
        } else if (aEmpty) {
            return -1;
        } else {
            return 1;
        }
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
                {timelineData.sort((a, b) => timelineSortByEraYearIndex(a, b)).map((entry, _index) => {
                    return isTimelineEntryVisible(entry) && <TimelineEntry key={entry.uuid} entry={entry} factions={factions} sources={sources} setTimelineEntryAction={setTimelineEntryAction} anchorId={window.location.href.slice(window.location.href.indexOf("#") + 1)} />
                })}
            </ul>
        </div>
    )
}

export default Timeline;