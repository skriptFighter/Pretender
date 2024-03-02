import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { useUser } from "../hooks/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { editProfile as editProfileApi } from "../data/users"

function Profile() {
 const { register, handleSubmit } = useForm()

 const { user } = useUser()

 const queryClient = useQueryClient()

 const { mutate: editProfile } = useMutation({
  mutationFn: editProfileApi,
  onSuccess: () => {
   toast.success("User successfully edited")
   queryClient.invalidateQueries({ queryKey: ["user"] })
  },
  onError: (err) => toast.error(err.message),
 })

 function onSubmit(data) {
  const avatar = data.avatar && data.avatar.length > 0 ? data.avatar[0] : null
  console.log(data)

  editProfile({
   user: { ...data, avatar },
   id: user?.id,
  })
 }

 return (
  <div>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Input
     htmlForId={"avatar"}
     label={"Upload avatar"}
     type={"file"}
     register={{
      ...register("avatar"),
     }}
    />
    <button type="submit">submit</button>
   </form>
  </div>
 )
}

export default Profile
