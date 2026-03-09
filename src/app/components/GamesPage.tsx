import { Link } from 'react-router-dom';
import { Gamepad2, Trophy, Users } from 'lucide-react';

export function GamesPage() {
  const games = [
    { id: 1, name: 'League of Legends', genre: 'MOBA', teamSize: 5, tournaments: 45, players: 12543 },
    { id: 2, name: 'Valorant', genre: 'FPS', teamSize: 5, tournaments: 38, players: 9821 },
    { id: 3, name: 'Counter-Strike 2', genre: 'FPS', teamSize: 5, tournaments: 52, players: 15234 },
    { id: 4, name: 'Dota 2', genre: 'MOBA', teamSize: 5, tournaments: 41, players: 11092 },
    { id: 5, name: 'Rocket League', genre: 'Sports', teamSize: 3, tournaments: 29, players: 7654 },
    { id: 6, name: 'Overwatch 2', genre: 'FPS', teamSize: 5, tournaments: 33, players: 8932 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Games</h1>
        <p className="text-muted-foreground">Browse all available games and their tournaments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold mb-2">{game.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{game.genre} • {game.teamSize}v{game.teamSize}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">Tournaments</span>
                </div>
                <p className="font-bold">{game.tournaments}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Players</span>
                </div>
                <p className="font-bold">{game.players.toLocaleString()}</p>
              </div>
            </div>
            <Link
              to={`/app/tournaments?game=${encodeURIComponent(game.name)}`}
              className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
            >
              View Tournaments
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
