import { useQuery } from "@tanstack/react-query"
import { getUserInfos } from "../data/users"

export function useUserInfos() {
 const { data: user, isLoading } = useQuery({
  queryKey: ["userInfos"],
  queryFn: getUserInfos,
 })

 return { user, isLoading }
}
