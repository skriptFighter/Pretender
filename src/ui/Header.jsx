import Button from "../components/Button"
import { IoIosLogOut } from "react-icons/io"
import { useLogout } from "../hooks/useLogout"

function Header() {
 const { logout } = useLogout()

 return (
  <div className="flex justify-between items-center">
   <Button round={true} onClick={logout}>
    <IoIosLogOut />
   </Button>

   <div>Pretender</div>

   <div className="flex items-center gap-5">
    <img
     src="https://i.pravatar.cc/200"
     alt=""
     className="w-10 h-10 rounded-full"
    />

    <p>John Doe</p>

    <Button round={true} onClick={logout}>
     <IoIosLogOut />
    </Button>
   </div>
  </div>
 )
}

export default Header
