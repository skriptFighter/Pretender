import { useState } from "react"
import { useNotes } from "../hooks/useNotes"
import Button from "../components/Button"

import { MdDeleteOutline } from "react-icons/md"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { VscPinned } from "react-icons/vsc"

import { useSelector } from "react-redux"
import AddNote from "../ui/AddNote"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()

 const { value: searchValue } = useSelector((state) => state.search)

 const filteredNotes = notes?.filter((item) => {
  const filteredContent = item.content
   .toLowerCase()
   .includes(searchValue.toLowerCase())

  const filteredTitle = item.title
   .toLowerCase()
   .includes(searchValue.toLowerCase())

  return searchValue === "" ? item : filteredContent || filteredTitle
 })

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="flex flex-col gap-8">
   <AddNote />

   <div className="w-full pr-6 flex flex-wrap gap-x-10 gap-y-2">
    {filteredNotes.map((note) => (
     <Note title={note.title} content={note.content} key={note.id} />
    ))}
   </div>
  </div>
 )
}

function Note({ title, content }) {
 const [isHover, setIsHover] = useState(false)

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`w-56 px-2 pb-1 rounded-lg shadow-md outline-black dark:shadow-sm dark:shadow-slate-800 self-start `}
  >
   <div className="px-4 pt-8">
    <div className="font-semibold text-lg">{title}</div>
    <p className="break-words pb-8 ">{content}</p>
   </div>

   <Options isHover={isHover} />
  </div>
 )
}

export function Options({ isHover }) {
 return (
  <div
   className={`flex justify-between items-center transition-all duration-300 opacity-0 ${isHover && "opacity-100"}`}
  >
   <Button header={true}>
    <VscPinned fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true}>
    <CiImageOn fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true}>
    <LuPaintbrush fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true}>
    <MdDeleteOutline fontSize={20} cursor={"pointer"} />
   </Button>
  </div>
 )
}

export default Dashboard
