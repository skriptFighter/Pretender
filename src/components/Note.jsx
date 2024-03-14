import { useState } from "react"
import { Options } from "./Options"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentNote } from "../notesSlice"

function Note({ title, content, id, pinned, bgColor, image }) {
 const [isHover, setIsHover] = useState(false)
 const dispatch = useDispatch()

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col w-56 rounded-2xl shadow-md hover:ring-2 hover:outline hover:outline-gray-300 transition-shadow duration-300  outline-black dark:shadow-sm dark:shadow-slate-800 self-start `}
  >
   {image && (
    <div className="rounded-t-2xl">
     <img
      src={image}
      alt="noteImage"
      className="w-full object-contain rounded-t-2xl"
     />
    </div>
   )}

   <div
    className={`${image ? "rounded-b-2xl" : "rounded-2xl"}`}
    style={{ backgroundColor: bgColor }}
   >
    <Link
     className="px-4 pt-8 flex flex-col gap-2 cursor-default"
     to={`/note/${id}`}
     onClick={() => dispatch(setCurrentNote(id))}
    >
     <div className="font-semibold break-words text-lg ">{title}</div>
     <p className="break-words pb-8 ">{content}</p>
    </Link>

    <Options isHover={isHover} id={id} pinned={pinned} />
   </div>
  </div>
 )
}

export default Note
