import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Target, Search } from 'lucide-react';

export function PlayersPage() {
  const players = [
    { id: 1, username: 'ProGamer123', country: 'US', wins: 156, losses: 78, winRate: 66.7, tournaments: 24 },
    { id: 2, username: 'NinjaWarrior', country: 'UK', wins: 142, losses: 85, winRate: 62.6, tournaments: 22 },
    { id: 3, username: 'ElitePlayer99', country: 'CA', wins: 128, losses: 92, winRate: 58.2, tournaments: 20 },
    { id: 4, username: 'SkillShot420', country: 'DE', wins: 115, losses: 98, winRate: 54.0, tournaments: 18 },
    { id: 5, username: 'SupportKing', country: 'FR', wins: 108, losses: 102, winRate: 51.4, tournaments: 17 },
    { id: 6, username: 'TopLaner88', country: 'KR', wins: 95, losses: 88, winRate: 51.9, tournaments: 15 },
  ];

  const countryFlags: Record<string, string> = {
    'US': '🇺🇸',
    'UK': '🇬🇧',
    'CA': '🇨🇦',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'KR': '🇰🇷'
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Players</h1>
        <p className="text-muted-foreground">Browse competitive players</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search players..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Regions</option>
          <option>North America</option>
          <option>Europe</option>
          <option>Asia</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4">Rank</th>
                <th className="text-left p-4">Player</th>
                <th className="text-left p-4">Wins</th>
                <th className="text-left p-4">Losses</th>
                <th className="text-left p-4">Win Rate</th>
                <th className="text-left p-4">Tournaments</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <span className="text-xl">🥇</span>}
                      {index === 1 && <span className="text-xl">🥈</span>}
                      {index === 2 && <span className="text-xl">🥉</span>}
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{player.username.substring(0, 2)}</span>
                      </div>
                      <div>
                        <Link to={`/app/players/${player.username}`} className="font-semibold hover:text-primary transition-colors">
                          {player.username}
                        </Link>
                        <p className="text-sm text-muted-foreground">{countryFlags[player.country]} {player.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-success font-semibold">{player.wins}</td>
                  <td className="p-4 text-destructive font-semibold">{player.losses}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 font-semibold text-accent">
                      <TrendingUp className="w-4 h-4" />
                      {player.winRate}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-primary" />
                      {player.tournaments}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/app/players/${player.username}`}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
