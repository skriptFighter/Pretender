import { useDispatch, useSelector } from "react-redux"
import { selectSearch, setGrid, setNotes, setSearchValue } from "../notesSlice"
import { useEffect } from "react"
import { useNotes } from "../hooks/useNotes"
import PinnedNote from "../ui/PinnedNote"

function PinnedNotes() {
 const dispatch = useDispatch()
 const { notes } = useNotes()
 const searchedNotes = useSelector(selectSearch)

 useEffect(() => {
  if (notes) {
   dispatch(setNotes(notes))
   dispatch(setSearchValue(""))
  }
  dispatch(setGrid(false))
 }, [dispatch, notes])

 console.log(searchedNotes?.filter((note) => note?.pinned && !note?.deleted))

 return (
  <>
   <div className="flex h-screen w-full flex-col items-center gap-12 pb-6 pl-72 pr-6">
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
       image={note?.image}
       deleted={note?.deleted}
      />
     ))}
   </div>
  </>
 )
}

export default PinnedNotes
