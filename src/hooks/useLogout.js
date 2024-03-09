import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../data/users"
import { useNavigate } from "react-router-dom"

export function useLogout() {
 const queryClient = useQueryClient()
 const navigate = useNavigate()

 const { mutate: logout, isLoading } = useMutation({
  mutationFn: logoutApi,
  onSuccess: () => {
   queryClient.removeQueries()
   navigate("/login")
  },
 })
 return { logout, isLoading }
}
