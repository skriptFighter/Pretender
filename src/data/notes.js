import supabase from "./supabase";
import { getCurrentUser } from "./users";

export async function getNotes() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch user notes");
  }

  return data || [];
}
