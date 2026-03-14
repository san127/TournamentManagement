import { useEffect, useState } from 'react'
import { getFeaturedTournaments } from '../services/tournamentService'

type FeaturedTournament = Awaited<ReturnType<typeof getFeaturedTournaments>>[number]

export function useFeaturedTournaments() {
  const [tournaments, setTournaments] = useState<FeaturedTournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getFeaturedTournaments()
      .then((data) => {
        console.log('Fetched tournaments:', data)  // 👈 added
        setTournaments(data)
      })
      .catch((err) => {
        console.error('Fetch error:', err)         // 👈 added
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { tournaments, loading, error }
}