import { useForm } from "react-hook-form";
import { useSignUp } from "../hooks/useSignUp";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signUp, isLoading, isSignedUp } = useSignUp();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  if (isAuthenticated) navigate("/");

  function onSubmit(data) {
    signUp(data);
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
