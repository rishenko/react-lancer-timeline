import React from 'react';
import './SourceTable.css';
import SourceTableEntry from './SourceTableEntry';

function SourceTable({ sources, publishingAttributes }) {
    return (
        <table id="source-table">
            <thead>
                <tr>
                    <th>Name</th><th>Publishing Attributes</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(sources).map((source) => {
                    return (
                        (source.name != "No Source") && <SourceTableEntry key={source.name} source={source} publishingAttributes={publishingAttributes} />
                    )
                })}
            </tbody>
        </table>
    );
}

export default SourceTable;