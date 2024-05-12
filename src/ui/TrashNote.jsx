import { useState } from "react"
import { useSelector } from "react-redux"
import { selectIsGrid } from "../notesSlice"
import TrashNoteOptions from "./TrashNoteOptions"
import { selectDark } from "../notesSlice"

function TrashNote({
 title,
 content,
 id,
 bgColor,
 image,
 deleted,
 bgColorDark,
}) {
 const [isHover, setIsHover] = useState(false)
 const isGrid = useSelector(selectIsGrid)
 const isDark = useSelector(selectDark)

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col justify-between overflow-hidden rounded-md shadow-md shadow-gray-400 transition-shadow duration-300 dark:shadow-slate-600 ${isGrid ? "h-64 w-48 self-start phoneSm:h-96 phoneSm:w-64 phoneLg:h-96 phoneLg:w-96" : "w-1/3"} `}
   style={{
    backgroundColor: `${isDark ? bgColorDark : bgColor}`,
   }}
  >
   {image && (
    <div className="">
     <img loading="lazy" src={image} className="h-48 w-full object-cover" />
    </div>
   )}

   <div
    className={` flex flex-col gap-2 overflow-hidden px-4 pt-4`}
    style={{ backgroundColor: `${isDark ? bgColorDark : bgColor}` }}
   >
    <div className="break-words text-lg font-semibold ">{title}</div>
    <p className="overflow-hidden break-words pb-2">{content}</p>
   </div>

   <div
    className=""
    style={{ backgroundColor: `${isDark ? bgColorDark : bgColor}` }}
   >
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
