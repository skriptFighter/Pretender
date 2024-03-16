import { useNavigate, useParams } from "react-router-dom"
import { useClickOutside } from "../hooks/useClickOutside"

import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"
import { FaRegBell } from "react-icons/fa"
import { CiImageOn } from "react-icons/ci"
import { LuPaintbrush } from "react-icons/lu"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import ColorPicker from "../components/ColorPicker"
import { useUpdateNote } from "../hooks/useUpdateNote"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentNote, setCurrentNote, setNotes } from "../notesSlice"
import { useNotes } from "../hooks/useNotes"

function ModalNote() {
 const { notes } = useNotes()
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const ref = useClickOutside(() => navigate("/"))
 const { id } = useParams()

 useEffect(
  function () {
   if (notes) {
    dispatch(setNotes(notes))
    dispatch(setCurrentNote(id))
   }
  },
  [dispatch, notes, id]
 )

 const currentNote = useSelector(selectCurrentNote)

 const { handleSubmit, register } = useForm()
 const { updateNote } = useUpdateNote()

 const [selectedColor, setSelectedColor] = useState(currentNote?.bgColor)
 const [isPinned, setIsPinned] = useState(currentNote?.pinned)

 function onSubmit(data) {
  updateNote({ ...data, pinned: isPinned, bgColor: selectedColor, id })
  navigate("/")
 }

 return (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 z-50 ">
   <div ref={ref} className="bg-white p-4 rounded-lg shadow-lg w-1/4">
    <form
     onSubmit={handleSubmit(onSubmit)}
     className="relative flex flex-col justify-between p-4 self-center shadow-zinc-700 shadow-sm rounded-lg"
     style={{ backgroundColor: selectedColor || currentNote?.bgColor }}
    >
     <div className="flex justify-between">
      <TextareaAutosize
       placeholder="Title"
       defaultValue={currentNote?.title}
       maxLength={100}
       maxRows={2}
       className="p-2 w-full font-semibold text-lg resize-none dark:bg-black dark:text-white  focus:border-none focus:outline-none"
       style={{ backgroundColor: selectedColor || currentNote?.bgColor }}
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
      defaultValue={currentNote?.content}
      className="p-2 w-full resize-none dark:bg-black dark:text-white focus:border-none focus:outline-none"
      style={{ backgroundColor: selectedColor || currentNote?.bgColor }}
      {...register("content")}
     />

     <div className="px-2 grid grid-cols-2">
      <Options setSelectedColor={setSelectedColor} />
      <Button type={"submit"} primary={true}>
       Save
      </Button>
     </div>
    </form>
   </div>
  </div>
 )
}

function Options({ setSelectedColor }) {
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

export default ModalNote
