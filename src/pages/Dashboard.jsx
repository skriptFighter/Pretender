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
import { useUpdatePinned } from "../hooks/useUpdatePinned"
import ColorPicker from "../components/ColorPicker"
import { Link } from "react-router-dom"

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

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="flex flex-col gap-8 h-screen w-full">
   <AddNote />

   <PinnedNotesList notes={reversedNotes} />
   <UnpinnedNotesList notes={reversedNotes} />
  </div>
 )
}

function PinnedNotesList({ notes }) {
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
      />
     ))}
   </div>
  </>
 )
}

function UnpinnedNotesList({ notes }) {
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
     />
    ))}
  </div>
 )
}

function Note({ title = null, content = null, id, pinned, bgColor }) {
 const [isHover, setIsHover] = useState(false)

 const toUrl = `/note/${id}/${encodeURIComponent(title || "untitled")}/${encodeURIComponent(content || "uncontent")}/${pinned}/${encodeURIComponent(bgColor)}`

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`w-56 mb-1 rounded-2xl shadow-md outline-black dark:shadow-sm dark:shadow-slate-800 self-start `}
   style={{ backgroundColor: bgColor }}
  >
   <Link className="px-4 pt-8 flex flex-col gap-2 cursor-default" to={toUrl}>
    <div className="font-semibold break-words text-lg ">{title}</div>
    <p className="break-words pb-8 ">{content}</p>
   </Link>

   <Options isHover={isHover} id={id} pinned={pinned} />
  </div>
 )
}

export function Options({ isHover, id, pinned }) {
 const { deleteNote } = useDeleteNote()
 const { updatePinned } = useUpdatePinned()
 const [isPickOpen, setIsPickOpen] = useState(null)

 //FIX TOGGLE
 function togglePick(id) {
  setIsPickOpen(isPickOpen === id ? null : id)
 }

 return (
  <div className="relative">
   <div
    className={`px-2 flex justify-between items-center transition-all duration-300 opacity-0 ${isHover && "opacity-100"}`}
   >
    <Button
     header={true}
     onClick={() => updatePinned({ isPinned: !pinned, id })}
    >
     {pinned ? (
      <TbPinnedFilled fontSize={20} cursor={"pointer"} />
     ) : (
      <VscPinned fontSize={20} cursor={"pointer"} />
     )}
    </Button>

    <Button header={true}>
     <CiImageOn fontSize={20} cursor={"pointer"} />
    </Button>

    <Button header={true} onClick={() => togglePick(id)}>
     <LuPaintbrush fontSize={20} cursor={"pointer"} />
    </Button>

    <Button header={true} onClick={() => deleteNote(id)}>
     <MdDeleteOutline fontSize={20} cursor={"pointer"} />
    </Button>
   </div>

   {isPickOpen === id && <ColorPicker setIsPickOpen={setIsPickOpen} id={id} />}
  </div>
 )
}

export default Dashboard
