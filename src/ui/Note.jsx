import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../data/notes";

function Note() {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      {notes.map((note) => (
        <p key={note.id}>{note.title}</p>
      ))}
    </div>
  );
}

export default Note;
