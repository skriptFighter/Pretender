import { useNotes } from "../hooks/useNotes"

function Note() {
 const { notes, isLoading, error } = useNotes()

 if (isLoading) return <p>loading...</p>
 if (error) return <p>error</p>

 return (
  <div>
   {notes?.map((note) => (
    <p key={note?.id}>{note?.title}</p>
   ))}
  </div>
 )
}

export default Note
