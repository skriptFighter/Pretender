import { useDispatch, useSelector } from "react-redux"
import { selectDark, setCurrentNote, setModal } from "../notesSlice"
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

function PinnedNote({
 title,
 content,
 id,
 pinned,
 bgColor,
 image,
 deleted,
 bgColorDark,
}) {
 const [selectedColor, setSelectedColor] = useState(null)
 const isDark = useSelector(selectDark)
 const [isHover, setIsHover] = useState(false)
 const dispatch = useDispatch()

 function handleClick() {
  dispatch(setCurrentNote(id))
  dispatch(setModal("currentNote"))
 }

 return (
  <div
   className="relative flex h-44 w-full max-w-[900px] gap-2  rounded-md border-2 border-tertiary bg-primary p-2"
   onMouseEnter={() => setIsHover(true)}
   onMouseLeave={() => setIsHover(false)}
  >
   {image && (
    <div className=" w-1/4" onClick={handleClick}>
     <img
      loading="lazy"
      src={image}
      alt="Note image"
      className="h-full w-full rounded-md bg-tertiary object-contain"
     />
    </div>
   )}

   <div
    className={`flex ${image ? "w-3/4" : "w-full"} flex-col rounded-md p-4 pr-14 `}
    style={{
     backgroundColor: `${isDark ? selectedColor?.dark || bgColorDark : selectedColor?.light || bgColor}`,
    }}
    onClick={handleClick}
   >
    <p className="h-10 break-words text-lg font-semibold">{title}</p>
    <p className="h-full overflow-hidden break-words text-lg ">{content}</p>
   </div>

   <div className="absolute bottom-3 right-0">
    <NoteOptions
     id={id}
     pinned={pinned}
     setSelectedColor={setSelectedColor}
     deleted={deleted}
     isHover={isHover}
    />
   </div>
  </div>
 )
}

function NoteOptions({ id, pinned, setSelectedColor, deleted, isHover }) {
 const { updatePinned } = useUpdatePinned()
 const [isPickerOpen, setIsPickerOpen] = useState(null)
 const { updateTrash } = useUpdateTrash()

 function togglePick(id) {
  setIsPickerOpen(isPickerOpen === id ? null : id)
 }

 return (
  <div
   className={`flex flex-col justify-start  px-4 opacity-0 transition-all duration-300 ${isHover && "opacity-100"}`}
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

   <Button header={true} onClick={() => togglePick(id)}>
    <LuPaintbrush fontSize={20} cursor={"pointer"} />
   </Button>

   <Button header={true} onClick={() => updateTrash({ id, deleted })}>
    <MdDeleteOutline fontSize={20} cursor={"pointer"} />
   </Button>

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

export default PinnedNote
