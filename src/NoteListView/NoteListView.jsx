import CourseDropdown from '../CourseDropdown/CourseDropdown.jsx'
import { useAppState, capitalizeString } from "../main.jsx"
import { useState } from 'react'

const allCoursesValue = "all"

function NoteListView() {
    const [selectedCourse, setSelectedCourse] = useState(allCoursesValue);
    return <>
        <CourseDropdown value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}/>
        <NoteList course={selectedCourse}/>
    </>
}

function NoteList({course}) {
    const notes = useAppState((state) => state.notes);
    const noteElements = []

    for (let i = 0; i < notes.length; ++i) {
        const note = notes[i]

        if (course != allCoursesValue && note.course.name != course) continue

        noteElements.push(
            <Note 
                note={note}
                key={note.id}
            />
        )
    }

    if (noteElements.length < 1) return <p>Ei muistiinpanoja!</p>

    return noteElements
}

export function Note({note}) {
    const removeNote = useAppState((state) => state.removeNote)
    return <div className="note">
        <h5>{note.timestamp + ' ' + capitalizeString(note.course.name) + ' (id ' + note.id.toString() + ')'}</h5>
        <p>{note.text}</p>
        <button onClick={() => removeNote(note)}>Delete</button>
    </div>
}

export default NoteListView;