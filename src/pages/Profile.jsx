import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { useAuthUser } from "../hooks/useAuthUser"
import { useEditProfile } from "../hooks/useEditProfile"
import { useUserInfos } from "../hooks/useUserInfos"

function Profile() {
 //todo pass userInfos from header instead of getUserInfos every time
 const { register, handleSubmit } = useForm()
 const { user: authUser } = useAuthUser()
 const { editProfile } = useEditProfile()
 const { user } = useUserInfos()
 //  const navigate = useNavigate()

 //bug
 //  useEffect(
 //   function () {
 //    if (!isAuthenticated) navigate("/login")
 //   },
 //   [isAuthenticated, navigate]
 //  )

 function onSubmit(data) {
  const image = data?.image && data.image.length > 0 ? data.image[0] : null

  editProfile({
   user: { ...data, image },
   id: authUser.id,
  })
 }

 return (
  <div>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Input
     htmlForId={"image"}
     label={"Profile picture"}
     type={"file"}
     register={{
      ...register("image"),
     }}
    />

    <Input
     htmlForId={"username"}
     label={"username"}
     type={"text"}
     defaultValue={user?.[0]?.username}
     register={{
      ...register("username"),
     }}
    />

    <Input
     htmlForId={"email"}
     label={"Email"}
     type={"text"}
     defaultValue={user?.[0]?.email}
     register={{
      ...register("email"),
     }}
    />

    <button type="submit">submit</button>
   </form>
  </div>
 )
}

export default Profile
