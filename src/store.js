import { configureStore } from "@reduxjs/toolkit"
import NotesReducer from "./notesSlice"

export const store = configureStore({
 reducer: {
  notes: NotesReducer,
 },
})
