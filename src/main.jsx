import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router"
import { create } from "zustand"
import AddNotesView from './AddNotesView/AddNotesView.jsx'
import MainView from './MainView/MainView.jsx'
import Header from './Header/Header.jsx'

export const appState = create((set) => ({
  courses: [],
  notes: [],
  addCourse: (course) => set((state) => ({courses: state.courses.push(course, [])})),
  addNote: (note) => set((state) => ({notes: state.notes.push(note)})),
  fetchData: () => set((state) => ({
    courses: state.courses = fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses')
    .then(response => response.json()),
    notes: state.notes = fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes')
    .then(response => response.json())
  }))
}))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainView/>}></Route>
          <Route path="/addnotes" element={<AddNotesView/>}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
