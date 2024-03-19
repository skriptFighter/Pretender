import { useSelector } from "react-redux"
import Note from "../components/Note"
import { selectIsGrid, selectSearch } from "../notesSlice"
import { useMemo } from "react"

function PinnedNotes() {
 const notes = useSelector(selectSearch)
 const isGrid = useSelector(selectIsGrid)

 return (
  <>
   {isGrid && <p>Pinned</p>}
   <div
    className={`flex w-full pb-6 pr-6 ${isGrid ? "flex-wrap gap-x-10 gap-y-2 border-b-2" : " flex-col gap-12 items-center"}`}
   >
    {isGrid || <p>Pinned</p>}
    {useMemo(
     function () {
      return notes
       .filter((note) => note?.pinned && !note?.deleted)
       .map((note) => (
        <Note
         title={note?.title}
         content={note?.content}
         key={note.id}
         id={note?.id}
         pinned={note?.pinned}
         bgColor={note?.bgColor}
         image={note?.image}
         deleted={note?.deleted}
        />
       ))
     },
     [notes]
    )}
   </div>
  </>
 )
}

export default PinnedNotes
