import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"

import { useForm } from "react-hook-form"
import { useAddNote } from "../hooks/useAddNote"
import TextareaAutosize from "react-textarea-autosize"
// import { useClickOutside } from "../hooks/useClickOutside"
import toast from "react-hot-toast"

import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import ColorPicker from "../components/ColorPicker"
import { useRef, useState } from "react"

function AddNote() {
 const [isPinned, setIsPinned] = useState(false)
 const [selectedColor, setSelectedColor] = useState()

 const { addNote } = useAddNote()
 const { handleSubmit, register, reset, setValue, watch } = useForm()

 const selectedImage = watch("image")

 function onSubmit(data) {
  if (selectedImage && selectedImage.type !== "image/jpeg") {
   toast.error("Please provide a JPEG image")
   return
  }

  addNote({ ...data, pinned: isPinned, bgColor: selectedColor })
  reset()
  setSelectedColor(null)
  setIsPinned(false)
 }

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col justify-between self-center rounded-lg p-4 shadow-sm shadow-zinc-700"
   style={{ backgroundColor: selectedColor }}
  >
   {selectedImage && (
    <img
     src={URL.createObjectURL(selectedImage)}
     alt="Note image"
     className="max-h-[600px] rounded-2xl object-contain"
    />
   )}

   <div className="flex justify-between">
    <TextareaAutosize
     placeholder="Title"
     maxLength={100}
     maxRows={2}
     className="w-full resize-none p-2 text-lg font-semibold focus:border-none focus:outline-none dark:bg-black dark:text-white"
     style={{ backgroundColor: selectedColor }}
     {...register("title")}
    />

    <div
     className="flex h-fit cursor-pointer items-center rounded-full p-3 hover:bg-gray-200"
     onClick={() => setIsPinned((pin) => !pin)}
    >
     {isPinned ? <TbPinnedFilled fontSize={23} /> : <VscPinned fontSize={23} />}
    </div>
   </div>

   <TextareaAutosize
    maxLength={800}
    maxRows={10}
    placeholder={"Take a note..."}
    className="w-full resize-none p-2 focus:border-none focus:outline-none dark:bg-black dark:text-white"
    style={{ backgroundColor: selectedColor }}
    {...register("content")}
   />

   <div className="grid grid-cols-2 px-2">
    <AddNoteOptions setSelectedColor={setSelectedColor} setValue={setValue} />
    <Button type={"submit"} primary={true}>
     Save
    </Button>
   </div>
  </form>
 )
}

function AddNoteOptions({ setSelectedColor, setValue }) {
 const [isPickerOpen, setIsPickerOpen] = useState(false)

 const fileInputRef = useRef(null)

 const handleFileChange = (e) => {
  const file = e.target.files[0]
  setValue("image", file)
 }

 return (
  <div className="relative flex items-center gap-8">
   <div
    className="flex cursor-pointer items-center rounded-full p-2 hover:bg-gray-200"
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

   <div className="flex cursor-pointer items-center rounded-full p-2 hover:bg-gray-200">
    <FaRegBell fontSize={18} />
   </div>

   <div
    className="flex cursor-pointer items-center rounded-full p-2 hover:bg-gray-200"
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
