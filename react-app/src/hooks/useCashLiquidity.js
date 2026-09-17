import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// cash_liquidity is a singleton row (id = 1)
export function useCashLiquidity() {
  const [cash, setCash] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('cash_liquidity').select('*').eq('id', 1).maybeSingle()
    if (!error) setCash(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
    const channel = supabase
      .channel(`cash_liquidity:${crypto.randomUUID()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cash_liquidity' }, () => load())
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [load])

  const update = useCallback(async (values) => {
    const { error } = await supabase
      .from('cash_liquidity')
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq('id', 1)
    if (error) throw error
  }, [])

  return { cash, loading, update }
}
