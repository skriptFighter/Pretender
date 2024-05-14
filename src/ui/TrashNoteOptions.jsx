import { useSelector } from "react-redux"
import { selectIsGrid } from "../notesSlice"
import { useDeleteNote } from "../hooks/useDeleteNote"
import Button from "../components/Button"

import { MdDeleteOutline } from "react-icons/md"
import { FaTrashRestoreAlt } from "react-icons/fa"
import { useUpdateTrash } from "../hooks/useUpdateTrash"

function TrashNoteOptions({ isHover, id, image, deleted }) {
 const isGrid = useSelector(selectIsGrid)

 const { deleteNote } = useDeleteNote()
 const { updateTrash } = useUpdateTrash()

 return (
  <div
   className={`${isGrid ? "items-center justify-between px-2" : "justify-start gap-8 px-4"} flex opacity-0 transition-all duration-300 ${isHover && "opacity-100"}`}
  >
   <Button header={true} onClick={() => deleteNote({ id, image })}>
    <MdDeleteOutline fontSize={25} cursor={"pointer"} />
   </Button>

   <Button header={true} onClick={() => updateTrash({ id, deleted })}>
    <FaTrashRestoreAlt fontSize={20} cursor={"pointer"} />
   </Button>
  </div>
 )
}

export default TrashNoteOptions
