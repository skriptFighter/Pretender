import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = "https://oysvpfovjeritgijrphg.supabase.co"

const supabase = createClient(
 "https://oysvpfovjeritgijrphg.supabase.co",
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c3ZwZm92amVyaXRnaWpycGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwMjU2NTMsImV4cCI6MjAyNDYwMTY1M30.CY5TM0lD7IFRb-ns-vUGXNHAHlbFR083G-vIFI0pAJ8"
)

export default supabase
