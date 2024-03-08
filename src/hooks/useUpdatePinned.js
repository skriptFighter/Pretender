import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePinned as updatePinnedApi } from "../data/notes"
import toast from "react-hot-toast"

export function useUpdatePinned() {
 const queryClient = useQueryClient()

 const { mutate: updatePinned } = useMutation({
  mutationFn: (data) => {
   const { isPinned, id } = data
   updatePinnedApi(isPinned, id)
  },
  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { updatePinned }
}
