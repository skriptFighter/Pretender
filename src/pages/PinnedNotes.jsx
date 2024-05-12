import { useDispatch, useSelector } from "react-redux"
import {
 selectModal,
 selectSearch,
 setGrid,
 setNotes,
 setSearchValue,
} from "../notesSlice"
import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"
import PinnedNote from "../ui/PinnedNote"
import Modal from "../components/Modal"
import CurrentNote from "../ui/CurrentNote"
import AddNote from "../ui/AddNote"

function PinnedNotes() {
 const dispatch = useDispatch()
 const { notes } = useNotes()
 const searchedNotes = useSelector(selectSearch)
 const modal = useSelector(selectModal)

 useEffect(() => {
  if (notes) {
   dispatch(setNotes(notes))
   dispatch(setSearchValue(""))
  }
  dispatch(setGrid(false))
 }, [dispatch, notes])

 return (
  <>
   <div className="ml-24 flex w-full flex-col items-center gap-12 pb-6 pr-6 sm:ml-48 lg:ml-72">
    {searchedNotes
     ?.filter((note) => note?.pinned && !note?.deleted)
     .map((note) => (
      <PinnedNote
       title={note?.title}
       content={note?.content}
       key={note.id}
       id={note?.id}
       pinned={note?.pinned}
       bgColor={note?.bgColor}
       bgColorDark={note?.bgColorDark}
       image={note?.image}
       deleted={note?.deleted}
      />
     ))}
   </div>

   {modal === "currentNote" && (
    <Modal>
     <CurrentNote />
    </Modal>
   )}

   {modal === "addNote" && (
    <Modal>
     <AddNote />
    </Modal>
   )}
  </>
 )
}

export default PinnedNotes
