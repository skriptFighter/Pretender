import { Outlet } from "react-router"
import { useAuthUser } from "../hooks/useAuthUser"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function AuthLayout() {
 const navigate = useNavigate()
 const { isAuthenticated } = useAuthUser()

 useEffect(
  function () {
   if (isAuthenticated) navigate("/")
  },
  [isAuthenticated, navigate]
 )

 return (
  <div className=" mx-auto flex h-screen items-center justify-center">
   <Outlet />
  </div>
 )
}

export default AuthLayout
