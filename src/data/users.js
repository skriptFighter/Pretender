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
  .select("username,email,avatar")
  .eq("auth_id", authUser.id)

 if (error) throw new Error("could not load user infos ")

 return users
}

export async function editProfile({ user, id }) {
 const hasImagePath = user.image?.startsWith?.(supabaseUrl)
 const imageName = `${Math.random()}-${user.avatar.name}`.replaceAll("/", "")
 const imagePath = hasImagePath
  ? user.avatar
  : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`

 let query = supabase.from("users")

 if (id) query = query.update({ ...user, avatar: imagePath }).eq("auth_id", id)

 const { data, error } = await query.select().single()

 if (error) {
  console.error(error)
  throw new Error("user could not be created")
 }

 if (hasImagePath) return data

 await supabase.storage.from("avatars").upload(imageName, user.avatar)

 return data
}
