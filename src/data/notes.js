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

export async function deleteNote(id) {
 const { error } = await supabase.from("notes").delete().eq("id", id)

 if (error) throw new Error(error.message)
}

export async function updatePinned(isPinned, id) {
 const { error } = await supabase
  .from("notes")
  .update({ pinned: isPinned })
  .eq("id", id)

 if (error) throw new Error(error.message)
}

export async function updateBgColor(color, id) {
 const { error } = await supabase
  .from("notes")
  .update({ bgColor: color })
  .eq("id", id)

 if (error) throw new Error(error.message)
}
