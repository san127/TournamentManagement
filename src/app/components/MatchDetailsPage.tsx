import { useParams, Link } from 'react-router-dom';
import { Trophy, Clock, MapPin, Video, ChevronLeft } from 'lucide-react';

export function MatchDetailsPage() {
  const { id } = useParams();

  const match = {
    id: id,
    playerA: 'TeamAlpha',
    playerB: 'ProGamer123',
    tournament: 'Spring Championship 2026',
    round: 'Finals',
    bestOf: 'BO3',
    status: 'Completed',
    winner: 'TeamAlpha',
    games: [
      { gameNum: 1, map: 'Summoner\'s Rift', winner: 'TeamAlpha', duration: '32:45', vodLink: '#' },
      { gameNum: 2, map: 'Summoner\'s Rift', winner: 'ProGamer123', duration: '28:12', vodLink: '#' },
      { gameNum: 3, map: 'Summoner\'s Rift', winner: 'TeamAlpha', duration: '35:20', vodLink: '#' },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <Link to="/app/matches" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to Matches
      </Link>

      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-border rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={`/app/tournaments/${match.tournament}`} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            {match.tournament}
          </Link>
          <span className={`px-4 py-2 rounded-lg ${
            match.status === 'Completed' ? 'bg-success/20 text-success' :
            match.status === 'Live' ? 'bg-destructive/20 text-destructive' :
            'bg-muted text-muted-foreground'
          }`}>
            {match.status}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-2">{match.round} - {match.bestOf}</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-right">
              <Link to={`/app/teams/${match.playerA}`} className="text-3xl font-bold hover:text-primary transition-colors">
                {match.playerA}
              </Link>
              <p className="text-muted-foreground">Team</p>
            </div>
            <div className="text-5xl font-bold">
              <span className={match.winner === match.playerA ? 'text-primary' : 'text-muted-foreground'}>2</span>
              <span className="text-muted-foreground mx-4">:</span>
              <span className={match.winner === match.playerB ? 'text-primary' : 'text-muted-foreground'}>1</span>
            </div>
            <div className="text-left">
              <Link to={`/app/players/${match.playerB}`} className="text-3xl font-bold hover:text-primary transition-colors">
                {match.playerB}
              </Link>
              <p className="text-muted-foreground">Player</p>
            </div>
          </div>
        </div>

        {match.winner && (
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Winner</p>
            <p className="text-2xl font-bold text-primary">{match.winner}</p>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold mb-6">Game Results</h2>
        <div className="space-y-4">
          {match.games.map((game) => (
            <div key={game.gameNum} className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Game {game.gameNum}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {game.map}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{game.winner} Wins</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 justify-end mt-1">
                    <Clock className="w-4 h-4" />
                    {game.duration}
                  </p>
                </div>
              </div>
              <a
                href={game.vodLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Video className="w-4 h-4" />
                Watch VOD
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold mb-4">Match Actions</h2>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Report Score
          </button>
          <button className="px-6 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            Submit Result
          </button>
          <button className="px-6 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            Dispute Result
          </button>
        </div>
      </div>
    </div>
  );
}
