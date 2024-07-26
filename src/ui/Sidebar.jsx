import { FaRegStickyNote } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaRegBell } from "react-icons/fa"
import { MdNoteAdd } from "react-icons/md"

import { TbPinnedFilled } from "react-icons/tb"

import { Link, useLocation } from "react-router-dom"
import { useUserInfos } from "../hooks/useUserInfos"
import { MdOutlineDarkMode } from "react-icons/md"
import { MdOutlineWbSunny } from "react-icons/md"
import { CiLogout } from "react-icons/ci"
import { useDispatch, useSelector } from "react-redux"
import { selectDark, setDark, setModal } from "../notesSlice"
import { useLogout } from "../hooks/useLogout"

function Sidebar() {
 const { user } = useUserInfos()
 const { logout } = useLogout()

 const profilePicture = user?.[0]?.image
 const userName = user?.[0]?.username
 const dispatch = useDispatch()
 const isDark = useSelector(selectDark)
 const { pathname } = useLocation()
 const windowWidth = window.innerWidth

 const root = document.getElementsByTagName("html")[0]

 function dark() {
  root.classList.toggle("dark")
  dispatch(setDark(!isDark))
 }

 return (
  <div className=" fixed top-10 flex h-full flex-col justify-between pb-10 sm:min-w-10 md:min-w-40 lg:min-w-64">
   <div className="  flex  flex-col gap-4">
    <div className="flex flex-col">
     <Item
      icon={
       <img
        src={profilePicture}
        loading="lazy"
        alt="profile picture"
        className="h-12 w-12 rounded-md object-fill object-center"
       />
      }
      label={userName}
      style={{ paddingTop: "0.6rem", paddingBottom: "0.6rem" }}
      to={"/profile"}
     />

     <Item
      icon={windowWidth <= 640 && <MdNoteAdd fontSize={25} />}
      label={windowWidth > 640 && "Add Note"}
      onClick={() => dispatch(setModal("addNote"))}
      className={"justify-center bg-secondary dark:bg-secondaryDark"}
     />
    </div>

    <div>
     <Item icon={<FaRegStickyNote fontSize={23} />} label={"Notes"} />

     <Item
      to={"/pinned"}
      icon={<TbPinnedFilled fontSize={25} />}
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
     onClick={dark}
     to={pathname}
    />
    <Item onClick={logout} icon={<CiLogout fontSize={28} />} label={"Logout"} />
   </div>
  </div>
 )
}

function Item({ icon, label, to, style, className, onClick }) {
 const windowWidth = window.innerWidth

 return (
  <Link
   to={to}
   className={` flex w-full items-center gap-4 rounded-r-md p-5 hover:bg-tertiary hover:dark:bg-tertiaryDark sm:w-full ${className} ${windowWidth <= 640 && "justify-center"}`}
   onClick={onClick}
   style={style}
  >
   {icon}

   {windowWidth > 640 && <p className="text-md font-semibold ">{label}</p>}
  </Link>
 )
}

export default Sidebar
