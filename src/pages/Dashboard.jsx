import { useState } from "react"
import { useNotes } from "../hooks/useNotes"
import Button from "../components/Button"

import { MdDeleteOutline } from "react-icons/md"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { VscPinned } from "react-icons/vsc"

function Dashboard() {
 const { notes, isLoading, error } = useNotes()
 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div className="w-full pr-6 grid grid-cols-6 gap-10">
   {notes?.map((note) => (
    <Note title={note.title} content={note.content} key={note.id} />
   ))}
  </div>
 )
}

function Note({ title, content }) {
 const [isHover, setIsHover] = useState(false)

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`px-2 pb-1 rounded shadow-md outline-black self-start `}
  >
   <div className="px-4 pt-8">
    <div className="font-semibold text-lg">{title}</div>
    <p className="break-words pb-8">{content}</p>
   </div>

   <Options isHover={isHover} />
  </div>
 )
}

function Options({ isHover }) {
 return (
  <div
   className={`items-center  flex justify-between transition-all duration-500 opacity-0 ${isHover && "opacity-100"}`}
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
