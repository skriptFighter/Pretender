import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { useAuthUser } from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { editProfile as editProfileApi } from "../data/users"

function Profile() {
 //todo pass userInfos from header instead of getUserInfos every time
 const { register, handleSubmit } = useForm()
 const { user } = useAuthUser()
 const queryClient = useQueryClient()

 const { mutate: editProfile } = useMutation({
  mutationFn: editProfileApi,
  onSuccess: () => {
   toast.success("Infos successfully edited")
   queryClient.invalidateQueries({ queryKey: ["userInfos"] })
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
