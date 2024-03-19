import { FaRegStickyNote } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaRegBell } from "react-icons/fa"
import { Link } from "react-router-dom"

function Sidebar() {
 return (
  <div className="flex flex-col h-full min-w-64 ">
   <Item icon={<FaRegStickyNote fontSize={23} />} label={"Notes"} />
   <Item icon={<FaRegBell fontSize={23} />} label={"Reminders"} />
   <Item
    icon={<MdDeleteOutline fontSize={28} />}
    label={"Trash"}
    to={"/trash"}
   />
  </div>
 )
}

function Item({ icon, label, to }) {
 return (
  <Link
   to={to}
   className="flex gap-4 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 px-6 py-5  rounded-r-full"
  >
   {icon}
   <p>{label}</p>
  </Link>
 )
}

export default Sidebar
