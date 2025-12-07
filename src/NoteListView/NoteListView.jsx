import CourseDropdown from '../CourseDropdown/CourseDropdown.jsx'
import { useAppState, capitalizeString } from "../main.jsx"
import { useState } from 'react'

const allCoursesValue = "all"

function NoteListView() {
    const [selectedCourse, setSelectedCourse] = useState(allCoursesValue);
    return <>
        <CourseDropdown selectedCourse={selectedCourse} handleSelectedCourse={(e) => setSelectedCourse(e.target.value)}/>
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

    return noteElements
}

function Note({note}) {
    return <div className="note">
        <h5>{note.timestamp + ' ' + capitalizeString(note.course.name) + ' (id ' + note.id.toString() + ')'}</h5>
        <p>{note.text}</p>
    </div>
}

export default NoteListView;