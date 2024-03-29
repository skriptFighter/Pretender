import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { useEffect } from "react"
import Button from "../components/Button"

import { useAuthUser } from "../hooks/useAuthUser"
import { useUserInfos } from "../hooks/useUserInfos"
import { useEditProfile } from "../hooks/useEditProfile"
import Modal from "../components/Modal"
import AddNote from "../ui/AddNote"
import { useSelector } from "react-redux"
import { selectModal } from "../notesSlice"

function Profile() {
 const { editProfile } = useEditProfile()
 const { user } = useUserInfos()
 const modal = useSelector(selectModal)

 const {
  register,
  handleSubmit,
  formState: { errors },
  getValues,
  watch,
 } = useForm()
 const selectedImage = watch("image")

 const { user: authUser, isAuthenticated, isLoading } = useAuthUser()
 const navigate = useNavigate()

 useEffect(
  function () {
   if (!isAuthenticated && !isLoading) navigate("/login")
  },
  [isAuthenticated, navigate, isLoading]
 )

 function onSubmit(data) {
  if (selectedImage && selectedImage?.[0]?.type !== "image/jpeg") {
   toast.error("Please provide a JPEG image")
   return
  }

  const image =
   data.image && data.image.length > 0 ? data.image[0] : user[0].image
  const username = data?.username || user[0].username
  const password = data.newPassword || null
  const oldImage = user?.[0]?.image

  editProfile({
   oldImage: oldImage,
   user: { username, image },
   password,
   id: authUser.id,
  })
 }

 return (
  <div className="mx-auto flex h-screen w-1/4 items-center justify-center">
   <div className=" rounded-lg bg-zinc-100 px-8 py-12 shadow-xl outline-black">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="mb-8">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p>Update your profile information.</p>
     </div>

     <div className="flex flex-col gap-5 ">
      <div className="flex items-center gap-4">
       <div className="flex  w-1/2 justify-center ">
        <img
         src={
          selectedImage && selectedImage?.[0]
           ? URL.createObjectURL(selectedImage?.[0])
           : user?.[0]?.image
         }
         alt="profile picture"
         className="h-20 w-20 rounded-full "
        />
       </div>
       <input type="file" accept="image/jpeg" {...register("image")} />
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

   {modal === "addNote" && (
    <Modal>
     <AddNote />
    </Modal>
   )}
  </div>
 )
}

export default Profile
