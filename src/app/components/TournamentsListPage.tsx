import { Link } from 'react-router-dom';
import { Gamepad2, Users, DollarSign, Calendar, Search } from 'lucide-react';

export function TournamentsListPage() {
  const tournaments = [
    { id: 1, name: 'Spring Championship 2026', game: 'League of Legends', prize: '$50,000', participants: '98/128', date: 'Mar 15, 2026', status: 'Open' },
    { id: 2, name: 'Valorant Masters', game: 'Valorant', prize: '$25,000', participants: '64/64', date: 'Mar 20, 2026', status: 'Ongoing' },
    { id: 3, name: 'CS2 Pro League', game: 'Counter-Strike 2', prize: '$100,000', participants: '98/128', date: 'Mar 25, 2026', status: 'Open' },
    { id: 4, name: 'Winter Cup Finals', game: 'Dota 2', prize: '$75,000', participants: '32/32', date: 'Mar 28, 2026', status: 'Upcoming' },
    { id: 5, name: 'Rocket League Championship', game: 'Rocket League', prize: '$30,000', participants: '45/64', date: 'Apr 1, 2026', status: 'Open' },
    { id: 6, name: 'Overwatch Grand Finals', game: 'Overwatch 2', prize: '$40,000', participants: '16/16', date: 'Apr 5, 2026', status: 'Completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tournaments</h1>
          <p className="text-muted-foreground">Browse and join tournaments</p>
        </div>
        <Link
          to="/app/tournaments/create"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Create Tournament
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tournaments..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Games</option>
          <option>League of Legends</option>
          <option>Valorant</option>
          <option>Counter-Strike 2</option>
        </select>
        <select className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Status</option>
          <option>Open</option>
          <option>Ongoing</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
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
                tournament.status === 'Upcoming' ? 'bg-accent/10 text-accent' :
                'bg-muted text-muted-foreground'
              }`}>
                {tournament.status}
              </span>
            </div>
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{tournament.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tournament.game}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Prize Pool
                </span>
                <span className="font-semibold text-primary">{tournament.prize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Participants
                </span>
                <span className="font-semibold">{tournament.participants}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </span>
                <span className="font-semibold">{tournament.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
