import { useForm } from "react-hook-form";

function SignUp() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="email"
        {...register("email", { required: true })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        placeholder="confirm password"
        {...register("re-password", { required: true })}
        className=" border-red-900  border"
      />
      <button type="submit"></button>
    </form>
  );
}

export default SignUp;
