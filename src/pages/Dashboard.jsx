import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"

import AddNote from "../ui/AddNote"
import { useDispatch, useSelector } from "react-redux"

import { selectModal, setNotes, setSearchValue } from "../notesSlice"
import PinnedNotes from "../ui/PinnedNotes"
import UnpinnedNotes from "../ui/UnpinnedNotes"
import CurrentNote from "../ui/CurrentNote"
import Modal from "../components/Modal"

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
  <div className="ml-72 flex w-full flex-col gap-8 pb-20">
   <AddNote />

   <PinnedNotes />
   <UnpinnedNotes />
   {isModal && (
    <Modal>
     <CurrentNote />
    </Modal>
   )}
  </div>
 )
}

export default Dashboard
