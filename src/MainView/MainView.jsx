import { useNavigate } from 'react-router'
import { useAppState } from "../main.jsx"

function MainView() {
    const navigate = useNavigate()
    const courses = useAppState((state) => state.courses)
    return (    
        <>
            <button onClick={() => {navigate('/addnotes')}} disabled={courses.length < 1}>
                Create notes for class
            </button>
            <button onClick={() => {navigate('/notelist')}}>
                List notes
            </button>
            <br/>
            <button onClick={() => {navigate('/addcourses')}}>
                Add courses
            </button>  
        </>   
    );
}

export default MainView;