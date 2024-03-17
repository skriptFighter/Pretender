import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import ColorPicker from "../components/ColorPicker"
import { useRef, useState } from "react"

function AddNoteOptions({ setSelectedColor, setValue }) {
 const [isPickerOpen, setIsPickerOpen] = useState(false)

 const fileInputRef = useRef(null)

 const handleFileChange = (e) => {
  const file = e.target.files[0]
  setValue("image", file)
 }

 return (
  <div className="flex gap-8 items-center relative">
   <div
    className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full"
    onClick={() => fileInputRef?.current?.click()}
   >
    <CiImageOn fontSize={18} />
    <input
     type="file"
     accept="image/jpeg"
     ref={fileInputRef}
     className="hidden"
     onChange={handleFileChange}
    />
   </div>

   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <FaRegBell fontSize={18} />
   </div>

   <div
    className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full"
    onClick={() => setIsPickerOpen((open) => !open)}
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

export default AddNoteOptions
