import supabase from "./supabase";

export async function getNotes() {
  const { data, error } = await supabase.from("notes").select("*");

  if (error) {
    console.log(error);
    throw new Error("notes cant be loaded");
  }
  return data;
}
