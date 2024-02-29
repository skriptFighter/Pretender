import { Outlet } from "react-router-dom"
import Header from "./Header"

function AppLayout() {
 return (
  <div className="max-w-[1520px] mx-auto my-5">
   <Header />

   <div className="mb-10" />

   <main>
    <Outlet />
   </main>
  </div>
 )
}

export default AppLayout
