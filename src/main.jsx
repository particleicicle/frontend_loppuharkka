import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

//Tilanhallinta

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppState = create(
  persist(
    (set, get) => ({

      removeNote: (note) => {
        const newNotes = get().notes.filter((value) => value != note)
        set({notes: newNotes})
      },

      courses: [],
      notes: [],

      getCourseByName: (name) => {
        const courses = get().courses;

        for (let i = 0; i < courses.length; ++i) {
          if (courses[i].name == name) return courses[i]
        }

        return undefined
      },

      getUnusedNoteID: () => {
        let minValue = 0
        const notes = get().notes

        for (let i = 0; i < notes.length; ++i) {
          if (notes[i].id > minValue) minValue = notes[i].id
        }

        return minValue + 1
      },

      getUnusedCourseID: () => {
        let minValue = 0
        const courses = get().courses

        for (let i = 0; i < courses.length; ++i) {
          if (courses[i].id > minValue) minValue = courses[i].id
        }

        return minValue + 1
      },

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
  if (typeof(str) != 'string') return ""
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import Header from './Header/Header.jsx'
import MainView from './MainView/MainView.jsx'
import AddNotesView from './AddNotesView/AddNotesView.jsx'
import NoteListView from './NoteListView/NoteListView.jsx'
import AddCoursesView from './AddCoursesView/AddCoursesView.jsx';

function App() {
    const courses = useAppState((state) => state.courses)
    const fetchData = useAppState((state) => state.fetchData)
    //hae kursseja ja muistiinpanoja jos kursseja ei ole
    if (courses.length < 1) fetchData()
  
    return <>
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<MainView/>}></Route>
            <Route path="/addnotes" element={<AddNotesView/>}></Route>
            <Route path="/notelist" element={<NoteListView/>}></Route>
            <Route path="/addcourses" element={<AddCoursesView/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
