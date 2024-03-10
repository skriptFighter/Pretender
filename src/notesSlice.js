import { createSlice } from "@reduxjs/toolkit"
const initialState = {
 notes: [],
 currentNote: [],
}

export const notesSlice = createSlice({
 name: "notes",
 initialState,
 reducers: {
  setNotes: (state, action) => {
   state.notes = action.payload
  },
  setCurrentNote: (state, action) => {
   state.currentNote = state.notes.find(
    (note) => note.id === Number(action.payload)
   )
  },
 },
})

export const { setNotes, setCurrentNote } = notesSlice.actions

export const selectNotes = (state) => state.notes.notes
export const selectCurrentNote = (state) => state.notes.currentNote

export default notesSlice.reducer
