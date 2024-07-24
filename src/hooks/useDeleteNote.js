import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote as deleteNoteApi } from "../data/notes"
import toast from "react-hot-toast"

export function useDeleteNote() {
 const queryClient = useQueryClient()

 const { mutate: deleteNote } = useMutation({
  mutationFn: (data) => {
   const { id, image } = data
   deleteNoteApi(id, image)
  },

  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },

  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { deleteNote }
}
