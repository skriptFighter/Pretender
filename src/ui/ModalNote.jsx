import { useNavigate, useParams } from "react-router-dom"
import { useClickOutside } from "../hooks/useClickOutside"

import Button from "../components/Button"

import { VscPinned } from "react-icons/vsc"
import { TbPinnedFilled } from "react-icons/tb"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { useUpdateNote } from "../hooks/useUpdateNote"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentNote, setModal, setNotes } from "../notesSlice"
import { useNotes } from "../hooks/useNotes"
import ModalNoteOptions from "./ModalNoteOptions"
import { createPortal } from "react-dom"
import toast from "react-hot-toast"

function ModalNote() {
 const { notes } = useNotes()
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const ref = useClickOutside(() => {
  navigate("/")
  dispatch(setModal(false))
 })

 const { id } = useParams()

 useEffect(
  function () {
   if (notes) {
    dispatch(setNotes(notes))
   }
  },
  [dispatch, notes]
 )

 const currentNote = useSelector(selectCurrentNote)

 const { handleSubmit, register, setValue, watch } = useForm()
 const { updateNote } = useUpdateNote()

 const [selectedColor, setSelectedColor] = useState(currentNote?.bgColor)
 const [isPinned, setIsPinned] = useState(currentNote?.pinned)

 const selectedImage = watch("image")
 function onSubmit(data) {
  if (selectedImage && selectedImage.type !== "image/jpeg") {
   toast.error("Please provide a JPEG image")
   return
  }
  const image = selectedImage || currentNote.image

  updateNote({ ...data, pinned: isPinned, bgColor: selectedColor, id, image })
  // console.log({ ...data, pinned: isPinned, bgColor: selectedColor, id, image })
  navigate("/")
  dispatch(setModal(false))
 }

 return createPortal(
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
   <div ref={ref} className="bg-white p-4 rounded-lg shadow-lg w-1/4">
    <form
     onSubmit={handleSubmit(onSubmit)}
     className="relative flex flex-col justify-between p-4 self-center shadow-zinc-700 shadow-sm rounded-lg"
     style={{ backgroundColor: selectedColor || currentNote?.bgColor }}
    >
     <div className="flex justify-between max-h-80 w-full">
      {selectedImage && (
       <img
        src={URL.createObjectURL(selectedImage)}
        alt="Note image"
        className="rounded-2xl object-contain"
       />
      )}

      {currentNote?.image && !selectedImage && (
       <img
        src={currentNote.image}
        alt="Note image"
        className="rounded-2xl object-contain"
       />
      )}

      <div
       className="cursor-pointer hover:bg-gray-200 flex items-center p-3 h-fit rounded-full absolute top-2 right-2"
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
      placeholder="Title"
      defaultValue={currentNote?.title}
      maxLength={100}
      maxRows={2}
      className="p-2 w-full font-semibold text-lg resize-none dark:bg-black dark:text-white  focus:border-none focus:outline-none"
      style={{ backgroundColor: selectedColor || currentNote?.bgColor }}
      {...register("title")}
     />

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
      <ModalNoteOptions
       setSelectedColor={setSelectedColor}
       setValue={setValue}
      />
      <Button type={"submit"} primary={true}>
       Save
      </Button>
     </div>
    </form>
   </div>
  </div>,
  document.body
 )
}

export default ModalNote
