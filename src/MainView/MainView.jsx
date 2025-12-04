import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';
import { appState } from '../main.jsx';

function MainView() {
    const navigate = useNavigate();
    const fetchData = appState((state) => state.fetchData);
    fetchData();
    console.log(appState(state => state.courses))
    return (    
        <>
        <button onClick={() => {navigate('/addnotes')}}>
            Create notes for class
        </button>
        <button>List notes</button>    
        <br/>
        <button>Add courses</button>  
        </>   
    );
}

export default MainView;