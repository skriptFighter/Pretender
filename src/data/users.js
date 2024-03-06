import supabase, { supabaseUrl } from "./supabase"

export async function login({ email, password }) {
 const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
 })

 if (error) throw new Error(error.message)
 return data
}

export async function logout() {
 let { error } = await supabase.auth.signOut()
 if (error) throw new Error(error.message)
}

export async function signUp({ email, password, username }) {
 const { data: authUser, error: authError } = await supabase.auth.signUp({
  email,
  password,
 })
 if (authError) throw new Error(authError)

 const { error: otpError } = await supabase.auth.signInWithOtp({
  email: authUser.user.email,
 })
 if (otpError) throw new Error(otpError.message)

 const { data, error } = await supabase
  .from("users")
  .insert([{ username, email, auth_id: authUser.user.id }])
  .select()
 if (error) throw new Error(error.message)

 return data
}

export async function getAuthUser() {
 const {
  data: { user },
 } = await supabase.auth.getUser()

 if (!user) {
  throw new Error("User is not authenticated")
 }
 return user
}

export async function getUserInfos() {
 const authUser = await getAuthUser()

 let { data: users, error } = await supabase
  .from("users")
  .select("username,email,image")
  .eq("auth_id", authUser.id)

 if (error) throw new Error("could not load user infos ")

 return users
}

export async function editProfile({ user, id, password }) {
 const hasImagePath = user.image?.startsWith?.(supabaseUrl)
 const imageName = `${Math.random()}-${user.image.name}`.replaceAll("/", "")
 const imagePath = hasImagePath
  ? user.image
  : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`

 const { error: passwordError } = await supabase.auth.updateUser({
  password: password,
 })

 let query = supabase.from("users")
 if (id) query = query.update({ ...user, image: imagePath }).eq("auth_id", id)

 const { data, error } = await query.select().single()

 if (error || passwordError) {
  throw new Error("user could not be edited")
 }

 if (hasImagePath) return data

 await supabase.storage.from("avatars").upload(imageName, user.image)

 return data
}
