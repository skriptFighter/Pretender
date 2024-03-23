import { FaRegStickyNote } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaRegBell } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useUserInfos } from "../hooks/useUserInfos"

function Sidebar() {
 const { user } = useUserInfos()
 const profilePicture = user?.[0]?.image
 const userName = user?.[0]?.username

 return (
  <div className="fixed top-10 flex h-full min-w-64 flex-col bg-white dark:bg-black">
   <div className="flex items-center gap-4 px-4">
    <img
     src={profilePicture}
     loading="lazy"
     alt="profile picture"
     className="h-10 w-10 rounded-md object-fill object-center"
    />
    <p className="text-lg font-semibold">{userName}</p>
   </div>

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
   className="flex items-center gap-4 rounded-r-full px-6 py-5 hover:bg-zinc-200 dark:hover:bg-zinc-700 "
  >
   {icon}
   <p>{label}</p>
  </Link>
 )
}

export default Sidebar
