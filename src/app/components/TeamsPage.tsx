import { Link } from 'react-router-dom';
import { Users, Trophy, TrendingUp, Search } from 'lucide-react';

export function TeamsPage() {
  const teams = [
    { id: 1, name: 'TeamAlpha', members: 5, wins: 45, losses: 18, winRate: 71.4, tournaments: 12 },
    { id: 2, name: 'TeamBeta', members: 5, wins: 38, losses: 22, winRate: 63.3, tournaments: 10 },
    { id: 3, name: 'TeamGamma', members: 5, wins: 32, losses: 28, winRate: 53.3, tournaments: 8 },
    { id: 4, name: 'TeamDelta', members: 5, wins: 28, losses: 25, winRate: 52.8, tournaments: 7 },
    { id: 5, name: 'TeamEpsilon', members: 4, wins: 22, losses: 30, winRate: 42.3, tournaments: 6 },
    { id: 6, name: 'TeamZeta', members: 5, wins: 19, losses: 18, winRate: 51.4, tournaments: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Teams</h1>
          <p className="text-muted-foreground">Browse competitive teams</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Create Team
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search teams..."
          className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/app/teams/${team.name}`}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">{team.name.substring(0, 2)}</span>
              </div>
              <div>
                <h3 className="font-bold group-hover:text-primary transition-colors">{team.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {team.members} members
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Record</p>
                <p className="font-semibold">
                  <span className="text-success">{team.wins}W</span> - <span className="text-destructive">{team.losses}L</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                <p className="font-semibold text-accent flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {team.winRate}%
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Tournaments</p>
                <p className="font-semibold flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-primary" />
                  {team.tournaments}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
