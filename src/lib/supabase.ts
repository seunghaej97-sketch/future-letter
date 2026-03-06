import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dgrffeluhnvamjkdvuwv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_7ABDT7K5pAaWgPV2syqhUg__WTuvgdm";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
