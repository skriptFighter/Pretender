import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { useAuthUser } from "../hooks/useAuthUser"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"

function Login() {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm()

 const { login } = useLogin()
 const { isAuthenticated } = useAuthUser()
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
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col gap-8 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 bg-neutral-200 dark:bg-zinc-950 px-4 py-8 rounded-lg"
  >
   <div>
    <h1 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-center">
     Login
    </h1>
   </div>

   <div className="flex flex-col gap-5">
    <Input
     type={"text"}
     htmlForId={"email"}
     label={"email"}
     placeholder={"me@example.com"}
     error={errors?.email?.message}
     register={{
      ...register("email", {
       required: true,
      }),
     }}
    />

    <Input
     type={"password"}
     htmlForId={"password"}
     label={"password"}
     placeholder={"Enter your password"}
     error={errors?.password?.message}
     register={{
      ...register("password", { required: "This field is required" }),
     }}
    />

    <Button type="submit" primary={true}>
     Login
    </Button>

    <Button secondary={true}>Login with google</Button>
   </div>

   <p className="text-center text-sm sm:text-md">
    Don&apos;t have an account?
    <Link to={"/signup"} className="font-semibold underline ">
     Sign-up
    </Link>
   </p>
  </form>
 )
}

export default Login
