import { useParams, Link } from 'react-router-dom';
import { Trophy, Users, TrendingUp, Calendar, Crown } from 'lucide-react';

export function TeamPage() {
  const { id } = useParams();

  const team = {
    name: id,
    logo: 'TA',
    owner: 'ProGamer123',
    founded: 'Jan 2024',
    wins: 45,
    losses: 18,
    winRate: 71.4,
    tournamentsPlayed: 12,
    members: [
      { player: 'ProGamer123', role: 'Captain / Mid', joinedDate: 'Jan 2024' },
      { player: 'ElitePlayer99', role: 'Top Lane', joinedDate: 'Jan 2024' },
      { player: 'NinjaWarrior', role: 'Jungle', joinedDate: 'Mar 2024' },
      { player: 'SkillShot420', role: 'ADC', joinedDate: 'Feb 2024' },
      { player: 'SupportKing', role: 'Support', joinedDate: 'Jan 2024' },
    ],
    recentMatches: [
      { id: 1, opponent: 'TeamBeta', result: 'Win', score: '2-0', tournament: 'Spring Championship', date: 'Mar 8' },
      { id: 2, opponent: 'TeamGamma', result: 'Win', score: '2-1', tournament: 'Spring Championship', date: 'Mar 7' },
      { id: 3, opponent: 'TeamDelta', result: 'Loss', score: '1-2', tournament: 'Winter Cup', date: 'Mar 5' },
      { id: 4, opponent: 'TeamEpsilon', result: 'Win', score: '2-0', tournament: 'Winter Cup', date: 'Mar 3' },
    ],
    achievements: [
      { tournament: 'Spring Championship 2026', placement: '1st', prize: '$25,000' },
      { tournament: 'Winter Cup 2025', placement: '2nd', prize: '$12,500' },
      { tournament: 'Fall League', placement: '1st', prize: '$15,000' },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-border rounded-lg p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-card rounded-lg flex items-center justify-center border-2 border-primary">
            <span className="text-4xl font-bold text-primary">{team.logo}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Owner: <Link to={`/app/players/${team.owner}`} className="text-foreground hover:text-primary transition-colors">{team.owner}</Link>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Founded {team.founded}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Join Team
              </button>
              <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-success mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Wins</span>
          </div>
          <p className="text-3xl font-bold text-success">{team.wins}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Losses</span>
          </div>
          <p className="text-3xl font-bold text-destructive">{team.losses}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-accent mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Win Rate</span>
          </div>
          <p className="text-3xl font-bold text-accent">{team.winRate}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Tournaments</span>
          </div>
          <p className="text-3xl font-bold text-primary">{team.tournamentsPlayed}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </h2>
          <div className="space-y-3">
            {team.members.map((member, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <Link to={`/app/players/${member.player}`} className="font-semibold hover:text-primary transition-colors">
                    {member.player}
                  </Link>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <p className="text-xs text-muted-foreground">Joined {member.joinedDate}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Recent Matches</h2>
          <div className="space-y-3">
            {team.recentMatches.map((match) => (
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
          <Trophy className="w-5 h-5 text-primary" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.achievements.map((achievement, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                {index === 0 && <span className="text-3xl">🥇</span>}
                {index === 1 && <span className="text-3xl">🥈</span>}
                {index === 2 && <span className="text-3xl">🥇</span>}
              </div>
              <p className="font-bold mb-1">{achievement.placement}</p>
              <p className="text-sm text-muted-foreground mb-2">{achievement.tournament}</p>
              <p className="text-primary font-semibold">{achievement.prize}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
