import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Generic hook: loads all rows from `table`, keeps them live via Supabase
// Realtime, and exposes insert/update/remove helpers.
export function useTable(table, { orderBy = 'sort_order', ascending = true } = {}) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    let query = supabase.from(table).select('*')
    if (orderBy) query = query.order(orderBy, { ascending })
    const { data, error } = await query
    if (error) setError(error)
    else setRows(data || [])
    setLoading(false)
  }, [table, orderBy, ascending])

  useEffect(() => {
    load()
    // Unique channel name per hook instance — two components subscribing to
    // the same table must not share one channel (supabase-js reuses a
    // channel object for a repeated topic name, which throws once the first
    // subscriber has already called .subscribe()).
    const channel = supabase
      .channel(`${table}:${crypto.randomUUID()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => load())
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, load])

  const insert = useCallback(
    async (values) => {
      const { error } = await supabase.from(table).insert(values)
      if (error) throw error
    },
    [table]
  )

  const update = useCallback(
    async (id, values) => {
      const { error } = await supabase.from(table).update(values).eq('id', id)
      if (error) throw error
    },
    [table]
  )

  const remove = useCallback(
    async (id) => {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
    },
    [table]
  )

  return { rows, loading, error, refetch: load, insert, update, remove }
}
