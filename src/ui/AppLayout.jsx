import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function AppLayout() {
 return (
  <main className="mx-auto flex gap-10 overflow-x-hidden pt-10">
   <Sidebar />
   <Outlet />
  </main>
 )
}

export default AppLayout
