import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../data/users";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (user) => {
      navigate("/");
    },
    onError: (err) => {
      console.log("error");
    },
  });

  return { login, isLoading };
}
