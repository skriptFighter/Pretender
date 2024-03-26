import { useDispatch, useSelector } from "react-redux"
import Note from "./Note"
import { selectSearch, setGrid } from "../notesSlice"
import { useEffect, useMemo } from "react"

function AllNotes() {
 const notes = useSelector(selectSearch)
 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(setGrid(true))
 }, [dispatch])

 return (
  <>
   <div className="flex w-full flex-wrap gap-10 pb-6 pr-6">
    {useMemo(
     function () {
      return notes
       .filter((note) => !note.deleted && !note.pinned)
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

export default AllNotes
