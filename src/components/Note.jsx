import { useState } from "react"
import { NoteOptions } from "./NoteOptions"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentNote } from "../notesSlice"

function Note({ title, content, id, pinned, bgColor, image }) {
 const [isHover, setIsHover] = useState(false)
 const [selectedColor, setSelectedColor] = useState(null)

 const dispatch = useDispatch()

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col w-56 rounded-2xl shadow-md transition-shadow duration-300  dark:shadow-sm dark:shadow-slate-800 self-start `}
   style={{ border: `solid 1px ${selectedColor || bgColor}` }}
  >
   <Link to={`/note/${id}`} onClick={() => dispatch(setCurrentNote(id))}>
    {image && (
     <div className="rounded-t-2xl cursor-default">
      <img
       loading="lazy"
       src={image}
       alt="noteImage"
       className="w-full object-contain rounded-t-2xl"
      />
     </div>
    )}

    <div
     className={`${!image && "rounded-t-2xl"} px-4 pt-8 flex flex-col gap-2 cursor-default`}
     style={{ backgroundColor: selectedColor || bgColor }}
    >
     <div className="font-semibold break-words text-lg ">{title}</div>
     <p className="break-words pb-2 ">{content}</p>
    </div>
   </Link>

   <div
    className="rounded-b-2xl "
    style={{ backgroundColor: selectedColor || bgColor }}
   >
    <NoteOptions
     isHover={isHover}
     id={id}
     pinned={pinned}
     setSelectedColor={setSelectedColor}
    />
   </div>
  </div>
 )
}

export default Note
