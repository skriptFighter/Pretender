import { useForm } from "react-hook-form";
import { login } from "../data/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      navigate("/");
    },
    onError: (err) => {
      console.log("error");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        defaultValue="email"
        {...register("email", { required: true })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        {...register("password", { required: true })}
        className=" border-red-900  border"
      />

      <button type="submit">sub</button>
    </form>
  );
}

export default Login;
