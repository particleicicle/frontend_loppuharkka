import { useState } from 'react'
import { useAppState } from '../main';
import { useNavigate } from 'react-router';

function AddCoursesView() {
    const [text, setText] = useState("");
    const addCourse = useAppState((state) => state.addCourse)
    const getUnusedCourseID = useAppState((state) => state.getUnusedCourseID)
    const navigate = useNavigate();
    const [msg, setMsg] = useState("")

    return (
        <>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                name="course"
                id="course"
            />
            <br/>
            <button type="submit" onClick={() => {
                const trimmedText = text.trim()
                if (trimmedText.length < 1) return

                const id = getUnusedCourseID()

                addCourse({
                    name: trimmedText,
                    id: id
                })

                setMsg("Opintojakso '" + trimmedText + "' lisätty id:llä " + id.toString())

                //tyhjennä kenttä
                setText("")
            }}>Add</button>
            <button type="button" onClick={() => navigate('/')}>Back</button>
            <p>{msg}</p>
        </>
    );
}

export default AddCoursesView