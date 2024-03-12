import { useState } from "react"
import { Options } from "./Options"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentNote } from "../notesSlice"

function Note({ title = null, content = null, id, pinned, bgColor }) {
 const [isHover, setIsHover] = useState(false)
 const dispatch = useDispatch()

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`w-56 mb-1 rounded-2xl shadow-md outline-black dark:shadow-sm dark:shadow-slate-800 self-start `}
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
 )
}

export default Note
