import { IoIosLogOut } from "react-icons/io"
import { IoIosMenu } from "react-icons/io"
import { IoIosRefresh } from "react-icons/io"

import Button from "../components/Button"

import { useLogout } from "../hooks/useLogout"
import SearchBar from "../components/SearchBar"

function Header() {
 const { logout } = useLogout()

 return (
  <div className="flex justify-between items-center p-5">
   <Button header={true}>
    <IoIosMenu />
   </Button>

   <SearchBar />

   <div className="flex items-center gap-4">
    <img
     src="https://i.pravatar.cc/200"
     alt=""
     className="w-10 h-10 rounded-full"
    />

    <p>John Doe</p>

    <Button header={true}>
     <IoIosRefresh />
    </Button>

    <Button header={true} onClick={logout}>
     <IoIosLogOut />
    </Button>
   </div>
  </div>
 )
}

export default Header
