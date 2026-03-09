import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

export function RegistrationsPage() {
  const registrations = [
    { id: 1, tournament: 'Spring Championship 2026', game: 'League of Legends', registeredDate: 'Mar 8, 2026', status: 'Confirmed', startDate: 'Mar 15, 2026' },
    { id: 2, tournament: 'Valorant Masters', game: 'Valorant', registeredDate: 'Mar 7, 2026', status: 'Pending', startDate: 'Mar 20, 2026' },
    { id: 3, tournament: 'CS2 Pro League', game: 'Counter-Strike 2', registeredDate: 'Mar 6, 2026', status: 'Confirmed', startDate: 'Mar 25, 2026' },
    { id: 4, tournament: 'Winter Cup Finals', game: 'Dota 2', registeredDate: 'Mar 5, 2026', status: 'Withdrawn', startDate: 'Mar 28, 2026' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Registrations</h1>
        <p className="text-muted-foreground">Track your tournament registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Total</span>
          </div>
          <p className="text-3xl font-bold">4</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-success mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Confirmed</span>
          </div>
          <p className="text-3xl font-bold text-success">2</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-warning mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-3xl font-bold text-warning">1</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Withdrawn</span>
          </div>
          <p className="text-3xl font-bold text-destructive">1</p>
        </div>
      </div>

      <div className="space-y-4">
        {registrations.map((registration) => (
          <div key={registration.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Link to={`/app/tournaments/${registration.id}`} className="font-bold hover:text-primary transition-colors">
                    {registration.tournament}
                  </Link>
                  <p className="text-sm text-muted-foreground">{registration.game}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-lg text-sm ${
                registration.status === 'Confirmed' ? 'bg-success/20 text-success' :
                registration.status === 'Pending' ? 'bg-warning/20 text-warning' :
                'bg-destructive/20 text-destructive'
              }`}>
                {registration.status === 'Confirmed' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                {registration.status === 'Pending' && <Clock className="w-4 h-4 inline mr-1" />}
                {registration.status === 'Withdrawn' && <XCircle className="w-4 h-4 inline mr-1" />}
                {registration.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs">Registered</p>
                  <p className="text-sm font-semibold text-foreground">{registration.registeredDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs">Tournament Start</p>
                  <p className="text-sm font-semibold text-foreground">{registration.startDate}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/app/tournaments/${registration.id}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                View Tournament
              </Link>
              {registration.status !== 'Withdrawn' && (
                <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
