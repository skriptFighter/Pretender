import supabase from "./supabase";
import { getCurrentUser } from "./users";

export async function getNotes() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return data;
}
