import { supabase } from '../lib/supabaseClient'

//this is for the landing page, to show featured game cards
export async function getFeaturedTournaments() {
  const { data, error } = await supabase
    .from('tournaments')
    .select(`
      id,
      name,
      slug,
      status,
      max_participants,
      games ( name ),
      tournament_schedule ( starts_at ),
      tournament_prizes ( amount, currency, placement ),
      registrations ( id )
    `)
    .in('status', ['in_progress'])
    .limit(3)

  if (error) throw error

  // Normalize the joined data here so hooks/components get clean objects
  return (data ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    status: t.status,
    max_participants: t.max_participants,
    game: Array.isArray(t.games) ? t.games[0]?.name ?? 'Unknown Game' : (t.games as any)?.name ?? 'Unknown Game',
    starts_at: (() => {
      const s = Array.isArray(t.tournament_schedule) ? t.tournament_schedule[0] : t.tournament_schedule as any
      return s?.starts_at ?? null
    })(),
    prize_amount: (() => {
      const prizes = (t.tournament_prizes ?? []) as any[]
      const first = prizes.find((p) => p.placement === 1) ?? prizes[0]
      return first ? Number(first.amount) : null
    })(),
    registration_count: (t.registrations as any[])?.length ?? 0,
  }))
}