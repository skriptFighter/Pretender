import { useForm } from "react-hook-form"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useSignUp } from "../hooks/useSignUp"
import ConfirmEmail from "../ui/ConfirmEmail"

function SignUp() {
 const {
  register,
  handleSubmit,
  getValues,
  reset,
  formState: { errors },
 } = useForm()

 const { signUp, isSignedUp } = useSignUp()

 function onSubmit(data) {
  signUp(data)
  reset()
 }

 if (isSignedUp) return <ConfirmEmail />

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col gap-8 rounded-lg bg-neutral-200 px-4 py-8 dark:bg-zinc-950 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4"
  >
   <div>
    <h1 className="text-center text-lg font-bold sm:text-lg md:text-xl lg:text-2xl">
     Create an account
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
        value: /\S+@\S+\.\S+/,
        message: "Please provide a valid email address",
       },
      }),
     }}
    />

    <Input
     type={"text"}
     htmlForId={"username"}
     label={"Username"}
     placeholder={"username"}
     error={errors?.username?.message}
     register={{
      ...register("username", {
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

    <Input
     type={"password"}
     htmlForId={"rePassword"}
     label={"Confirm password"}
     placeholder={"Confirm your password"}
     error={errors?.rePassword?.message}
     register={{
      ...register("rePassword", {
       required: "This field is required",
       validate: (value) =>
        value === getValues().password || "Passwords need to match",
      }),
     }}
    />

    <Button type="submit" primary={true}>
     Sign up
    </Button>
   </div>

   <p className="sm:text-md text-center text-sm">
    Already have an account?
    <Link to={"/login"} className="font-semibold underline ">
     Login
    </Link>
   </p>
  </form>
 )
}

export default SignUp
