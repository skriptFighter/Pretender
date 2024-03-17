import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import { useState } from "react"

import ColorPicker from "../components/ColorPicker"

function ModalNoteOptions({ setSelectedColor }) {
 const [isPickerOpen, setIsPickerOpen] = useState(false)

 return (
  <div className="flex gap-8 items-center ">
   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <CiImageOn fontSize={18} />
   </div>

   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <FaRegBell fontSize={18} />
   </div>

   <div
    className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full"
    onClick={() => setIsPickerOpen(true)}
   >
    <LuPaintbrush fontSize={18} />
   </div>

   {isPickerOpen && (
    <ColorPicker
     setIsPickerOpen={setIsPickerOpen}
     setSelectedColor={setSelectedColor}
    />
   )}
  </div>
 )
}

export default ModalNoteOptions
