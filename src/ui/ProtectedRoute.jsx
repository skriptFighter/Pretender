import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useAuthUser } from "../hooks/useAuthUser"

function ProtectedRoute({ children }) {
 const navigate = useNavigate()
 const { isLoading, isAuthenticated } = useAuthUser()

 useEffect(
  function () {
   if (!isAuthenticated && !isLoading) navigate("/login")
  },
  [isAuthenticated, navigate, isLoading]
 )

 if (isLoading) return <p>isLoading...</p>

 if (isAuthenticated) return children
}

export default ProtectedRoute
