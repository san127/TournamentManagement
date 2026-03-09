import { Link } from 'react-router-dom';
import { Trophy, Users, Swords, TrendingUp, Calendar, Clock, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function Dashboard() {
  const stats = [
    { label: 'Active Tournaments', value: '12', icon: Trophy, change: '+3', color: 'text-primary' },
    { label: 'Total Players', value: '2,845', icon: Users, change: '+127', color: 'text-accent' },
    { label: 'Matches Today', value: '48', icon: Swords, change: '+12', color: 'text-success' },
    { label: 'Pending Results', value: '8', icon: Clock, change: '-2', color: 'text-warning' },
  ];

  const matchData = [
    { day: 'Mon', matches: 35 },
    { day: 'Tue', matches: 42 },
    { day: 'Wed', matches: 38 },
    { day: 'Thu', matches: 51 },
    { day: 'Fri', matches: 48 },
    { day: 'Sat', matches: 62 },
    { day: 'Sun', matches: 55 },
  ];

  const registrationData = [
    { month: 'Oct', players: 420 },
    { month: 'Nov', players: 580 },
    { month: 'Dec', players: 750 },
    { month: 'Jan', players: 920 },
    { month: 'Feb', players: 1100 },
    { month: 'Mar', players: 1350 },
  ];

  const recentActivity = [
    { type: 'register', player: 'ProGamer123', tournament: 'Spring Championship', time: '2 min ago' },
    { type: 'complete', match: 'Finals - Match #1', winner: 'TeamAlpha', time: '15 min ago' },
    { type: 'start', tournament: 'Valorant Masters', time: '1 hour ago' },
    { type: 'register', player: 'NinjaWarrior', tournament: 'CS2 Pro League', time: '2 hours ago' },
    { type: 'complete', match: 'Semi-Finals - Match #2', winner: 'TeamBeta', time: '3 hours ago' },
  ];

  const upcomingMatches = [
    { id: 1, playerA: 'TeamAlpha', playerB: 'TeamBeta', tournament: 'Spring Championship', time: '2:00 PM', status: 'Live' },
    { id: 2, playerA: 'ProGamer123', playerB: 'NinjaWarrior', tournament: 'CS2 Pro League', time: '3:30 PM', status: 'Upcoming' },
    { id: 3, playerA: 'TeamGamma', playerB: 'TeamDelta', tournament: 'Valorant Masters', time: '5:00 PM', status: 'Upcoming' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            This Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Matches Played This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={matchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27272a', borderRadius: '8px' }}
                labelStyle={{ color: '#e4e4e7' }}
              />
              <Bar dataKey="matches" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Player Registrations</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27272a', borderRadius: '8px' }}
                labelStyle={{ color: '#e4e4e7' }}
              />
              <Line type="monotone" dataKey="players" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Upcoming Matches</h2>
            <Link to="/app/matches" className="text-primary hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <Link
                key={match.id}
                to={`/app/matches/${match.id}`}
                className="block p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{match.playerA} vs {match.playerB}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    match.status === 'Live' ? 'bg-destructive/20 text-destructive' : 'bg-success/20 text-success'
                  }`}>
                    {match.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {match.tournament}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {match.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
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
                  <p className="text-sm">
                    {activity.type === 'register' && (
                      <>
                        <span className="font-semibold">{activity.player}</span> registered for{' '}
                        <span className="font-semibold">{activity.tournament}</span>
                      </>
                    )}
                    {activity.type === 'complete' && (
                      <>
                        <span className="font-semibold">{activity.match}</span> completed.{' '}
                        <span className="font-semibold">{activity.winner}</span> wins!
                      </>
                    )}
                    {activity.type === 'start' && (
                      <>
                        <span className="font-semibold">{activity.tournament}</span> has started
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
