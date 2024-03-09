import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"
import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAddNote } from "../hooks/useAddNote"
import TextareaAutosize from "react-textarea-autosize"

function AddNote() {
 const [isActive, setIsActive] = useState(false)
 const [isPinned, setIsPinned] = useState(false)

 const { addNote } = useAddNote()
 const { handleSubmit, register, reset } = useForm()

 function onSubmit(data) {
  addNote({ ...data, pinned: isPinned })
  reset()
  setIsActive(false)
 }

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col justify-between p-4 w-1/3 self-center shadow-zinc-700 shadow-sm rounded-lg"
   onClick={() => setIsActive(true)}
  >
   {isActive && (
    <div className="flex justify-between">
     <TextareaAutosize
      placeholder="Title"
      maxLength={100}
      maxRows={2}
      className="p-2 w-full font-semibold text-lg resize-none dark:bg-black dark:text-white  focus:border-none focus:outline-none"
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
    {...register("content")}
   />

   {isActive && (
    <div className="px-2 grid grid-cols-2">
     <Options />
     <Button type={"submit"} primary={true}>
      Save
     </Button>
    </div>
   )}
  </form>
 )
}

function Options() {
 return (
  <div className="flex gap-8 items-center ">
   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <CiImageOn fontSize={18} />
   </div>

   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <FaRegBell fontSize={18} />
   </div>

   <div className="cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full">
    <LuPaintbrush fontSize={18} />
   </div>
  </div>
 )
}

export default AddNote
