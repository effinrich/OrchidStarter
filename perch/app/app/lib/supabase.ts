import { createBrowserClient } from "@supabase/ssr"

// Browser Supabase client (singleton). Public anon key is safe client-side;
// row security is enforced by RLS on every table (see supabase/migrations).
let _client: ReturnType<typeof createBrowserClient> | null = null

export function supabase() {
  if (_client) return _client
  const url = import.meta.env.VITE_SUPABASE_URL as string
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  _client = createBrowserClient(url, key)
  return _client
}

export type Widget = {
  id: string
  user_id: string
  name: string
  agent_id: string
  accent: string
  position: "bottom-right" | "bottom-left"
  title: string
}
