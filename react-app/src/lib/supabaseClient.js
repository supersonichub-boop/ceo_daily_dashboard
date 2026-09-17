import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && key)

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.error(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Create a .env file (see .env.example) with your project credentials.'
  )
}

// createClient() throws synchronously on an invalid/empty URL, which would
// crash the whole app before React even mounts (blank white page, no error
// on screen). Fall back to a harmless placeholder so the app always mounts,
// and let <ConfigGate> in App.jsx show a clear message instead.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key'
)
