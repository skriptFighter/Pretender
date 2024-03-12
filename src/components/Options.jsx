import { useState } from "react"
import { useDeleteNote } from "../hooks/useDeleteNote"
import { useUpdatePinned } from "../hooks/useUpdatePinned"
import ColorPicker from "./ColorPicker"
import Button from "./Button"
import { TbPinnedFilled } from "react-icons/tb"
import { VscPinned } from "react-icons/vsc"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md"

export function Options({ isHover, id, pinned }) {
 const { deleteNote } = useDeleteNote()
 const { updatePinned } = useUpdatePinned()
 const [isPickOpen, setIsPickOpen] = useState(null)

 function togglePick(id) {
  setIsPickOpen(isPickOpen === id ? null : id)
 }

 return (
  <div className="relative">
   <div
    className={`px-2 flex justify-between items-center transition-all duration-300 opacity-0 ${isHover && "opacity-100"}`}
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

    <Button header={true} onClick={() => deleteNote(id)}>
     <MdDeleteOutline fontSize={20} cursor={"pointer"} />
    </Button>
   </div>

   {isPickOpen === id && <ColorPicker setIsPickOpen={setIsPickOpen} id={id} />}
  </div>
 )
}
