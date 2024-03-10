import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBgColor as updateBgColorApi } from "../data/notes"
import toast from "react-hot-toast"

export function useUpdateBgColor() {
 const queryClient = useQueryClient()

 const { mutate: updateBgColor } = useMutation({
  mutationFn: (data) => {
   const { color, id } = data
   updateBgColorApi(color, id)
  },
  onSuccess: (newData) => {
   queryClient.invalidateQueries(["notes"])
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { updateBgColor }
}
