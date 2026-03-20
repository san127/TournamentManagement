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

export async function getTournamentById(tournamentId: string) {
  const { data, error } = await supabase
    .from('tournaments')
    .select(`
      id,
      name,
      slug,
      description,
      status,
      format,
      is_team_based,
      max_participants,
      rules,
      games ( name ),
      profiles!tournaments_organizer_id_fkey ( username, display_name ),
      tournament_schedule ( registration_open, registration_close, check_in_open, starts_at ),
      tournament_prizes ( placement, label, amount, currency ),
      registrations ( id, status, seed, player_id, team_id,
        profiles ( username, display_name ),
        teams ( name, slug )
      ),
      matches (
        id,
        round_number,
        match_number,
        status,
        scheduled_at,
        match_participants ( slot, score, participant_id )
      )
    `)
    .eq('id', tournamentId)
    .single()

  if (error) throw error

  const raw = data as any

  // --- Organizer ---
  const organizer = raw.profiles
  const organizerName = organizer?.display_name ?? organizer?.username ?? 'Unknown'

  // --- Schedule ---
  const schedule = raw.tournament_schedule ?? {}
  const scheduleItems = [
    { event: 'Registration Open', date: schedule.registration_open },
    { event: 'Registration Close', date: schedule.registration_close },
    { event: 'Check-in', date: schedule.check_in_open },
    { event: 'Tournament Start', date: schedule.starts_at },
  ]
    .filter((s) => s.date)
    .map((s) => ({
      event: s.event,
      date: new Date(s.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }),
    }))

  // --- Prizes ---
  const prizes = ((raw.tournament_prizes ?? []) as any[])
    .sort((a, b) => a.placement - b.placement)
    .map((p) => ({
      place: p.label ?? `#${p.placement} Place`,
      prize: `$${Number(p.amount).toLocaleString()}`,
    }))

  const totalPrize = (raw.tournament_prizes ?? []) as any[]
  const prizePool = totalPrize.length
    ? `$${totalPrize.reduce((sum: number, p: any) => sum + Number(p.amount), 0).toLocaleString()}`
    : 'No Prize'

  // --- Participants ---
  const registrations = (raw.registrations ?? []) as any[]
  const participants = registrations.map((r: any, i: number) => {
    const name = r.teams?.name ?? r.profiles?.display_name ?? r.profiles?.username ?? 'Unknown'
    const slug = r.teams?.slug ?? r.profiles?.username ?? ''
    const type = r.teams ? 'team' : 'player'
    return {
      seed: r.seed ?? i + 1,
      name,
      slug,
      type,
      status: r.status,
      wins: 0,
      losses: 0,
    }
  })

  // --- Matches ---
  const matches = ((raw.matches ?? []) as any[])
  .sort((a, b) => a.round_number - b.round_number || a.match_number - b.match_number)
  .map((m: any) => {
    const parts = (m.match_participants ?? []) as any[]
    const slot1 = parts.find((p: any) => p.slot === 1)
    const slot2 = parts.find((p: any) => p.slot === 2)

    // Look up name from registrations we already have
    const getName = (slot: any) => {
      if (!slot) return 'TBD'
      const reg = registrations.find((r: any) =>
        r.player_id === slot.participant_id || r.team_id === slot.participant_id
      )
      if (!reg) return 'TBD'
      return reg.teams?.name ?? reg.profiles?.display_name ?? reg.profiles?.username ?? 'TBD'
    }

    return {
      id: m.id,
      round: `Round ${m.round_number}`,
      matchNum: m.match_number,
      playerA: getName(slot1),
      playerB: getName(slot2),
      scoreA: slot1?.score ?? null,
      scoreB: slot2?.score ?? null,
      status: m.status.charAt(0).toUpperCase() + m.status.slice(1).replace('_', ' '),
      time: m.scheduled_at
        ? new Date(m.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'TBD',
    }
  })

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? '',
    status: raw.status.charAt(0).toUpperCase() + raw.status.slice(1),
    format: raw.format.replace('_', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    rules: raw.rules ? raw.rules.split('\n').filter((rule: string) => Boolean(rule)) : [],
    game: (raw.games as any)?.name ?? 'Unknown Game',
    participants: registrations.length,
    maxParticipants: raw.max_participants,
    prizePool,
    startDate: schedule.starts_at
      ? new Date(schedule.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'TBD',
    organizer: {
      name: organizerName,
      avatar: organizerName.slice(0, 3).toUpperCase(),
    },
    schedule: scheduleItems,
    prizes,
    participantsList: participants,
    matches,
  }
}