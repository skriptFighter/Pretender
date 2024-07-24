import { configureStore } from "@reduxjs/toolkit"
// import SearchReducer from "./searchSlice"
import NotesReducer from "./notesSlice"

export const store = configureStore({
 reducer: {
  // search: SearchReducer,
  notes: NotesReducer,
 },
})
