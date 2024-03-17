import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAddNote } from "../hooks/useAddNote"
import TextareaAutosize from "react-textarea-autosize"
import { useClickOutside } from "../hooks/useClickOutside"
import toast from "react-hot-toast"
import AddNoteOptions from "./AddNoteOptions"

function AddNote() {
 const [isActive, setIsActive] = useState(false)
 const [isPinned, setIsPinned] = useState(false)
 const [selectedColor, setSelectedColor] = useState()

 const { addNote } = useAddNote()
 const { handleSubmit, register, reset, setValue, watch } = useForm()

 const ref = useClickOutside(() => setIsActive(false))
 const selectedImage = watch("image")

 function onSubmit(data) {
  if (selectedImage?.type !== "image/jpeg") {
   toast.error("Please provide a JPEG image")
   return
  }

  addNote({ ...data, pinned: isPinned, bgColor: selectedColor })
  reset()
  setIsActive(false)
  setSelectedColor(null)
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
    <>
     {selectedImage && (
      <img
       src={URL.createObjectURL(selectedImage)}
       alt="Note image"
       className="rounded-2xl"
      />
     )}

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
    </>
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
     <AddNoteOptions setSelectedColor={setSelectedColor} setValue={setValue} />
     <Button type={"submit"} primary={true}>
      Save
     </Button>
    </div>
   )}
  </form>
 )
}
export default AddNote
