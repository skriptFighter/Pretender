import { useState } from "react"
import { useNotes } from "../hooks/useNotes"
import Button from "../components/Button"

import { MdDeleteOutline } from "react-icons/md"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"

import AddNote from "../ui/AddNote"
import { useDeleteNote } from "../hooks/useDeleteNote"
import { useSelector } from "react-redux"
import { useUpdateNote } from "../hooks/useUpdateNote"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()
 const { search: searchValue } = useSelector((state) => state.notes)

 const filteredNotes = notes?.filter((item) => {
  const filteredContent = item?.content
   ?.toLowerCase()
   .includes(searchValue?.toLowerCase())

  const filteredTitle = item?.title
   ?.toLowerCase()
   .includes(searchValue?.toLowerCase())

  return searchValue === "" ? item : filteredContent || filteredTitle
 })

 const reversedNotes = filteredNotes?.reverse()

 const pinnedNotes = reversedNotes?.filter((item) => item?.pinned === true)
 const unpinnedNotes = reversedNotes?.filter((item) => item?.pinned === false)

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="flex flex-col gap-8 w-full">
   <AddNote />
   <p>Pinned</p>
   <div className="w-full pb-6 pr-6 flex flex-wrap gap-x-10 gap-y-2 border-b-2">
    {pinnedNotes?.map((note) => (
     <Note
      title={note?.title}
      content={note?.content}
      key={note.id}
      id={note?.id}
      pinned={note?.pinned}
     />
    ))}
   </div>

   <div className="w-full pr-6 flex flex-wrap gap-x-10 gap-y-2">
    {unpinnedNotes?.map((note) => (
     <Note
      title={note?.title}
      content={note?.content}
      key={note.id}
      id={note?.id}
      pinned={note?.pinned}
     />
    ))}
   </div>
  </div>
 )
}

function Note({ title = "", content = "", id, pinned }) {
 const [isHover, setIsHover] = useState(false)

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`w-56 px-2 mb-1 rounded-lg shadow-md outline-black dark:shadow-sm dark:shadow-slate-800 self-start `}
  >
   <div className="px-4 pt-8 flex flex-col gap-2">
    <div className="font-semibold break-words text-lg">{title}</div>
    <p className="break-words pb-8 ">{content}</p>
   </div>

   <Options isHover={isHover} id={id} pinned={pinned} />
  </div>
 )
}

export function Options({ isHover, id, pinned }) {
 const { deleteNote } = useDeleteNote()
 const { updateNote } = useUpdateNote()
 const [isPinned, setIsPinned] = useState(pinned)

 function handlePin() {
  setIsPinned((pin) => !pin)
  updateNote({ isPinned: !isPinned, id })
 }

 return (
  <div
   className={`flex justify-between items-center transition-all duration-300 opacity-0 ${isHover && "opacity-100"}`}
  >
   <Button header={true} onClick={handlePin}>
    {pinned ? (
     <TbPinnedFilled fontSize={20} cursor={"pointer"} />
    ) : (
     <VscPinned fontSize={20} cursor={"pointer"} />
    )}
   </Button>

   <Button header={true}>
    <CiImageOn fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true}>
    <LuPaintbrush fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true} onClick={() => deleteNote(id)}>
    <MdDeleteOutline fontSize={20} cursor={"pointer"} />
   </Button>
  </div>
 )
}

export default Dashboard
