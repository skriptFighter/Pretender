import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading: isLogin } = useLogin();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/");

  function onSubmit(data) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        defaultValue="adelboudjema099@gmail.com"
        {...register("email", { required: true })}
        className=" border-red-900  border"
      />

      <input
        type="password"
        defaultValue={"b46b6b84b82b14b7"}
        {...register("password", { required: true })}
        className=" border-red-900  border"
      />

      <button type="submit">sub</button>
    </form>
  );
}

export default Login;
