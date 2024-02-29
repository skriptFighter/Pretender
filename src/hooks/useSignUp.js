import { useMutation } from "@tanstack/react-query"
import { signUp as signUpApi } from "../data/users"
import { useState } from "react"
import toast from "react-hot-toast"

export function useSignUp() {
 const [isSignedUp, setIsSignedUp] = useState(false)

 const { mutate: signUp, isLoading } = useMutation({
  mutationFn: signUpApi,
  onSuccess: () => {
   toast.success("Account successfully created")
   setIsSignedUp(true)
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { signUp, isLoading, isSignedUp }
}
