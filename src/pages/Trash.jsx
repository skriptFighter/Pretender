import { useSelector } from "react-redux"
import { selectIsGrid, selectModal } from "../notesSlice"
import TrashNote from "../ui/TrashNote"
import { useNotes } from "../hooks/useNotes"
import Button from "../components/Button"
import Modal from "../components/Modal"
import AddNote from "../ui/AddNote"

function Trash() {
 const { notes } = useNotes()
 const isGrid = useSelector(selectIsGrid)
 const modal = useSelector(selectModal)

 return (
  <div className="ml-72 mt-36 flex flex-col gap-20">
   <Button primary={true}>Delete all</Button>

   <div
    className={` flex w-full pb-6 pr-6 ${isGrid ? "flex-wrap gap-x-10 gap-y-2 " : " flex-col items-center gap-12"}`}
   >
    {notes
     ?.filter((note) => note?.deleted)
     ?.map((note) => (
      <TrashNote
       title={note?.title}
       content={note?.content}
       key={note.id}
       id={note?.id}
       pinned={note?.pinned}
       bgColor={note?.bgColor}
       image={note?.image}
       deleted={note?.deleted}
      />
     ))}
   </div>

   {modal === "addNote" && (
    <Modal>
     <AddNote />
    </Modal>
   )}
  </div>
 )
}

export default Trash
