import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../data/users";
import { useState } from "react";

export function useSignUp() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log("Account successfully created");
      setIsSignedUp(true);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { signUp, isLoading, isSignedUp };
}
