import { useState } from 'react';

function CopyLink({ elementId }) {
    const [copySuccess, setCopySuccess] = useState("")

    async function copyLinkToClipboard() {
        var href = window.location.href.split("#")[0] + `#${elementId}`;
        await navigator.clipboard.writeText(href);
        setCopySuccess("Link copied to clipboard.");
    }

    return (
        <div className="shareable-link" onClick={copyLinkToClipboard} title="Copy link to clipboard"></div>
    )
}

export default CopyLink