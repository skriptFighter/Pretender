import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateNote as updateNoteApi } from "../data/notes"
import toast from "react-hot-toast"

export function useUpdateNote() {
 const queryClient = useQueryClient()

 const { mutate: updateNote } = useMutation({
  mutationFn: updateNoteApi,
  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { updateNote }
}
