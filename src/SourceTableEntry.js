import React from 'react';

function SourceTableEntry({ source, publishingAttributes }) {
    return (
        <tr key={source.name}>
            <td className="name"><a href={source.url} target="_blank">{source.name}</a></td>
            <td className="publishing-attributes">{source.publishingAttributes.map((attr) => {
                return (
                    <div key={attr} className={`tag ${attr}`}>{publishingAttributes[attr].name}</div>
                );
            })}</td>
        </tr>
    );
}

export default SourceTableEntry;