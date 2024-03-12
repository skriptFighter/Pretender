import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"

import AddNote from "../ui/AddNote"
import { useDispatch } from "react-redux"

import { setNotes, setSearchValue } from "../notesSlice"
import PinnedNotes from "../ui/PinnedNotes"
import UnpinnedNotes from "../ui/UnpinnedNotes"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()
 const dispatch = useDispatch()

 useEffect(() => {
  if (notes) {
   dispatch(setNotes(notes))
   dispatch(setSearchValue(""))
  }
 }, [dispatch, notes])

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="flex flex-col gap-8 h-screen w-full">
   <AddNote />

   <PinnedNotes />
   <UnpinnedNotes />
  </div>
 )
}

export default Dashboard
