import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTrash as updateTrashApi } from "../data/notes"
import toast from "react-hot-toast"

export function useUpdateTrash() {
 const queryClient = useQueryClient()

 const { mutate: updateTrash } = useMutation({
  mutationFn: updateTrashApi,
  onMutate: async (data) => {
   const { id, deleted } = data

   await queryClient.cancelQueries(["notes"])
   const previousNotes = queryClient.getQueryData(["notes"])
   queryClient.setQueryData(["notes"], (oldNotes) => {
    return oldNotes.map((note) =>
     note.id === id ? { ...note, deleted: !deleted } : note
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

 return { updateTrash }
}
