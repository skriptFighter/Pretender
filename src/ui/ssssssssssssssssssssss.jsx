// import { useDispatch, useSelector } from "react-redux"
// import { setCurrentNote, setModal } from "../notesSlice"
// import { useState } from "react"
// import { useUpdatePinned } from "../hooks/useUpdatePinned"
// import ColorPicker from "../components/ColorPicker"
// import Button from "../components/Button"
// import { TbPinnedFilled } from "react-icons/tb"
// import { VscPinned } from "react-icons/vsc"
// import { CiImageOn } from "react-icons/ci"
// import { LuPaintbrush } from "react-icons/lu"
// import { MdDeleteOutline } from "react-icons/md"

// import { useUpdateTrash } from "../hooks/useUpdateTrash"

// function PinnedNote({ title, content, id, pinned, bgColor, image, deleted }) {
//  const [selectedColor, setSelectedColor] = useState(null)
//  const dispatch = useDispatch()

//  const imageValid = image && typeof image === "string"
//  const imageLoading = image && typeof image === "object"

//  function handleClick() {
//   dispatch(setCurrentNote(id))
//   dispatch(setModal("currentNote"))
//  }

//  return (
//   <div
//    className="flex h-40 w-full items-center  rounded-md shadow-md dark:shadow-sm dark:shadow-slate-800"
//    style={{
//     border: `solid 2px ${selectedColor || bgColor}`,
//    }}
//    onClick={handleClick}
//   >
//    {imageValid && (
//     <div className="p-2">
//      <img loading="lazy" src={image} className="h-36 w-64 " />
//     </div>
//    )}

//    {/*
//    {imageLoading && (
//     <div>
//      <img
//       loading="lazy"
//       src={URL.createObjectURL(image)}
//       className="object-contain"
//      />
//     </div>
//    )} */}

//    <div
//     className="flex h-full  flex-grow flex-col"
//     style={{ backgroundColor: selectedColor || bgColor }}
//    >
//     <div className="break-words text-lg font-semibold ">{title}</div>
//     <p className=" break-words pb-2">{content}</p>
//    </div>
//   </div>
//  )
// }

// function NoteOptions({ id, pinned, setSelectedColor, deleted }) {
//  const { updatePinned } = useUpdatePinned()
//  const [isPickerOpen, setIsPickerOpen] = useState(null)
//  const { updateTrash } = useUpdateTrash()

//  function togglePick(id) {
//   setIsPickerOpen(isPickerOpen === id ? null : id)
//  }

//  return (
//   <div className="relative">
//    <div className="flex justify-start gap-8 px-4 opacity-0 transition-all duration-300 ">
//     <Button
//      header={true}
//      onClick={() => updatePinned({ isPinned: !pinned, id })}
//     >
//      {pinned ? (
//       <TbPinnedFilled fontSize={20} cursor={"pointer"} />
//      ) : (
//       <VscPinned fontSize={20} cursor={"pointer"} />
//      )}
//     </Button>

//     <Button header={true}>
//      <CiImageOn fontSize={20} cursor={"pointer"} />
//     </Button>

//     <Button header={true} onClick={() => togglePick(id)}>
//      <LuPaintbrush fontSize={20} cursor={"pointer"} />
//     </Button>

//     <Button header={true} onClick={() => updateTrash({ id, deleted })}>
//      <MdDeleteOutline fontSize={20} cursor={"pointer"} />
//     </Button>
//    </div>

//    {isPickerOpen === id && (
//     <ColorPicker
//      setIsPickerOpen={setIsPickerOpen}
//      id={id}
//      setSelectedColor={setSelectedColor}
//     />
//    )}
//   </div>
//  )
// }

// export default PinnedNote
