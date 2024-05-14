import { useDispatch, useSelector } from "react-redux"
import {
 selectDark,
 selectIsGrid,
 setCurrentNote,
 setModal,
} from "../notesSlice"
import { useState } from "react"
import { useUpdatePinned } from "../hooks/useUpdatePinned"
import ColorPicker from "../components/ColorPicker"
import Button from "../components/Button"
import { TbPinnedFilled } from "react-icons/tb"
import { VscPinned } from "react-icons/vsc"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md"

import { useUpdateTrash } from "../hooks/useUpdateTrash"

function Note({
 title,
 content,
 id,
 pinned,
 bgColor,
 bgColorDark,
 image,
 deleted,
}) {
 const [isHover, setIsHover] = useState(false)
 const [selectedColor, setSelectedColor] = useState(null)
 const dispatch = useDispatch()

 const isDark = useSelector(selectDark)
 const isGrid = useSelector(selectIsGrid)

 const imageValid = image && typeof image === "string"
 const imageLoading = image && typeof image === "object"

 function handleClick() {
  dispatch(setCurrentNote(id))
  dispatch(setModal("currentNote"))
 }

 return (
  <div
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
   className={`flex flex-col justify-between overflow-hidden rounded-md shadow-md shadow-gray-400 transition-shadow duration-300 dark:shadow-slate-600 ${isGrid ? "h-64 w-48 self-start phoneSm:h-96 phoneSm:w-64 phoneLg:h-96 phoneLg:w-96 " : "w-1/3"} `}
   style={{
    backgroundColor: `${isDark ? selectedColor?.dark || bgColorDark : selectedColor?.light || bgColor}`,
   }}
  >
   <div onClick={handleClick}>
    {imageValid && (
     <div className="cursor-default">
      <img
       loading="lazy"
       src={image}
       className="h-48 w-full rounded-t-md object-cover"
      />
     </div>
    )}

    {imageLoading && (
     <div className="cursor-default ">
      <img
       loading="lazy"
       src={URL.createObjectURL(image)}
       className="h-56 w-full rounded-t-md object-cover"
      />
     </div>
    )}

    <div
     className={`flex w-full ${image ? "h-36" : "h-[335px]"}  cursor-default flex-col gap-2 overflow-hidden p-4`}
    >
     <div className="break-words text-lg font-semibold">{title}</div>
     <p className="overflow-hidden break-words">{content}</p>
    </div>
   </div>

   <div>
    <NoteOptions
     isHover={isHover}
     id={id}
     image={image}
     pinned={pinned}
     setSelectedColor={setSelectedColor}
     deleted={deleted}
     isDark={isDark}
    />
   </div>
  </div>
 )
}

function NoteOptions({
 isHover,
 id,
 pinned,
 setSelectedColor,
 deleted,
 isDark,
}) {
 const { updatePinned } = useUpdatePinned()
 const [isPickerOpen, setIsPickerOpen] = useState(null)
 const isGrid = useSelector(selectIsGrid)
 const { updateTrash } = useUpdateTrash()

 function togglePicker(id) {
  setIsPickerOpen(isPickerOpen === id ? null : id)
 }

 return (
  <div className="relative">
   <div
    className={`${isDark && "text-tertiaryDark "} ${isGrid ? "items-center justify-between px-2" : "justify-start gap-8 px-4"} flex opacity-0 transition-all duration-300 ${isHover && "opacity-100"}`}
   >
    <div className="flex gap-2">
     <Button
      header={true}
      onClick={() => updatePinned({ isPinned: !pinned, id })}
     >
      {pinned ? (
       <TbPinnedFilled fontSize={23} cursor={"pointer"} />
      ) : (
       <VscPinned fontSize={23} cursor={"pointer"} />
      )}
     </Button>

     <Button header={true}>
      <CiImageOn fontSize={23} cursor={"pointer"} />
     </Button>

     <Button header={true} onClick={() => togglePicker(id)}>
      <LuPaintbrush fontSize={23} cursor={"pointer"} />
     </Button>
    </div>

    <Button header={true} onClick={() => updateTrash({ id, deleted })}>
     <MdDeleteOutline fontSize={23} cursor={"pointer"} />
    </Button>

    {isPickerOpen === id && (
     <ColorPicker
      setIsPickerOpen={setIsPickerOpen}
      id={id}
      setSelectedColor={setSelectedColor}
     />
    )}
   </div>
  </div>
 )
}

export default Note
