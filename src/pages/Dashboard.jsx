import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"

import AddNote from "../ui/AddNote"
import { useDispatch, useSelector } from "react-redux"

import { selectModal, setNotes, setSearchValue } from "../notesSlice"
import PinnedNotes from "../ui/PinnedNotes"
import UnpinnedNotes from "../ui/UnpinnedNotes"
import ModalNote from "../ui/ModalNote"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()
 const dispatch = useDispatch()
 const isModal = useSelector(selectModal)

 useEffect(() => {
  if (notes) {
   dispatch(setNotes(notes))
   dispatch(setSearchValue(""))
  }
 }, [dispatch, notes])

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="flex flex-col gap-8 pb-20 w-full">
   <AddNote />

   <PinnedNotes />
   <UnpinnedNotes />
   {isModal && <ModalNote />}
  </div>
 )
}

export default Dashboard
