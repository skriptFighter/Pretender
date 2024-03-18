import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
 deleteProfilePicture,
 editProfile as editProfileApi,
} from "../data/users"

export function useEditProfile() {
 const queryClient = useQueryClient()

 const { mutate: editProfile } = useMutation({
  mutationFn: (data) => {
   const { oldImage } = data
   editProfileApi(data)
   deleteProfilePicture(oldImage)
  },
  onSuccess: () => {
   toast.success("Infos successfully edited")
   queryClient.invalidateQueries({ queryKey: ["userInfos"] })
  },
  onError: (err) => toast.error(err.message),
 })

 return { editProfile }
}
