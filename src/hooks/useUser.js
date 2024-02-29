import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../data/users"

export function useUser() {
 const { data: user, isLoading } = useQuery({
  queryKey: ["user"],
  queryFn: getCurrentUser,
  retry: false,
 })

 return { isLoading, user, isAuthenticated: user?.role === "authenticated" }
}
