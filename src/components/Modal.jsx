import { useDispatch } from "react-redux"
import { useClickOutside } from "../hooks/useClickOutside"

import { setModal } from "../notesSlice"
import { createPortal } from "react-dom"

function Modal({ children }) {
 const dispatch = useDispatch()
 const ref = useClickOutside(() => dispatch(setModal(false)))

 return createPortal(
  <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-primaryDark bg-opacity-50 ">
   <div ref={ref} className="w-1/4 rounded-lg bg-white p-4 shadow-lg">
    {children}
   </div>
  </div>,
  document.body
 )
}

export default Modal
