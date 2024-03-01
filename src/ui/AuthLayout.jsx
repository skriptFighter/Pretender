import { Outlet } from "react-router"

function AuthLayout() {
 return (
  <div className="max-w-[1520px] mx-auto flex justify-center items-center h-screen">
   <Outlet />
  </div>
 )
}

export default AuthLayout
