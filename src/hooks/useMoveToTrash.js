import { useMutation, useQueryClient } from "@tanstack/react-query"
import { moveToTrash as moveToTrashApi } from "../data/notes"
import toast from "react-hot-toast"

export function useMoveToTrash() {
 const queryClient = useQueryClient()

 const { mutate: moveToTrash } = useMutation({
  mutationFn: moveToTrashApi,
  onMutate: async (id) => {
   await queryClient.cancelQueries(["notes"])
   const previousNotes = queryClient.getQueryData(["notes"])
   queryClient.setQueryData(["notes"], (oldNotes) => {
    return oldNotes.map((note) =>
     note.id === id ? { ...note, deleted: true } : note
    )
   })
   return { previousNotes }
  },
  onSuccess: () => {
   queryClient.invalidateQueries(["notes"])
  },
  onError: (err) => {
   toast.error(err.message)
  },
 })

 return { moveToTrash }
}
