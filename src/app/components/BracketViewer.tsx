import { Link } from 'react-router-dom';

interface BracketViewerProps {
  tournamentId: string | undefined;
}

export function BracketViewer({ tournamentId }: BracketViewerProps) {
  const bracket = {
    rounds: [
      {
        name: 'Quarter-Finals',
        matches: [
          { id: 1, playerA: 'TeamAlpha', playerB: 'TeamDelta', scoreA: 2, scoreB: 0, winner: 'TeamAlpha' },
          { id: 2, playerA: 'TeamBeta', playerB: 'TeamEpsilon', scoreA: 2, scoreB: 1, winner: 'TeamBeta' },
          { id: 3, playerA: 'ProGamer123', playerB: 'ElitePlayer99', scoreA: 2, scoreB: 0, winner: 'ProGamer123' },
          { id: 4, playerA: 'NinjaWarrior', playerB: 'TeamGamma', scoreA: 2, scoreB: 1, winner: 'NinjaWarrior' },
        ]
      },
      {
        name: 'Semi-Finals',
        matches: [
          { id: 5, playerA: 'TeamAlpha', playerB: 'TeamBeta', scoreA: 2, scoreB: 0, winner: 'TeamAlpha' },
          { id: 6, playerA: 'ProGamer123', playerB: 'NinjaWarrior', scoreA: 2, scoreB: 1, winner: 'ProGamer123' },
        ]
      },
      {
        name: 'Finals',
        matches: [
          { id: 7, playerA: 'TeamAlpha', playerB: 'ProGamer123', scoreA: 2, scoreB: 1, winner: 'TeamAlpha' },
        ]
      }
    ]
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max">
        {bracket.rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col gap-4" style={{ width: '280px' }}>
            <h3 className="font-bold text-center mb-4">{round.name}</h3>
            <div className="flex flex-col justify-around h-full gap-4">
              {round.matches.map((match) => (
                <Link
                  key={match.id}
                  to={`/app/matches/${match.id}`}
                  className="bg-muted/30 border border-border rounded-lg overflow-hidden hover:border-primary transition-colors group"
                >
                  <div className={`flex items-center justify-between p-3 ${
                    match.winner === match.playerA ? 'bg-primary/10' : ''
                  }`}>
                    <span className={`font-semibold ${
                      match.winner === match.playerA ? 'text-primary' : ''
                    }`}>
                      {match.playerA}
                    </span>
                    <span className="font-bold">{match.scoreA}</span>
                  </div>
                  <div className="h-px bg-border"></div>
                  <div className={`flex items-center justify-between p-3 ${
                    match.winner === match.playerB ? 'bg-primary/10' : ''
                  }`}>
                    <span className={`font-semibold ${
                      match.winner === match.playerB ? 'text-primary' : ''
                    }`}>
                      {match.playerB}
                    </span>
                    <span className="font-bold">{match.scoreB}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col justify-center" style={{ width: '200px' }}>
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="font-bold mb-1">Champion</h3>
            <p className="text-xl font-bold text-primary">TeamAlpha</p>
          </div>
        </div>
      </div>
    </div>
  );
}
