import React, { useEffect, useState, useContext } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import './TimelineDataEntry.css';
import { EditModeContext } from './EditModeContext';
import { ActionMessageContext } from '../ActionMessageContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TimelineDataEntry({ allData, timelineData, setTimelineData, factions, sources, timelineEntryAction, setEditMode }) {
    const showActionMessage = useContext(ActionMessageContext);

    const newEntry = () => {
        return {
            year: 5016,
            era: "U",
            title: "",
            descr: "",
            marker: false,
            intraYearIndex: null,
            uuid: crypto.randomUUID(),
            factions: ["no-faction"],
            sources: [{ sourceKey: "no-source", sourceLocation: "" }]
        };
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const editMode = useContext(EditModeContext);
    const { register, getValues, formState: { errors }, handleSubmit, control, reset } = useForm({ mode: "onChange", defaultValues: newEntry() });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sources',
    });

    useEffect(() => {
        if (timelineEntryAction.action === "modify") {
            reset(timelineEntryAction.entry);
        }
    }, [timelineEntryAction]);

    const onSubmit = (data) => {
        data["edited"] = true;
        const index = timelineData.findIndex(entry => entry.uuid === data.uuid);
        if (index !== -1) {
            const updatedTimeline = [...timelineData];
            updatedTimeline[index] = data;
            setTimelineData(updatedTimeline);
        } else {
            setTimelineData([...timelineData, data]);
        }
        openModal();
    }

    const downloadTimelineData = (isFinal) => {
        var newTimeline = [];
        var fileTag = "";
        if (isFinal) {
            newTimeline = timelineData.map(({ edited, ...rest }) => rest);
            fileTag = "final";
        } else {
            newTimeline = timelineData;
            fileTag = "editing";
        }
        allData['timeline'] = newTimeline;
        const json = JSON.stringify(allData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = ['timeline-data-', fileTag, '.json'].join("");
        link.click();
        showActionMessage(<span>Downloading timeline data.</span>);
    };

    const handleFileUpload = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileContents = e.target.result;
                try {
                    const jsonData = JSON.parse(fileContents);
                    setTimelineData(jsonData.timeline);
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                    showActionMessage(<span>There was an error parsing your timeline data file. Check your browser console for more information.</span>, "error");
                }
            };

            reader.readAsText(file);
            showActionMessage(<span>Uploading timeline data.</span>);
        }
    };

    const toggleEditMode = (e) => {
        var newEditMode = { isOn: !editMode.isOn };
        setEditMode(newEditMode);
    }

    // Modal related variables and functions;
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function startNew() {
        reset(newEntry());
        closeModal();
    }

    return (
        <div id="timeline-data-entry">
            <h2>Timeline Data Entry</h2>
            <div className="controller-buttons">
                <button name="editModeToggle" className={editMode.isOn ? "edit-mode-on" : ""} onClick={toggleEditMode}>Toggle Edit Mode</button>
                <button name="downloadTimelineData" onClick={() => { downloadTimelineData(false) }}>Download In-Progress Data</button>
                <button name="downloadTimelineData" onClick={() => { downloadTimelineData(true) }}>Download Final Data</button>
                <div><label htmlFor="timelineFileUpload">Upload JSON Timeline</label><input id="timelineFileUpload" name="timelineFileUpload" type="file" onChange={handleFileUpload} /></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={editMode.isOn ? "" : "hide-edit"}>
                <div id="editing-instructions">
                    <p>
                        You can create, edit, and delete timeline entries. Please keep the following in mind as you customize your own timeline:
                    </p>
                    <ul>
                        <li>
                            <strong>Editing an Entry</strong>: While in edit mode, you can edit an existing entry by clicking on the pencil icon to the right of the entry's title.
                        </li>
                        <li>
                            <strong>Modified Badge</strong>: Create and modified entries have an <code>edited</code> flag that adds a green MODIFIED badge that only appears while in edit mode. Data downloaded via the <em>Download Final Data</em> button will NOT contain the <code>edited</code> flag.
                        </li>
                        <li>
                            <strong>Removing an Entry</strong>: While in edit mode, you can remove an existing entry by clicking on the trashcan icon to the right of the entry's title.
                        </li>
                        <li>
                            <strong>Saving Your Timeline</strong>: You can save your timeline by clicking either the <em>Download In-Progress Data</em> or <em>Download Final Data</em> button. Clicking on <em>Download Final Data</em> strips the <code>edited</code> flag.
                        </li>
                        <li>
                            <strong>Loading Your Timeline</strong>: You can upload your customized timeline by clicking the <em>Upload JSON Timeline</em> button and selecting your JSON timeline file.
                        </li>
                        <li>
                            <strong>Resetting the Timeline</strong>: You can restore the original timeline by refreshing the page. However, will lose all changes when you refresh the page, so download often.
                        </li>
                        <li>
                            <strong>Changes Are Local Only</strong>: Timeline changes only apply to your local machine and will not be seen by others unless they upload a copy of the JSON file you downloaded.
                        </li>
                    </ul>
                </div>

                <label htmlFor="year">Year:</label>
                <div>
                    <input id="year" type="number" {...register("year", { valueAsNumber: true, required: true, pattern: /[0-9]+/ })} aria-invalid={errors.year ? "true" : "false"} />
                    {errors.year && errors.year.type === 'required' && <p role="alert">Year is required and must be a number.</p>}
                </div>

                <label htmlFor="uuid">UUID:</label>
                <div>
                    <input id="uuid" {...register("uuid", { required: true, pattern: uuidRegex })} aria-invalid={errors.uuid ? "true" : "false"} />
                    {errors.uuid && errors.uuid.type === 'required' && <p role="alert">UUID is required.</p>}
                    {errors.uuid && errors.uuid.type === 'pattern' && <p role="alert">UUID must be in the UUID format.</p>}
                </div>

                <label>Era:</label>
                <div className="eraInput">
                    <label htmlFor="era-bu">BU:</label>
                    <input id="era-bu" type="radio" defaultValue="BU" {...register("era")} />

                    <label htmlFor="era-u">U:</label>
                    <input id="era-u" type="radio" defaultValue="U" {...register("era")} />
                </div>

                <label htmlFor="marker">Marker:</label>
                <Controller
                    name="marker"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                        <input type="checkbox" name="marker" checked={value}
                            onChange={(e) => { onChange(e); }} />
                    )}
                />

                <label htmlFor="title">Title:</label>
                <div>
                    <input id="title" type="text" {...register("title", { required: true })} aria-invalid={errors.title ? "true" : "false"} />
                    {errors.title && errors.title.type === 'required' && <p role="alert">Title is required.</p>}
                </div>

                <label htmlFor="year">Intra-Year Index:</label>
                <div>
                    <input id="year" type="number" {...register("intraYearIndex", { valueAsNumber: true, pattern: /[0-9]+/ })} aria-invalid={errors.year ? "true" : "false"} />
                    {errors.intraYearIndex && errors.intraYearIndex.type === 'pattern' && <p role="alert">Intra-Year Index must be a number.</p>}
                </div>

                <label htmlFor="descr">Description:</label>
                <textarea id="descr" rows={4} cols={50} {...register("descr")} />

                <label htmlFor="factions" className="factionInputs">Factions:</label>
                <div>
                    <select id="factions" multiple={true} {...register("factions", { required: true })} aria-invalid={errors.factions ? "true" : "false"}>
                        {
                            Object.entries(factions).map((entry) => {
                                var [factionKey, faction] = entry;
                                return factionKey !== "all-factions" && <option key={factionKey} value={factionKey}>{faction.name}</option>;
                            })
                        }
                    </select>
                    {errors.factions && errors.factions.type === 'required' && <p role="alert">At least one faction must be selected.</p>}
                </div>

                <div className="sourceInputs">
                    <table className="sourceInputTable">
                        <thead><tr><th className="sourceSelect">Source</th><th className="sourceLocation">Source Location</th><th className="sourceActions">Row Actions</th></tr></thead>
                        <tbody>
                            {fields.map((field, index) => {
                                return (
                                    <tr className="sourceInput" key={field.id}>
                                        <td >
                                            <select  {...register(`sources.${index}.sourceKey`)}>
                                                {
                                                    Object.entries(sources).map((sourceEntry) => {
                                                        var [sourceKey, source] = sourceEntry;
                                                        return sourceKey !== "all-sources" && <option key={sourceKey} value={sourceKey}>{source.name}</option>;
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text"   {...register(`sources.${index}.sourceLocation`)} />
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => remove(index)}>  Remove </button>
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                    <button type="button" className="add-source" onClick={() => append({ sourceKey: "no-source", sourceLocation: "" })}>Add Source</button>
                </div>

                <button type="button" name="reset" onClick={() => { reset(newEntry()) }}>Reset Timeline Entry Form</button>
                <input type="submit" value="Create/Update Entry" />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="Entry Saved Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Timeline Entry Saved</h2>
                    <p><em>{getValues('title')}</em> has been saved.</p>
                    <div className="controller-buttons">
                        <button onClick={startNew}>Start New</button>
                        <button onClick={closeModal}>Keep Editing</button>
                    </div>

                </Modal>
            </form>
        </div >
    )
}

export default TimelineDataEntry;