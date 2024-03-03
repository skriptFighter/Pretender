import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../data/users"

export function useAuthUser() {
 const { data: user, isLoading } = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry: false,
 })

 return { isLoading, user, isAuthenticated: user?.role === "authenticated" }
}
