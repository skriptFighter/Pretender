import { useClickOutside } from "../hooks/useClickOutside"

function Modal({ setIsOpenModal }) {
 const ref = useClickOutside(() => setIsOpenModal(false))
 return (
  <div
   ref={ref}
   className="w-60 h-60 bg-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  ></div>
 )
}

export default Modal
