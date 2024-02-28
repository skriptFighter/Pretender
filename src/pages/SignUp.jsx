import { useForm } from "react-hook-form";
import { signUp } from "../data/users";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { signUp, isLoading } = useSignUp();

  function onSubmit(data) {
    signUp(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="email"
        disabled={isLoading}
        {...register("email", {
          required: "this field is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please provide a valide email",
          },
        })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        placeholder="password"
        disabled={isLoading}
        {...register("password", { required: "this field is required" })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        placeholder="confirm password"
        disabled={isLoading}
        {...register("re-password", {
          required: "this field is required",
          validate: (value) =>
            value === getValues().password || "password do not match",
        })}
        className=" border-red-900  border"
      />
      <button type="submit"></button>
    </form>
  );
}

export default SignUp;
