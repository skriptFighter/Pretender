import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useSignUp } from "../hooks/useSignUp"
function Form({ purpose }) {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm()

 const { signUp, isLoading, isSignedUp } = useSignUp()
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
  if (purpose === "login") {
   login(data)
  }
  signUp(data)
  reset()
 }

 if (isSignedUp)
  return (
   <div>
    <p>confirm email please</p>
   </div>
  )

 return (
  <>
   <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-8 w-1/4 bg-slate-50 px-2 p-4 rounded"
   >
    <div>
     <h1 className="text-3xl font-bold text-center">
      {purpose === "login" ? "Login" : "Create an account"}
     </h1>
    </div>

    <div className="flex flex-col gap-5">
     <Input
      type={"text"}
      htmlForId={"email"}
      label={"email"}
      placeholder={"me@example.com"}
      error={errors?.email?.message}
      register={{ ...register("email", { required: true }) }}
     />

     <Input
      type={"password"}
      htmlForId={"password"}
      label={"password"}
      placeholder={"Enter your password"}
      error={errors?.password?.message}
      register={{ ...register("password", { required: true }) }}
     />

     {purpose !== "login" && (
      <Input
       type={"password"}
       htmlForId={"rePassword"}
       label={"confirm password"}
       placeholder={"Confirm password"}
       register={{
        ...register("rePassword", {
         required: true,
         validate: (value) =>
          value === getValues().password || "passwords do not match",
        }),
       }}
       error={errors?.rePassword?.message}
      />
     )}

     <Button type="submit">{purpose === "login" ? "Login" : "Sign up"}</Button>
     {purpose === "login" && (
      <Button className={"bg-white text-black hover:bg-gray-200"}>
       Login with google
      </Button>
     )}
    </div>

    <p className="text-center">
     {purpose === "login"
      ? "Don't have an account? "
      : "Already have an account? "}
     <Link
      to={purpose === "login" ? "/signup" : "/login"}
      className="font-semibold underline "
     >
      {purpose === "login" ? "Sign-up" : "Login"}
     </Link>
    </p>
   </form>
  </>
 )
}

export default Form
