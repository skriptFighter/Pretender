import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"
import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useAddNote } from "../hooks/useAddNote"
import TextareaAutosize from "react-textarea-autosize"
import { useClickOutside } from "../hooks/useClickOutside"
import ColorPicker from "../components/ColorPicker"

function AddNote() {
 const [isActive, setIsActive] = useState(false)
 const [isPinned, setIsPinned] = useState(false)
 const [selectedColor, setSelectedColor] = useState()

 const { addNote } = useAddNote()
 const { handleSubmit, register, reset, setValue } = useForm()

 const ref = useClickOutside(() => setIsActive(false))

 function onSubmit(data) {
  addNote({ ...data, pinned: isPinned, bgColor: selectedColor })
  reset()
  setIsActive(false)
 }

 return (
  <form
   ref={ref}
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col justify-between p-4 w-1/3 self-center shadow-zinc-700 shadow-sm rounded-lg"
   onClick={() => setIsActive(true)}
   style={{ backgroundColor: selectedColor }}
  >
   {isActive && (
    <div className="flex justify-between">
     <TextareaAutosize
      placeholder="Title"
      maxLength={100}
      maxRows={2}
      className="p-2 w-full font-semibold text-lg resize-none dark:bg-black dark:text-white  focus:border-none focus:outline-none"
      style={{ backgroundColor: selectedColor }}
      {...register("title")}
     />

     <div
      className="cursor-pointer hover:bg-gray-200 flex items-center p-3 h-fit rounded-full"
      onClick={() => setIsPinned((pin) => !pin)}
     >
      {isPinned ? (
       <TbPinnedFilled fontSize={23} />
      ) : (
       <VscPinned fontSize={23} />
      )}
     </div>
    </div>
   )}

   <TextareaAutosize
    maxLength={800}
    maxRows={10}
    placeholder={"Take a note..."}
    className="p-2 w-full resize-none dark:bg-black dark:text-white focus:border-none focus:outline-none"
    style={{ backgroundColor: selectedColor }}
    {...register("content")}
   />

   {isActive && (
    <div className="px-2 grid grid-cols-2">
     <Options setSelectedColor={setSelectedColor} setValue={setValue} />
     <Button type={"submit"} primary={true}>
      Save
     </Button>
    </div>
   )}
  </form>
 )
}

function Options({ setSelectedColor, setValue }) {
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

export default AddNote
