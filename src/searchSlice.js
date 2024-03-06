import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 value: "",
}
export const searchSlice = createSlice({
 name: "search",
 initialState,
 reducers: {
  searchValue: (state, action) => {
   state.value = action.payload
  },
 },
})

export const { searchValue } = searchSlice.actions
export default searchSlice.reducer
