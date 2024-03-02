import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AppLayout() {
 return (
  <div className="h-screen mx-auto">
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
