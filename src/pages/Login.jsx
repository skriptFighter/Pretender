import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router"
import { useEffect } from "react"

function Login() {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm()

 //  isLoading: isLogin
 const { login } = useLogin()
 const { isAuthenticated } = useUser()
 const navigate = useNavigate()

 useEffect(
  function () {
   if (isAuthenticated) navigate("/")
  },
  [isAuthenticated, navigate]
 )

 function onSubmit(data) {
  login(data)
  reset()
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <input
    id="email"
    type="text"
    defaultValue="adelboudjema099@gmail.com"
    {...register("email", { required: true })}
    className=" border-red-900  border"
   />
   {errors?.password?.message && <p>{errors.password.message}</p>}

   <input
    id="password"
    type="password"
    defaultValue={"b46b6b84b82b14b7"}
    {...register("password", { required: true })}
    className=" border-red-900  border"
   />
   {errors?.password?.message && <p>{errors.password.message}</p>}

   <button type="submit">login</button>
  </form>
 )
}

export default Login
