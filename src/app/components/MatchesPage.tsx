import { Link } from 'react-router-dom';
import { Trophy, Swords, Clock, CheckCircle, Calendar, Filter } from 'lucide-react';

export function MatchesPage() {
  const matches = [
    { id: 1, playerA: 'TeamAlpha', playerB: 'TeamBeta', tournament: 'Spring Championship', round: 'Finals', status: 'Live', scoreA: 1, scoreB: 1, time: 'Now' },
    { id: 2, playerA: 'ProGamer123', playerB: 'NinjaWarrior', tournament: 'CS2 Pro League', round: 'Semi-Finals', status: 'Upcoming', scoreA: null, scoreB: null, time: '3:30 PM' },
    { id: 3, playerA: 'TeamGamma', playerB: 'ElitePlayer99', tournament: 'Valorant Masters', round: 'Quarter-Finals', status: 'Upcoming', scoreA: null, scoreB: null, time: '5:00 PM' },
    { id: 4, playerA: 'TeamDelta', playerB: 'TeamEpsilon', tournament: 'Winter Cup', round: 'Round 1', status: 'Completed', scoreA: 2, scoreB: 0, time: '2 hours ago' },
    { id: 5, playerA: 'SkillShot420', playerB: 'SupportKing', tournament: 'Spring Championship', round: 'Semi-Finals', status: 'Completed', scoreA: 2, scoreB: 1, time: '4 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Matches</h1>
        <p className="text-muted-foreground">Browse all tournament matches</p>
      </div>

      <div className="flex gap-3">
        <select className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Tournaments</option>
          <option>Spring Championship</option>
          <option>Valorant Masters</option>
          <option>CS2 Pro League</option>
        </select>
        <select className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Status</option>
          <option>Live</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
        <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <Swords className="w-4 h-4" />
            <span className="text-sm">Live Matches</span>
          </div>
          <p className="text-3xl font-bold text-destructive">1</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Upcoming</span>
          </div>
          <p className="text-3xl font-bold text-accent">2</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-success mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Completed Today</span>
          </div>
          <p className="text-3xl font-bold text-success">2</p>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <Link
            key={match.id}
            to={`/app/matches/${match.id}`}
            className="block bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Swords className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    {match.tournament}
                  </p>
                  <p className="text-xs text-muted-foreground">{match.round}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  match.status === 'Live' ? 'bg-destructive/20 text-destructive' :
                  match.status === 'Upcoming' ? 'bg-accent/20 text-accent' :
                  'bg-success/20 text-success'
                }`}>
                  {match.status}
                </span>
                <div className="text-right text-sm">
                  <Clock className="w-4 h-4 inline mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{match.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-bold">{match.playerA}</p>
              </div>
              <div className="px-8 text-center">
                {match.scoreA !== null ? (
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${match.scoreA > (match.scoreB ?? 0) ? 'text-primary' : 'text-muted-foreground'}`}>
                      {match.scoreA}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className={`text-2xl font-bold ${(match.scoreB ?? 0) > match.scoreA ? 'text-primary' : 'text-muted-foreground'}`}>
                      {match.scoreB}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">vs</span>
                )}
              </div>
              <div className="flex-1 text-right">
                <p className="font-bold">{match.playerB}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
