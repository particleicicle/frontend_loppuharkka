import 'bootstrap/dist/css/bootstrap.min.css';

//Tilanhallinta

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppState = create(
  persist(
    (set, get) => ({
      courses: [],
      notes: [],

      addCourse: (course) =>
        set({
          courses: [...get().courses, course],
        }),

      addNote: (note) =>
        set({
          notes: [...get().notes, note],
        }),

      fetchData: async () => {
        const responseCourses = await fetch(
          'https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses'
        )
        const responseNotes = await fetch(
          'https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes'
        )

        set({
          courses: await responseCourses.json(),
          notes: await responseNotes.json(),
        })
      }
    }),
    {
      name: 'noteapp-state',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import Header from './Header/Header.jsx'
import MainView from './MainView/MainView.jsx'
import AddNotesView from './AddNotesView/AddNotesView.jsx'
import NoteListView from './NoteListView/NoteListView.jsx'

function App() {
    const fetchData = useAppState((state) => state.fetchData);
    fetchData();
    return <>
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<MainView/>}></Route>
            <Route path="/addnotes" element={<AddNotesView/>}></Route>
            <Route path="/notelist" element={<NoteListView/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
