import { useParams, Link } from 'react-router-dom';
import { Trophy, Target, TrendingUp, Award, Swords } from 'lucide-react';

export function PlayerProfilePage() {
  const { id } = useParams();

  const player = {
    username: id,
    country: 'US',
    bio: 'Professional esports player competing in League of Legends tournaments. 5+ years of competitive experience.',
    totalMatches: 234,
    wins: 156,
    losses: 78,
    winRate: 66.7,
    teams: [
      { name: 'TeamAlpha', role: 'Mid Laner', joined: 'Jan 2025', status: 'Active' },
      { name: 'TeamBeta', role: 'Support', joined: 'Jun 2024', status: 'Left' }
    ],
    recentMatches: [
      { id: 1, opponent: 'NinjaWarrior', result: 'Win', score: '2-1', tournament: 'Spring Championship', date: 'Mar 8' },
      { id: 2, opponent: 'TeamGamma', result: 'Loss', score: '0-2', tournament: 'Winter Cup', date: 'Mar 5' },
      { id: 3, opponent: 'ElitePlayer99', result: 'Win', score: '2-0', tournament: 'Spring Championship', date: 'Mar 3' },
      { id: 4, opponent: 'TeamDelta', result: 'Win', score: '2-1', tournament: 'Valorant Masters', date: 'Mar 1' },
    ],
    tournamentHistory: [
      { name: 'Spring Championship 2026', placement: '2nd', prize: '$12,500', date: 'Mar 2026' },
      { name: 'Winter Cup 2025', placement: '1st', prize: '$25,000', date: 'Dec 2025' },
      { name: 'Fall League', placement: '3rd', prize: '$5,000', date: 'Oct 2025' },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-border rounded-lg p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary">
            {player.username.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{player.username}</h1>
              <span className="text-2xl">🇺🇸</span>
            </div>
            <p className="text-muted-foreground mb-4">{player.bio}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Follow
              </button>
              <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Swords className="w-4 h-4" />
            <span className="text-sm">Total Matches</span>
          </div>
          <p className="text-3xl font-bold">{player.totalMatches}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-success mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Wins</span>
          </div>
          <p className="text-3xl font-bold text-success">{player.wins}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm">Losses</span>
          </div>
          <p className="text-3xl font-bold text-destructive">{player.losses}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-accent mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Win Rate</span>
          </div>
          <p className="text-3xl font-bold text-accent">{player.winRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Teams</h2>
          <div className="space-y-3">
            {player.teams.map((team, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/app/teams/${team.name}`} className="font-semibold hover:text-primary transition-colors">
                    {team.name}
                  </Link>
                  <span className={`px-2 py-1 rounded text-xs ${
                    team.status === 'Active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {team.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{team.role}</p>
                <p className="text-xs text-muted-foreground mt-1">Joined {team.joined}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Recent Matches</h2>
          <div className="space-y-3">
            {player.recentMatches.map((match) => (
              <Link
                key={match.id}
                to={`/app/matches/${match.id}`}
                className="block bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">vs {match.opponent}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    match.result === 'Win' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {match.result}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Score: {match.score}</span>
                  <span>{match.tournament}</span>
                  <span>{match.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Tournament History
        </h2>
        <div className="space-y-3">
          {player.tournamentHistory.map((tournament, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{tournament.name}</p>
                <p className="text-sm text-muted-foreground">{tournament.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{tournament.placement}</p>
                <p className="text-sm text-success">{tournament.prize}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
