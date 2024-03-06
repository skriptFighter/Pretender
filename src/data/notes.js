import supabase from "./supabase"
import { getAuthUser } from "./users"

export async function getNotes() {
 const user = await getAuthUser()

 const { data, error } = await supabase
  .from("notes")
  .select("*")
  .eq("user_id", user.id)

 if (error) throw new Error(error.message)

 return data
}

export async function addNote({ title, content, pinned }) {
 const user = await getAuthUser()

 const { data, error } = await supabase
  .from("notes")
  .insert([{ title, content, pinned, user_id: user.id }])
  .select()
 if (error) throw new Error(error.message)

 return data
}
