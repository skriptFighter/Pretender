import { useSelector } from "react-redux"
import Note from "../components/Note"
import { selectSearch } from "../notesSlice"

function UnpinnedNotes() {
 const notes = useSelector(selectSearch)
 return (
  <div className="w-full pr-6 flex flex-wrap gap-x-10 gap-y-2">
   {notes
    ?.filter((note) => note?.pinned === false)
    ?.map((note) => (
     <Note
      title={note?.title}
      content={note?.content}
      key={note.id}
      id={note?.id}
      pinned={note?.pinned}
      bgColor={note?.bgColor}
      image={note?.image}
     />
    ))}
  </div>
 )
}

export default UnpinnedNotes
