import { useNavigate } from 'react-router';

function MainView() {
    const navigate = useNavigate();
    return (    
        <>
            <button onClick={() => {navigate('/addnotes')}}>
                Create notes for class
            </button>
            <button onClick={() => {navigate('/notelist')}}>
                List notes
            </button>    
            <br/>
            <button>Add courses</button>  
        </>   
    );
}

export default MainView;