import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNote as addNoteApi } from "../data/notes"
import toast from "react-hot-toast"

export function useAddNote() {
 const queryClient = useQueryClient()

 const { mutate: addNote } = useMutation({
  mutationFn: addNoteApi,
  onMutate: async (newNote) => {
   await queryClient.cancelQueries({ queryKey: ["notes"] })
   const previousNotes = queryClient.getQueryData(["notes"])
   queryClient.setQueryData(["notes"], (old) => [...old, newNote])
   return { previousNotes }
  },
  onSettled: () => {
   queryClient.invalidateQueries({ queryKey: ["notes"] })
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { addNote }
}
