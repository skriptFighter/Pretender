import { IoIosLogOut } from "react-icons/io"
import { IoIosMenu } from "react-icons/io"
import { IoIosRefresh } from "react-icons/io"

import Button from "../components/Button"

import { useLogout } from "../hooks/useLogout"
import SearchBar from "../components/SearchBar"
import { Link } from "react-router-dom"
import { useUserInfos } from "../hooks/useUserInfos"

function Header() {
 const { logout } = useLogout()
 const { user } = useUserInfos()
 const { username, avatar } = user?.[0] || {}

 return (
  <div className="flex justify-between items-center p-5">
   <Item icon={<IoIosMenu fontSize={27} />} />
   <SearchBar />

   <div className="flex items-center gap-4">
    <Link to={"/profile"}>
     <img src={avatar} className="w-10 h-10 rounded-full" />
    </Link>

    <p>{username}</p>

    <Item icon={<IoIosRefresh fontSize={27} />} />
    <Item onClick={logout} icon={<IoIosLogOut fontSize={27} />} />
   </div>
  </div>
 )
}

function Item({ icon, onClick }) {
 return (
  <Button onClick={onClick} header={true}>
   {icon}
  </Button>
 )
}

export default Header
