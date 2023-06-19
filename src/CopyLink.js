import { useState, useContext } from 'react';
import { ActionMessageContext } from './ActionMessageContext';

function CopyLink({ elementId, name }) {
    const showActionMessage = useContext(ActionMessageContext);

    async function copyLinkToClipboard() {
        var href = window.location.href.split("#")[0] + `#${elementId}`;
        await navigator.clipboard.writeText(href);
        showActionMessage(<span>Copied link to <em>{name}</em>.</span>);
    }

    return (
        <div className="shareable-link" onClick={copyLinkToClipboard} title="Copy link to clipboard"></div>
    )
}

export default CopyLink