import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../data/notes";

export function useNotes() {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return { notes, isLoading, error };
}
