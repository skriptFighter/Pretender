import { Outlet } from "react-router"

function AuthLayout() {
 return (
  <div className=" mx-auto flex justify-center items-center h-screen">
   <Outlet />
  </div>
 )
}

export default AuthLayout
