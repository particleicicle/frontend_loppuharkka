import Form from 'react-bootstrap/Form';
import { useAppState, capitalizeString } from "../main.jsx";

function NoteListView() {
    return <>
        <BuildCourseDropdown/>
        <BuildNoteList/>
    </>
}

function BuildCourseDropdown() {
    /*
    const [selectedCourse, setSelectedCourse] = useState(undefined);
    const handleSelectChange = (e) => {
        setSelectedCourse(e.target.value);
    };
    */
    const courses = useAppState((state) => state.courses)
    const dropdownItems = [<option value={undefined} key="all">All courses</option>]

    for (let i = 0; i < courses.length; ++i) {
        const course = courses[i]
        dropdownItems.push(
            <option value={course.name} key={course.name}>
                {capitalizeString(course.name)}
            </option>
        )
    }

    return <>
        <Form.Select>
            {dropdownItems}
        </Form.Select>
    </>
}

function BuildNoteList({course}) {
    const notes = useAppState((state) => state.notes);
    const noteElements = []

    for (let i = 0; i < notes.length; ++i) {
        const note = notes[i]

        if (course != undefined && note.course.name != course) continue

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