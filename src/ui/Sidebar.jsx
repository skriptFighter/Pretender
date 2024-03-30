import { FaRegStickyNote } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaRegBell } from "react-icons/fa"

import { TbPinnedFilled } from "react-icons/tb"

import { Link } from "react-router-dom"
import { useUserInfos } from "../hooks/useUserInfos"
import { MdOutlineDarkMode } from "react-icons/md"
import { MdOutlineWbSunny } from "react-icons/md"
import { CiLogout } from "react-icons/ci"
import { useDispatch } from "react-redux"
import { setModal } from "../notesSlice"
import { useState } from "react"

function Sidebar() {
 const { user } = useUserInfos()
 const profilePicture = user?.[0]?.image
 const userName = user?.[0]?.username
 const dispatch = useDispatch()

 const root = document.getElementsByTagName("html")[0]
 const [isDark, setIsDark] = useState(false)

 function dark() {
  root.classList.toggle("dark")
  setIsDark(!isDark)
 }

 return (
  <div className="fixed top-10 flex h-full min-w-64 flex-col justify-between pb-10">
   <div className="  flex  flex-col gap-4">
    <div className="flex flex-col">
     <Link
      to="/profile"
      className="flex items-center gap-4 rounded-r-md px-4 py-2 hover:bg-tertiary hover:dark:bg-tertiaryDark"
     >
      <img
       src={profilePicture}
       loading="lazy"
       alt="profile picture"
       className="h-12 w-12 rounded-md object-fill object-center"
      />

      <p className="text-lg font-semibold">{userName}</p>
     </Link>

     <div
      className="cursor-pointer rounded-r-md bg-secondary px-4 py-2 text-center font-semibold hover:bg-tertiary dark:bg-tertiaryDark"
      onClick={() => dispatch(setModal("addNote"))}
     >
      Add Note
     </div>
    </div>

    <div>
     <Item
      icon={<FaRegStickyNote fontSize={23} />}
      label={"Notes"}
      className={"py-0"}
     />

     <Item
      to={"/pinned"}
      icon={<TbPinnedFilled fontSize={23} />}
      label={"Pinned"}
     />

     <Item icon={<FaRegBell fontSize={23} />} label={"Reminders"} />
     <Item
      icon={<MdDeleteOutline fontSize={28} />}
      label={"Trash"}
      to={"/trash"}
     />
    </div>
   </div>

   <div>
    <Item
     icon={
      isDark ? (
       <MdOutlineWbSunny fontSize={28} />
      ) : (
       <MdOutlineDarkMode fontSize={28} />
      )
     }
     label={isDark ? "Light" : "Dark"}
     onClick={() => dark()}
    />
    <Item icon={<CiLogout fontSize={28} />} label={"Logout"} />
   </div>
  </div>
 )
}

function Item({ icon, label, to, className, onClick }) {
 return (
  <Link
   to={to}
   className={`flex items-center gap-4 rounded-r-md px-4 py-5 hover:bg-tertiary hover:dark:bg-tertiaryDark ${className}`}
   onClick={onClick}
  >
   {icon}
   <p className="text-md font-semibold">{label}</p>
  </Link>
 )
}

export default Sidebar
