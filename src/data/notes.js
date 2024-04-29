import supabase, { supabaseUrl } from "./supabase"
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

export async function addNote(note) {
 const user = await getAuthUser()

 if (note.image) {
  const imageName = `${Math.random()}-${note.image.name}`.replaceAll("/", "")
  const imagePath = `${supabaseUrl}/storage/v1/object/public/notesImages/${imageName}`

  const { error: storageError } = await supabase.storage
   .from("notesImages")
   .upload(imageName, note.image)

  if (storageError) {
   await supabase.from("notes").delete().eq("image", imagePath)
   throw new Error(storageError.message)
  }

  const { data, error } = await supabase
   .from("notes")
   .insert([{ ...note, image: imagePath, user_id: user.id }])
   .select()

  if (error) {
   await supabase.from("notes").delete().eq("image", imagePath)
   throw new Error(error.message)
  }

  return data
 } else {
  const { data, error } = await supabase
   .from("notes")
   .insert([{ ...note, user_id: user.id }])
   .select()

  if (error) {
   throw new Error(error.message)
  }

  return data
 }
}

export async function deleteNote(id, image) {
 const { error } = await supabase.from("notes").delete().eq("id", id)
 if (error) throw new Error(error.message)

 if (image) {
  const imageName = image.split(
   "https://oysvpfovjeritgijrphg.supabase.co/storage/v1/object/public/notesImages/"
  )

  const { error: storageError } = await supabase.storage
   .from("notesImages")
   .remove(imageName[1])
  if (storageError) throw new Error(storageError.message)
 }
}

export async function updatePinned(isPinned, id) {
 const { error } = await supabase
  .from("notes")
  .update({ pinned: isPinned })
  .eq("id", id)

 if (error) throw new Error(error.message)
}

export async function updateBgColor(light, dark, id) {
 const { data, error } = await supabase
  .from("notes")
  .update({ bgColor: light, bgColorDark: dark })
  .eq("id", id)
 if (error) throw new Error(error.message)
 return data
}

export async function updateTrash({ id, deleted }) {
 const { data, error } = await supabase
  .from("notes")
  .update({ deleted: !deleted })
  .eq("id", id)

 if (error) throw new Error(error.message)
 return data
}

export async function updateNote(note) {
 if (note?.image) {
  const hasImagePath = note.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${note.image.name}`.replaceAll("/", "")
  const imagePath = hasImagePath
   ? note.image
   : `${supabaseUrl}/storage/v1/object/public/notesImages/${imageName}`

  const { data, error } = await supabase
   .from("notes")
   .update({ ...note, image: imagePath })
   .eq("id", note.id)

  if (error) throw new Error(error.message)

  await supabase.storage.from("notesImages").upload(imageName, note.image)
  return data
 } else {
  const { data, error } = await supabase
   .from("notes")
   .update({ ...note })
   .eq("id", note.id)

  if (error) throw new Error(error.message)
  return data
 }
}

export async function deleteAllNotes() {
 const { error } = await supabase.from("notes").delete().eq("deleted", true)
 if (error) throw new Error(error.message)
}
