import { useMutation } from "@tanstack/react-query"
import { login as loginApi } from "../data/users"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

export function useLogin() {
 const navigate = useNavigate()

 const { mutate: login, isLoading } = useMutation({
  mutationFn: (data) => loginApi(data),
  onSuccess: () => {
   navigate("/")
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { login, isLoading }
}
