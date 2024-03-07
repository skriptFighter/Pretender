import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNote as addNoteApi } from "../data/notes"
import toast from "react-hot-toast"

export function useAddNote() {
 const queryClient = useQueryClient()

 const { mutate: addNote } = useMutation({
  mutationFn: addNoteApi,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["notes"] })
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { addNote }
}
