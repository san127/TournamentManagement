import { Link } from 'react-router-dom';
import { Trophy, Gamepad2, Users, Target, Award, Zap } from 'lucide-react';
import { useFeaturedTournaments } from '../../hooks/useFeaturedTournaments';

export function LandingPage() {
  const { tournaments, loading, error } = useFeaturedTournaments()

  const featuredTournaments = tournaments.map((t) => ({
    id: t.id,
    name: t.name,
    game: t.game,
    prize: t.prize_amount ? `$${t.prize_amount.toLocaleString()}` : 'No Prize',
    participants: `${t.registration_count}/${t.max_participants ?? '∞'}`,
    startDate: t.starts_at
      ? new Date(t.starts_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'TBD',
    status: t.status.charAt(0).toUpperCase() + t.status.slice(1),
  }))

  const popularGames = [
    { name: 'League of Legends', genre: 'MOBA', teamSize: 5 },
    { name: 'Valorant', genre: 'FPS', teamSize: 5 },
    { name: 'Counter-Strike 2', genre: 'FPS', teamSize: 5 },
    { name: 'Dota 2', genre: 'MOBA', teamSize: 5 },
    { name: 'Rocket League', genre: 'Sports', teamSize: 3 },
    { name: 'Overwatch 2', genre: 'FPS', teamSize: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">CompeteHub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/app/tournaments" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse Tournaments
              </Link>
              <Link to="/app/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-card to-background border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Compete. Win. Rise to the Top.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join the ultimate esports tournament platform. Create tournaments, manage teams, and compete for glory.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/app/tournaments/create" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Create Tournament
              </Link>
              <Link to="/app/tournaments" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2">
                <Target className="w-5 h-5" />
                Browse Tournaments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOURNAMENTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tournaments</h2>
            <Link to="/app/tournaments" className="text-primary hover:underline">
              View All
            </Link>
          </div>

          {error ? (
            <div className="text-center text-destructive py-12">
              Failed to load tournaments. Please try again.
            </div>
          ) : loading ? (
            <div className="text-center text-muted-foreground py-12">
              Loading tournaments...
            </div>
          ) : featuredTournaments.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No active tournaments right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTournaments.map((tournament) => (
                <Link
                  key={tournament.id}
                  to={`/app/tournaments/${tournament.id}`}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tournament.status === 'Open' ? 'bg-success/10 text-success' :
                      tournament.status === 'Ongoing' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {tournament.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{tournament.game}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Prize Pool</p>
                      <p className="font-semibold text-primary">{tournament.prize}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-semibold">{tournament.participants}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-semibold">{tournament.startDate}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* POPULAR GAMES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularGames.map((game) => (
              <Link
                key={game.name}
                to={`/app/games?game=${encodeURIComponent(game.name)}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Gamepad2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{game.name}</h3>
                <p className="text-sm text-muted-foreground">{game.genre}</p>
                <p className="text-xs text-muted-foreground mt-1">{game.teamSize}v{game.teamSize}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY COMPETEHUB */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why CompeteHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Easy Tournament Management</h3>
              <p className="text-muted-foreground">Create and manage tournaments with our intuitive tools. Automated bracket generation and match scheduling.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Team & Player Profiles</h3>
              <p className="text-muted-foreground">Track your competitive journey with detailed stats, match history, and achievements.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-bold mb-2">Real-Time Updates</h3>
              <p className="text-muted-foreground">Stay informed with live match updates, bracket progression, and instant notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 CompeteHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}