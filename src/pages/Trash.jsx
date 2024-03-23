import { useSelector } from "react-redux"
import { selectIsGrid } from "../notesSlice"
import TrashNote from "../ui/TrashNote"
import { useNotes } from "../hooks/useNotes"
import Button from "../components/Button"

function Trash() {
 const { notes } = useNotes()
 const isGrid = useSelector(selectIsGrid)

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
  </div>
 )
}

export default Trash
