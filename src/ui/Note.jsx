import { useDispatch, useSelector } from "react-redux"
import { selectIsGrid, setCurrentNote, setModal } from "../notesSlice"
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

function Note({ title, content, id, pinned, bgColor, image, deleted }) {
 const [isHover, setIsHover] = useState(false)
 const [selectedColor, setSelectedColor] = useState(null)
 const dispatch = useDispatch()

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
   className={`flex flex-col rounded-2xl shadow-md transition-shadow duration-300  dark:shadow-sm dark:shadow-slate-800 ${isGrid ? "w-56 self-start" : "w-1/3"} `}
   style={{
    border: `solid ${isGrid ? "1px" : "2px"} ${selectedColor || bgColor}`,
   }}
  >
   <div onClick={handleClick}>
    {imageValid && (
     <div className="cursor-default rounded-t-2xl">
      <img
       loading="lazy"
       src={image}
       className="max-h-96 w-full rounded-t-2xl object-contain"
      />
     </div>
    )}

    {imageLoading && (
     <div className="cursor-default rounded-t-2xl">
      <img
       loading="lazy"
       src={URL.createObjectURL(image)}
       className="max-h-96 w-full rounded-t-2xl object-contain"
      />
     </div>
    )}

    <div
     className={`${!image && "rounded-t-2xl"} flex cursor-default flex-col gap-2 px-4 pt-8`}
     style={{ backgroundColor: selectedColor || bgColor }}
    >
     <div className="break-words text-lg font-semibold ">{title}</div>
     <p className="break-words pb-2 ">{content}</p>
    </div>
   </div>

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

function NoteOptions({ isHover, id, pinned, setSelectedColor, deleted }) {
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
    className={`${isGrid ? "items-center justify-between px-2" : "justify-start gap-8 px-4"} flex opacity-0 transition-all duration-300 ${isHover && "opacity-100"}`}
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

    <Button header={true} onClick={() => togglePicker(id)}>
     <LuPaintbrush fontSize={20} cursor={"pointer"} />
    </Button>

    <Button header={true} onClick={() => updateTrash({ id, deleted })}>
     <MdDeleteOutline fontSize={20} cursor={"pointer"} />
    </Button>
   </div>

   {isPickerOpen === id && (
    <ColorPicker
     setIsPickerOpen={setIsPickerOpen}
     id={id}
     setSelectedColor={setSelectedColor}
    />
   )}
  </div>
 )
}

export default Note
