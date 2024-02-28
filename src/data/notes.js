import supabase from "./supabase";

export async function getNotes() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("note_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch user notes");
  }

  return data || [];
}
