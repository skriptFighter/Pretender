import { useState } from "react"
import { useUpdatePinned } from "../hooks/useUpdatePinned"
import ColorPicker from "./ColorPicker"
import Button from "./Button"
import { TbPinnedFilled } from "react-icons/tb"
import { VscPinned } from "react-icons/vsc"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md"
import { useSelector } from "react-redux"
import { selectIsGrid } from "../notesSlice"
import { useUpdateTrash } from "../hooks/useUpdateTrash"

export function NoteOptions({
 isHover,
 id,
 pinned,
 setSelectedColor,
 deleted,
}) {
 const { updatePinned } = useUpdatePinned()
 const [isPickerOpen, setIsPickerOpen] = useState(null)
 const isGrid = useSelector(selectIsGrid)
 const { updateTrash } = useUpdateTrash()

 function togglePick(id) {
  setIsPickerOpen(isPickerOpen === id ? null : id)
 }

 return (
  <div className="relative">
   <div
    className={`${isGrid ? "px-2 justify-between items-center" : "px-4 justify-start gap-8"} flex transition-all duration-300 opacity-0 ${isHover && "opacity-100"}`}
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
