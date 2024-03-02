import { FaRegStickyNote } from "react-icons/fa"
import { Link } from "react-router-dom"

function Sidebar() {
 return (
  <div className="flex flex-col h-full w-1/5 ">
   <Item />
   <Item />
   <Item />
   <Item />
   <Item />
   <Item />
  </div>
 )
}

function Item() {
 return (
  <Link className="flex gap-4 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 px-6 py-5 rounded-r-full">
   <FaRegStickyNote fontSize={23} />
   <p>Notes</p>
  </Link>
 )
}

export default Sidebar
