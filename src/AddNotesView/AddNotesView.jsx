import CourseDropdown from '../CourseDropdown/CourseDropdown.jsx'
import { useAppState } from '../main.jsx'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export default function AddNotesView() {
    const courses = useAppState((state) => state.courses)
    const [selectedCourse, setSelectedCourse] = useState(courses[0].name)
    const [courseLocked, setCourseLocked] = useState(false)

    let selectorElement = null
    if (!courseLocked) selectorElement = <>
        <CourseDropdown
            includeAllCoursesOption={false}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
        />
    </>

    return (
        <>
            <h4>Add new notes for course</h4>

            {selectorElement}

            <NoteEditor selectedCourse={selectedCourse} setLocked={setCourseLocked}/>
        </>
    );
}

function getTimeStamp() {
    //timestamp muodossa YYYY-MM-DD HH:MM:SS
    const timestamp = new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
    .format(new Date())
    .replace('T', ' ');
    
    return timestamp
}

function NoteEditor({ selectedCourse, setLocked }) {
    const navigate = useNavigate();

    const addNote = useAppState((state) => state.addNote);
    const getUnusedNoteID = useAppState((state) => state.getUnusedNoteID);
    const getCourseByName = useAppState((state) => state.getCourseByName);
    const [notesCreated, setNotesCreated] = useState([])

    const [text, setText] = useState("");

    const saveNote = () => {
        const trimmedText = text.trim()

        if (trimmedText.length === 0) return;

        const noteID = getUnusedNoteID()

        setNotesCreated([...notesCreated,<p key={noteID}>{trimmedText}</p>])

        addNote({
            id: noteID,
            text: trimmedText,
            course: getCourseByName(selectedCourse),
            timestamp: getTimeStamp(),
        });

        //tyhjennä kenttä
        setText("");
        //lukitse kurssi
        if (typeof(setLocked) == 'function') setLocked(true)
    };

    

    return (
        <>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                name="note"
                id="note"
            />
            <br/>
            <button type="submit" onClick={saveNote}>Save</button>
            <button type="button" onClick={() => navigate('/')}>Back</button>
            {notesCreated}
        </>
    );
}
