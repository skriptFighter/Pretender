import {
 Route,
 RouterProvider,
 createBrowserRouter,
 createRoutesFromElements,
} from "react-router-dom"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./ui/AppLayout"
import Login from "./pages/Login"
import ProtectedRoute from "./ui/ProtectedRoute"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Toast from "./ui/Toast"
import AuthLayout from "./ui/AuthLayout"
import Dark from "./ui/Dark"
import Profile from "./pages/Profile"
import ModalNote from "./pages/ModalNote"

export default function App() {
 const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route
     path="/"
     element={
      <ProtectedRoute>
       <AppLayout />
      </ProtectedRoute>
     }
    >
     <Route index element={<Dashboard />} />
     <Route
      path="/note/:id/:title/:content/:pinned/:bgColor"
      element={<ModalNote />}
     />
    </Route>

    <Route path="profile" element={<Profile />} />

    <Route element={<AuthLayout />}>
     <Route path="login" element={<Login />} />
     <Route path="signup" element={<SignUp />} />
    </Route>
   </>
  )
 )

 const queryClient = new QueryClient({
  defaultOptions: {
   queries: {
    staleTime: 0,
   },
  },
 })

 return (
  <QueryClientProvider client={queryClient}>
   <ReactQueryDevtools initialIsOpen={false} />
   <RouterProvider router={router} />
   <Toast />
   <Dark />
  </QueryClientProvider>
 )
}
