import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AppLayout() {
 return (
  <div className="mx-auto overflow-x-hidden">
   <Header />

   <div className="mb-10" />

   <main className="flex gap-10">
    <Sidebar />
    <Outlet />
   </main>
  </div>
 )
}

export default AppLayout
