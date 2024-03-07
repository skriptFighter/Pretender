import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote as deleteNoteApi } from "../data/notes"
import toast from "react-hot-toast"

export function useDeleteNote() {
 const queryClient = useQueryClient()
 const { mutate: deleteNote } = useMutation({
  mutationFn: deleteNoteApi,
  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { deleteNote }
}
