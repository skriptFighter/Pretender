import { IoIosLogOut } from "react-icons/io"
import { IoIosMenu } from "react-icons/io"
import { TfiViewList } from "react-icons/tfi"
import { IoGridOutline } from "react-icons/io5"

import Button from "../components/Button"

import { useLogout } from "../hooks/useLogout"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import { useUserInfos } from "../hooks/useUserInfos"
import { useDispatch, useSelector } from "react-redux"
import { selectIsGrid, setGridView } from "../notesSlice"

function Header() {
 const { logout } = useLogout()
 const { user } = useUserInfos()
 const { username, image } = user?.[0] || {}

 const dispatch = useDispatch()
 const isGrid = useSelector(selectIsGrid)

 return (
  <div className="flex justify-between items-center p-5 border-b-2 py-8 ">
   <Item>
    <IoIosMenu fontSize={27} />
   </Item>

   <SearchBar />

   <div className="flex items-center gap-4">
    <Link to={"/profile"}>
     <img src={image} className="w-10 h-10 rounded-full" />
    </Link>

    <p>{username}</p>

    <Item onClick={() => dispatch(setGridView())}>
     {isGrid ? (
      <TfiViewList fontSize={27} className="p-1" />
     ) : (
      <IoGridOutline fontSize={27} className="p-1" />
     )}
    </Item>

    <Item onClick={logout}>
     <IoIosLogOut fontSize={27} />
    </Item>
   </div>
  </div>
 )
}

function Item({ onClick, children }) {
 return (
  <Button onClick={onClick} header={true}>
   {children}
  </Button>
 )
}

export default Header
