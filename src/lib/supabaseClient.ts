import { createClient } from '@supabase/supabase-js'


console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrl:string = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

