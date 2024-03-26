import { useState } from "react"
import { useSelector } from "react-redux"
import { selectIsGrid } from "../notesSlice"
import TrashNoteOptions from "./TrashNoteOptions"

function TrashNote({ title, content, id, bgColor, image, deleted }) {
 const [isHover, setIsHover] = useState(false)
 const isGrid = useSelector(selectIsGrid)

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col rounded-2xl shadow-md transition-shadow duration-300  dark:shadow-sm dark:shadow-slate-800 ${isGrid ? "w-72 self-start" : "w-1/3"} `}
   style={{
    border: `solid ${isGrid ? "1px" : "2px"} ${bgColor}`,
   }}
  >
   <div className="rounded-t-2xl">
    <img
     loading="lazy"
     src={image}
     className="w-full rounded-t-2xl object-contain"
    />
   </div>

   <div
    className={`${!image && "rounded-t-2xl"} flex flex-col gap-2 px-4 pt-8 `}
    style={{ backgroundColor: bgColor }}
   >
    <div className="break-words text-lg font-semibold ">{title}</div>
    <p className="break-words pb-2 ">{content}</p>
   </div>

   <div className="rounded-b-2xl " style={{ backgroundColor: bgColor }}>
    <TrashNoteOptions
     isHover={isHover}
     id={id}
     image={image}
     deleted={deleted}
    />
   </div>
  </div>
 )
}

export default TrashNote
