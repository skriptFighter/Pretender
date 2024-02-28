import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../data/users";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );

  if (isLoading) return <p>isLoading...</p>;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
