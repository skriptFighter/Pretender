import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function AppLayout() {
 return (
  <main className="mx-auto flex gap-10 overflow-x-hidden bg-primary pt-10 text-textPrimary dark:bg-primaryDark dark:text-textSecondary ">
   <Sidebar />
   <Outlet />
  </main>
 )
}

export default AppLayout
