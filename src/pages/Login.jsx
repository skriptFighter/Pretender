import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
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

 function onSubmit(data) {
  login(data)
  reset()
 }

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col gap-8 rounded-lg bg-neutral-200 px-4 py-8 dark:bg-zinc-950 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4"
  >
   <div>
    <h1 className="text-center text-lg font-bold sm:text-lg md:text-xl lg:text-2xl">
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

   <p className="sm:text-md text-center text-sm">
    Don&apos;t have an account?
    <Link to={"/signup"} className="font-semibold underline ">
     Sign-up
    </Link>
   </p>
  </form>
 )
}

export default Login
