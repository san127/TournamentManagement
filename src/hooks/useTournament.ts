import { useEffect, useState } from 'react'
import { getTournamentById } from '../services/tournamentService'

type Tournament = Awaited<ReturnType<typeof getTournamentById>>

export function useTournament(tournamentId: string | undefined) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!tournamentId) return
    getTournamentById(tournamentId)
  .then(setTournament)
  .catch((err) => {
    console.error('Tournament fetch error:', err.message)  // 👈 add this
    setError(err)
  })
  .finally(() => setLoading(false))
  }, [tournamentId])


  return { tournament, loading, error }
}