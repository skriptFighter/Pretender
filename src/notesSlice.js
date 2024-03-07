import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 search: "",
}

export const notesSlice = createSlice({
 name: "notes",
 initialState,
 reducers: {
  searchValue: (state, action) => {
   state.search = action.payload
  },
 },
})

export const { searchValue } = notesSlice.actions
export default notesSlice.reducer
