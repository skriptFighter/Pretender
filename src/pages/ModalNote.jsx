import { useNavigate, useParams } from "react-router-dom"
import { useClickOutside } from "../hooks/useClickOutside"

import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"
import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import { useState } from "react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { CirclePicker } from "react-color"

function ModalNote() {
 const ref = useClickOutside(() => navigate("/"))
 const navigate = useNavigate()
 const { title, content, pinned, bgColor } = useParams()
 const [selectedColor, setSelectedColor] = useState(bgColor)

 const [isPinned, setIsPinned] = useState(pinned)
 //  const { addNote } = useAddNote()
 const { handleSubmit, register, reset } = useForm()
 function onSubmit(data) {
  // addNote({ ...data, pinned: isPinned })
  console.log(data)
  reset()
 }

 return (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
   <div ref={ref} className="bg-white p-4 rounded-lg shadow-lg w-1/4">
    <form
     onSubmit={handleSubmit(onSubmit)}
     className="relative flex flex-col justify-between p-4 self-center shadow-zinc-700 shadow-sm rounded-lg"
     style={{ backgroundColor: selectedColor || bgColor }}
    >
     <div className="flex justify-between">
      <TextareaAutosize
       placeholder="Title"
       defaultValue={title}
       maxLength={100}
       maxRows={2}
       className="p-2 w-full font-semibold text-lg resize-none dark:bg-black dark:text-white  focus:border-none focus:outline-none"
       style={{ backgroundColor: selectedColor || bgColor }}
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

     <TextareaAutosize
      maxLength={800}
      maxRows={10}
      placeholder={"Take a note..."}
      defaultValue={content}
      className="p-2 w-full resize-none dark:bg-black dark:text-white focus:border-none focus:outline-none"
      style={{ backgroundColor: selectedColor || bgColor }}
      {...register("content")}
     />

     <div className="px-2 grid grid-cols-2">
      <Options
       setSelectedColor={setSelectedColor}
       selectedColor={selectedColor}
      />
      <Button type={"submit"} primary={true}>
       Save
      </Button>
     </div>
    </form>
   </div>
  </div>
 )
}

function Options({ setSelectedColor, selectedColor }) {
 const [isPickOpen, setIsPickOpen] = useState(false)

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
    onClick={() => setIsPickOpen(true)}
   >
    <LuPaintbrush fontSize={18} />
   </div>

   {isPickOpen && (
    <ColorPicker
     setIsPickOpen={setIsPickOpen}
     setSelectedColor={setSelectedColor}
     selectedColor={selectedColor}
    />
   )}
  </div>
 )
}

function ColorPicker({ setIsPickOpen, setSelectedColor, selectedColor }) {
 const { register, watch, setValue } = useForm()
 setSelectedColor(() => watch("color"))

 const colorPickerRef = useClickOutside(() => setIsPickOpen(false))

 const handleColorChange = (color) => {
  setValue("color", color.hex)
 }

 return (
  <div
   className="flex items-center w-80 h-10 bg-white shadow-md shadow-black absolute -bottom-10 rounded-xl left-1/2 -translate-x-1/2 "
   ref={colorPickerRef}
  >
   <form>
    <CirclePicker
     onChange={handleColorChange}
     color={selectedColor}
     onChangeComplete={() => setIsPickOpen(false)}
     colors={colorsList}
     styles={pickerStyles}
    />
    <input type="hidden" {...register("color")} />
   </form>
  </div>
 )
}

const pickerStyles = {
 default: {
  card: {
   width: "100%",
   marginRight: "0",
   marginLeft: "22px",
  },
 },
}

const colorsList = [
 "#f44336",
 "#0693e3",
 "#00d084",
 "#ffeb3b",
 "#b279d2",
 "#ff6900",
 "#e91e63",
]

export default ModalNote
