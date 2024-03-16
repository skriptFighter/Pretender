import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 notes: [],
 currentNote: null,
 search: [],
 isGridView: true,
 isModal: false,
}

export const notesSlice = createSlice({
 name: "notes",
 initialState,
 reducers: {
  setNotes: (state, action) => {
   state.notes = action.payload
  },

  setCurrentNote: (state, action) => {
   const noteId = action.payload
   state.currentNote = state.notes?.find((note) => note.id === Number(noteId))
  },

  setSearchValue: (state, action) => {
   const value = action.payload
   const filteredNotes = state.notes?.filter((note) => {
    const filteredContent = note?.content
     ?.toLowerCase()
     .includes(value?.toLowerCase())

    const filteredTitle = note?.title
     ?.toLowerCase()
     .includes(value?.toLowerCase())

    return value === "" ? note : filteredContent || filteredTitle
   })
   state.search = filteredNotes
  },

  setGridView: (state) => {
   state.isGridView = !state.isGridView
  },

  setModal: (state, action) => {
   state.isModal = action.payload
  },
 },
})

export const {
 setNotes,
 setCurrentNote,
 setSearchValue,
 setGridView,
 setModal,
} = notesSlice.actions

export const selectNotes = (state) => state.notes.notes
export const selectCurrentNote = (state) => state.notes.currentNote
export const selectSearch = (state) => state.notes.search
export const selectIsGrid = (state) => state.notes.isGridView
export const selectModal = (state) => state.notes.isModal

export default notesSlice.reducer
