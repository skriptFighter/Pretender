import { useState } from "react"
import { NoteOptions } from "./NoteOptions"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectIsGrid, setCurrentNote } from "../notesSlice"

function Note({ title, content, id, pinned, bgColor, image, deleted }) {
 const [isHover, setIsHover] = useState(false)
 const [selectedColor, setSelectedColor] = useState(null)
 const isGrid = useSelector(selectIsGrid)

 const imageValid = image && typeof image === "string"
 const imageLoading = image && typeof image === "object"

 const dispatch = useDispatch()

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col rounded-2xl shadow-md transition-shadow duration-300  dark:shadow-sm dark:shadow-slate-800 ${isGrid ? "w-56 self-start" : "w-1/3"} `}
   style={{
    border: `solid ${isGrid ? "1px" : "2px"} ${selectedColor || bgColor}`,
   }}
  >
   <Link to={`/note/${id}`} onClick={() => dispatch(setCurrentNote(id))}>
    {imageValid && (
     <div className="rounded-t-2xl cursor-default">
      <img
       loading="lazy"
       src={image}
       className="w-full object-contain rounded-t-2xl"
      />
     </div>
    )}

    {imageLoading && (
     <div className="rounded-t-2xl cursor-default">
      <img
       loading="lazy"
       src={URL.createObjectURL(image)}
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
     image={image}
     pinned={pinned}
     setSelectedColor={setSelectedColor}
     deleted={deleted}
    />
   </div>
  </div>
 )
}

export default Note
