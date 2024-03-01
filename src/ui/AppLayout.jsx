import { Outlet } from "react-router-dom"
import Header from "./Header"

function AppLayout() {
 return (
  <div className="h-screen max-w-screen-2xl mx-auto py-5">
   <Header />

   <div className="mb-10" />

   <main>
    <Outlet />
   </main>
  </div>
 )
}

export default AppLayout
