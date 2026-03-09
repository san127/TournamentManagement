import { useParams, Link } from 'react-router-dom';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

export function StandingsPage() {
  const { tournamentId } = useParams();

  const standings = [
    { rank: 1, player: 'TeamAlpha', matchesPlayed: 15, wins: 13, losses: 2, points: 39, winRate: 86.7, trend: 'up' },
    { rank: 2, player: 'ProGamer123', matchesPlayed: 14, wins: 11, losses: 3, points: 33, winRate: 78.6, trend: 'up' },
    { rank: 3, player: 'NinjaWarrior', matchesPlayed: 13, wins: 9, losses: 4, points: 27, winRate: 69.2, trend: 'same' },
    { rank: 4, player: 'TeamBeta', matchesPlayed: 14, wins: 8, losses: 6, points: 24, winRate: 57.1, trend: 'down' },
    { rank: 5, player: 'ElitePlayer99', matchesPlayed: 12, wins: 7, losses: 5, points: 21, winRate: 58.3, trend: 'up' },
    { rank: 6, player: 'TeamGamma', matchesPlayed: 13, wins: 6, losses: 7, points: 18, winRate: 46.2, trend: 'down' },
    { rank: 7, player: 'TeamDelta', matchesPlayed: 11, wins: 5, losses: 6, points: 15, winRate: 45.5, trend: 'same' },
    { rank: 8, player: 'TeamEpsilon', matchesPlayed: 12, wins: 3, losses: 9, points: 9, winRate: 25.0, trend: 'down' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Standings</h1>
          <p className="text-muted-foreground">Spring Championship 2026</p>
        </div>
        <Link
          to={`/app/tournaments/${tournamentId}`}
          className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          Back to Tournament
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4">Rank</th>
                <th className="text-left p-4">Player / Team</th>
                <th className="text-left p-4">Matches Played</th>
                <th className="text-left p-4">Wins</th>
                <th className="text-left p-4">Losses</th>
                <th className="text-left p-4">Points</th>
                <th className="text-left p-4">Win Rate</th>
                <th className="text-left p-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr
                  key={standing.rank}
                  className={`border-t border-border hover:bg-muted/20 transition-colors ${
                    standing.rank <= 3 ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {standing.rank === 1 && <span className="text-xl">🥇</span>}
                      {standing.rank === 2 && <span className="text-xl">🥈</span>}
                      {standing.rank === 3 && <span className="text-xl">🥉</span>}
                      <span className="font-bold">{standing.rank}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/app/players/${standing.player}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {standing.player}
                    </Link>
                  </td>
                  <td className="p-4">{standing.matchesPlayed}</td>
                  <td className="p-4 text-success">{standing.wins}</td>
                  <td className="p-4 text-destructive">{standing.losses}</td>
                  <td className="p-4 font-bold">{standing.points}</td>
                  <td className="p-4">{standing.winRate.toFixed(1)}%</td>
                  <td className="p-4">
                    {standing.trend === 'up' && <TrendingUp className="w-5 h-5 text-success" />}
                    {standing.trend === 'down' && <TrendingDown className="w-5 h-5 text-destructive" />}
                    {standing.trend === 'same' && <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Matches</p>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Win Rate</p>
              <p className="text-2xl font-bold">58.3%</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="text-2xl font-bold">128</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
