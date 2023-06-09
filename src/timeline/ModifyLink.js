import { useContext } from 'react';
import { ActionMessageContext } from '../ActionMessageContext';
import { EditModeContext } from '../data-entry/EditModeContext';

function ModifyLink({ entry, setTimelineEntryAction, action }) {
    const showActionMessage = useContext(ActionMessageContext);
    const editMode = useContext(EditModeContext);

    const actionText = action.charAt(0).toUpperCase() + action.slice(1);

    async function modifyEntry() {
        setTimelineEntryAction({ "action": action, "entry": entry });
        showActionMessage(<span>{actionText} timeline entry "{entry.title}".</span>);
        if (action === "modify") {
            setTimeout(document.getElementById("year").scrollIntoView({ behavior: "auto" }), 750);
        }
    }

    return (
        editMode.isOn && <div className={`${action}-entry`} onClick={modifyEntry} title={`${actionText} timeline entry`}></div>
    )
}

export default ModifyLink