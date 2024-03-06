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

 const {
  register,
  handleSubmit,
  formState: { errors },
  getValues,
 } = useForm()

 const { user: authUser, isAuthenticated, isLoading } = useAuthUser()
 const navigate = useNavigate()

 useEffect(
  function () {
   if (!isAuthenticated && !isLoading) navigate("/login")
  },
  [isAuthenticated, navigate, isLoading]
 )

 function onSubmit(data) {
  const image =
   data?.image && data.image.length > 0 ? data.image[0] : user[0].image
  const username = data?.username || user[0].username
  const password = data.newPassword || null

  editProfile({
   user: { username, image },
   password,
   id: authUser.id,
  })
 }

 return (
  <div className="w-1/4 mx-auto flex justify-center items-center h-screen">
   <div className=" bg-zinc-100 py-12 px-8 rounded-lg outline-black shadow-xl">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="mb-8">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p>Update your profile information.</p>
     </div>

     <div className="flex flex-col gap-5 ">
      <div className="flex items-center gap-4">
       <div className="w-1/4">
        <img src={user?.[0]?.image} alt="" className="w-full rounded-full" />
       </div>
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
        type="password"
        placeholder="New password"
        className="p-2"
        {...register("newPassword")}
       />
      </div>

      <div className="flex flex-col">
       <label htmlFor="rePassword">Confirm new password</label>
       <input
        id="rePassword"
        type="password"
        placeholder="Confirm password"
        className="p-2"
        {...register("rePassword", {
         validate: (value) =>
          value === getValues().newPassword || "Passwords need to match",
        })}
       />
       <p
        className={`text-red-500 opacity-0 ${errors?.rePassword?.message && "opacity-100"}`}
       >
        Passwords need to match
       </p>
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
