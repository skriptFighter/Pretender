import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useSignUp } from "../hooks/useSignUp"
import ConfirmEmail from "./ConfirmEmail"

function Form({ loginForm }) {
 const {
  register,
  handleSubmit,
  getValues,
  reset,
  formState: { errors },
 } = useForm()

 const { signUp, isSignedUp } = useSignUp()
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
  if (loginForm) login(data)
  if (!loginForm) signUp(data)
  reset()
 }

 if (isSignedUp) return <ConfirmEmail />

 return (
  <>
   <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-8 w-1/4 bg-slate-50 px-2 p-4 rounded"
   >
    <div>
     <h1 className="text-3xl font-bold text-center">
      {loginForm ? "Login" : "Create an account"}
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
        pattern: {
         value: !loginForm && /\S+@\S+\.\S+/,
         message: !loginForm && "Please provide a valid email address",
        },
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

     {!loginForm && (
      <Input
       type={"password"}
       htmlForId={"repassword"}
       label={"Confirm password"}
       placeholder={"Confirm your password"}
       error={errors?.repassword?.message}
       register={{
        ...register("repassword", {
         required: "This field is required",
         validate: (value) =>
          value === getValues().password || "Passwords need to match",
        }),
       }}
      />
     )}

     <Button type="submit">{loginForm ? "Login" : "Sign up"}</Button>

     {loginForm && (
      <Button className={" bg-slate-50 text-gray-950 hover:bg-slate-200"}>
       Login with google
      </Button>
     )}
    </div>

    <p className="text-center">
     {loginForm ? "Don't have an account? " : "Already have an account? "}
     <Link
      to={loginForm ? "/signup" : "/login"}
      className="font-semibold underline "
     >
      {loginForm ? "Sign-up" : "Login"}
     </Link>
    </p>
   </form>
  </>
 )
}

export default Form
