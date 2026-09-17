import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// settings is a key/value table (motto, decision_title, ...)
export function useSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('settings').select('*')
    if (!error) {
      const map = {}
      for (const row of data || []) map[row.key] = row.value
      setSettings(map)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
    const channel = supabase
      .channel(`settings:${crypto.randomUUID()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => load())
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [load])

  const update = useCallback(async (key, value) => {
    const { error } = await supabase.from('settings').upsert({ key, value })
    if (error) throw error
  }, [])

  return { settings, loading, update }
}
