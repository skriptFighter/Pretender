import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"

import AddNote from "../ui/AddNote"
import { useDispatch, useSelector } from "react-redux"

import { selectModal, setNotes, setSearchValue } from "../notesSlice"

import CurrentNote from "../ui/CurrentNote"
import Modal from "../components/Modal"
import AllNotes from "../ui/AllNotes"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()
 const dispatch = useDispatch()
 const modal = useSelector(selectModal)

 useEffect(() => {
  if (notes) {
   dispatch(setNotes(notes))
   dispatch(setSearchValue(""))
  }
 }, [dispatch, notes])

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="ml-24 flex w-full flex-col gap-8 pb-20 sm:ml-72">
   <AllNotes />

   {modal === "addNote" && (
    <Modal>
     <AddNote />
    </Modal>
   )}

   {modal === "currentNote" && (
    <Modal>
     <CurrentNote />
    </Modal>
   )}
  </div>
 )
}

export default Dashboard
