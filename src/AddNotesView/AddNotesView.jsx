import CourseDropdown from '../CourseDropdown/CourseDropdown.jsx'
import { useAppState, capitalizeString } from "../main.jsx"
import { useState } from 'react'

function AddNotesView() {
    const [selectedCourse, setSelectedCourse] = useState(undefined);
    return (    
        <>
            <h4>Add new notes for course</h4>
            <CourseDropdown includeAllCoursesOption={false} selectedCourse={selectedCourse} handleSelectedCourse={(e) => {setSelectedCourse(e.target.value)}}/>
            <NoteInput/>
        </>   
    );
}

function NoteInput() {
    return <>
        <input name="note-input" defaultValue=""/>
        <br/>
        <button type="submit">Save</button>
        <button type="button">Back</button>
    </>
}

export default AddNotesView;