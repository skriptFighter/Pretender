import { useForm } from "react-hook-form";
import { useSignUp } from "../hooks/useSignUp";

import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignUp() {
  const { signUp, isLoading, isSignedUp } = useSignUp();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  function onSubmit(data) {
    signUp(data);
    reset();
  }

  if (isSignedUp)
    return (
      <div>
        <p>confirm email please</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="email"
        placeholder="email"
        disabled={isLoading}
        {...register("email", {
          required: "this field is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please provide a valid email",
          },
        })}
        className=" border-red-900  border"
      />
      {errors?.email?.message && <p>{errors.email.message}</p>}

      <input
        type="password"
        id="password"
        placeholder="password"
        disabled={isLoading}
        {...register("password", { required: "this field is required" })}
        className=" border-red-900  border"
      />
      {errors?.password?.message && <p>{errors.password.message}</p>}

      <input
        type="password"
        id="rePassword"
        placeholder="confirm password"
        disabled={isLoading}
        {...register("rePassword", {
          required: true,
          validate: (value) =>
            value === getValues().password || "passwords do not match",
        })}
        className=" border-red-900  border"
      />
      {errors?.rePassword?.message && <p>{errors.rePassword.message}</p>}

      <button type="submit">sign up</button>
    </form>
  );
}

export default SignUp;
