import { useSelector } from "react-redux"
import Note from "../components/Note"
import { selectSearch } from "../notesSlice"

function PinnedNotes() {
 const notes = useSelector(selectSearch)
 return (
  <>
   <p>Pinned</p>
   <div className="w-full pb-6 pr-6 flex flex-wrap gap-x-10 gap-y-2 border-b-2">
    {notes
     ?.filter((note) => note?.pinned === true)
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
  </>
 )
}

export default PinnedNotes
