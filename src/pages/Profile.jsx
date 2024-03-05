import { useForm } from "react-hook-form"
import { useAuthUser } from "../hooks/useAuthUser"
import { useEditProfile } from "../hooks/useEditProfile"
import { useUserInfos } from "../hooks/useUserInfos"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

function Profile() {
 const { editProfile } = useEditProfile()
 const { user } = useUserInfos()

 const { register, handleSubmit } = useForm()

 const { user: authUser, isAuthenticated, isLoading } = useAuthUser()
 const navigate = useNavigate()

 useEffect(
  function () {
   if (!isAuthenticated && !isLoading) navigate("/login")
   //  if (isAuthenticated && isLoading) return <p>loading...</p>
  },
  [isAuthenticated, navigate, isLoading]
 )

 function onSubmit(data) {
  const image = data?.image && data.image.length > 0 ? data.image[0] : null

  editProfile({
   user: { ...data, image },
   id: authUser.id,
  })
  console.log(data)
 }

 return (
  <div className="w-1/3 mx-auto flex justify-center items-center h-screen">
   <div className="bg-zinc-100 py-12 px-8 rounded-lg outline-black shadow-xl">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="mb-8">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p>Update your profile information.</p>
     </div>

     <div className="flex flex-col gap-5 ">
      <div className="flex items-center gap-4">
       <img src={user?.[0]?.image} alt="" className="w-1/4 rounded-full" />
       <input type="file" {...register("image")} />
      </div>

      <div className="flex flex-col">
       <label htmlFor="username">Username</label>
       <input
        id="username"
        type="text"
        placeholder="Username"
        defaultValue={user?.[0]?.username}
        className="p-2"
        {...register("username")}
       />
      </div>

      <div className="flex flex-col">
       <label htmlFor="email">Email</label>
       <input
        id="email"
        type="text"
        placeholder="Email"
        defaultValue={user?.[0]?.email}
        disabled={true}
        className="p-2"
       />
      </div>

      <div className="flex flex-col">
       <label htmlFor="newPassword">New password</label>
       <input
        id="newPassword"
        type="newPassword"
        placeholder="New password"
        className="p-2"
        {...register("newPassword")}
       />
      </div>

      <div className="flex flex-col">
       <label htmlFor="rePassword">Confirm new password</label>
       <input
        id="rePassword"
        type="text"
        placeholder="Confirm password"
        className="p-2"
        {...register("rePassword")}
       />
      </div>

      <Button primary={true} type={"submit"}>
       Save
      </Button>
     </div>
    </form>
   </div>
  </div>
 )
}

export default Profile
