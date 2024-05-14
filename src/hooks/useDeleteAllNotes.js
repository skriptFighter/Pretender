import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAllNotes as deleteAllNotesApi } from "../data/notes"
import toast from "react-hot-toast"

export function useDeleteAllNotes() {
 const queryClient = useQueryClient()

 const { mutate: deleteAllNotes } = useMutation({
  mutationFn: deleteAllNotesApi,
  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },

  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { deleteAllNotes }
}
