import { useState } from 'react';

function CopyLink({ elementId, name, showActionMessage }) {

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