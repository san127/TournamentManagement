import { Link } from 'react-router-dom';
import { Trophy, Users, Swords, Clock, CheckCircle, Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function OrganizerDashboard() {
  const stats = [
    { label: 'Active Tournaments', value: '5', icon: Trophy, color: 'text-primary' },
    { label: 'Total Players', value: '1,234', icon: Users, color: 'text-accent' },
    { label: 'Matches Today', value: '23', icon: Swords, color: 'text-success' },
    { label: 'Pending Results', value: '7', icon: Clock, color: 'text-warning' },
  ];

  const chartData = [
    { date: 'Mar 1', matches: 15, registrations: 42 },
    { date: 'Mar 2', matches: 18, registrations: 38 },
    { date: 'Mar 3', matches: 22, registrations: 55 },
    { date: 'Mar 4', matches: 19, registrations: 48 },
    { date: 'Mar 5', matches: 25, registrations: 62 },
    { date: 'Mar 6', matches: 28, registrations: 71 },
    { date: 'Mar 7', matches: 23, registrations: 58 },
  ];

  const recentActivity = [
    { type: 'register', text: '42 new players registered for Spring Championship', time: '5 min ago' },
    { type: 'complete', text: 'Match #42 completed in Valorant Masters', time: '15 min ago' },
    { type: 'start', text: 'CS2 Pro League has started', time: '1 hour ago' },
    { type: 'register', text: 'Team Delta registered for Winter Cup', time: '2 hours ago' },
    { type: 'complete', text: 'Semi-Finals completed in Spring Championship', time: '3 hours ago' },
  ];

  const activeTournaments = [
    { id: 1, name: 'Spring Championship', participants: 98, maxParticipants: 128, matches: 45, status: 'Ongoing' },
    { id: 2, name: 'Valorant Masters', participants: 64, maxParticipants: 64, matches: 28, status: 'Ongoing' },
    { id: 3, name: 'CS2 Pro League', participants: 56, maxParticipants: 128, matches: 12, status: 'Open' },
    { id: 4, name: 'Winter Cup', participants: 32, maxParticipants: 64, matches: 8, status: 'Open' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <p className="text-muted-foreground">Manage your tournaments and track performance</p>
        </div>
        <Link
          to="/app/tournaments/create"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Tournament
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Activity Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27272a', borderRadius: '8px' }}
                labelStyle={{ color: '#e4e4e7' }}
              />
              <Line type="monotone" dataKey="matches" stroke="#8b5cf6" strokeWidth={2} name="Matches" />
              <Line type="monotone" dataKey="registrations" stroke="#3b82f6" strokeWidth={2} name="Registrations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'register' ? 'bg-primary/20 text-primary' :
                  activity.type === 'complete' ? 'bg-success/20 text-success' :
                  'bg-accent/20 text-accent'
                }`}>
                  {activity.type === 'register' && <Users className="w-4 h-4" />}
                  {activity.type === 'complete' && <CheckCircle className="w-4 h-4" />}
                  {activity.type === 'start' && <Trophy className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Active Tournaments</h2>
          <Link to="/app/tournaments" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {activeTournaments.map((tournament) => (
            <Link
              key={tournament.id}
              to={`/app/tournaments/${tournament.id}`}
              className="block p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{tournament.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  tournament.status === 'Ongoing' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {tournament.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Participants</p>
                  <p className="font-semibold">{tournament.participants}/{tournament.maxParticipants}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Matches Played</p>
                  <p className="font-semibold">{tournament.matches}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Progress</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
