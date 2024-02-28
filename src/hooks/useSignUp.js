import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../data/users";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log("Account successfully created");
    },
  });

  return { signUp, isLoading };
}
