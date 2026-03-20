import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Users, Calendar, DollarSign, Gamepad2, Share2, UserCheck, Swords } from 'lucide-react';
import { BracketViewer } from './BracketViewer';
import { useTournament } from '../../hooks/useTournament';

export function TournamentPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { tournament, loading, error } = useTournament(id)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'participants', label: 'Participants' },
    { id: 'bracket', label: 'Bracket' },
    { id: 'matches', label: 'Matches' }
  ];

  if (loading) return (
    <div className="p-6 text-center text-muted-foreground">Loading tournament...</div>
  )

  if (error || !tournament) return (
    <div className="p-6 text-center text-destructive">Failed to load tournament. Please try again.</div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-border rounded-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{tournament.name}</h1>
              <p className="text-muted-foreground">{tournament.game}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-lg ${
            tournament.status === 'Open' ? 'bg-success/20 text-success' :
            tournament.status === 'Ongoing' ? 'bg-warning/20 text-warning' :
            'bg-muted text-muted-foreground'
          }`}>
            {tournament.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Participants</span>
            </div>
            <p className="text-2xl font-bold">{tournament.participants}/{tournament.maxParticipants ?? '∞'}</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Prize Pool</span>
            </div>
            <p className="text-2xl font-bold text-primary">{tournament.prizePool}</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">Format</span>
            </div>
            <p className="text-lg font-semibold">{tournament.format}</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Start Date</span>
            </div>
            <p className="text-lg font-semibold">{tournament.startDate}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Register Now
          </button>
          <Link
            to={`/app/standings/${tournament.id}`}
            className="px-6 py-3 bg-card text-foreground rounded-lg hover:bg-card/80 transition-colors flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            View Standings
          </Link>
          <button className="px-6 py-3 bg-card text-foreground rounded-lg hover:bg-card/80 transition-colors flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-border">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-bold mb-4">About Tournament</h2>
              <p className="text-muted-foreground mb-4">{tournament.description || 'No description provided.'}</p>
              {tournament.rules.length > 0 && (
                <>
                  <h3 className="font-semibold mb-2">Rules</h3>
                  <ul className="space-y-2">
                    {tournament.rules.map((rule: string, index : number) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {tournament.prizes.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-bold mb-4">Prize Pool</h2>
                <div className="space-y-3">
                  {tournament.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-semibold">{prize.place}</span>
                      <span className="text-primary font-bold">{prize.prize}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-bold mb-4">Organizer</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">{tournament.organizer.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold">{tournament.organizer.name}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                View Profile
              </button>
            </div>

            {tournament.schedule.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-bold mb-4">Schedule</h2>
                <div className="space-y-4">
                  {tournament.schedule.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-sm">{item.event}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARTICIPANTS TAB */}
      {activeTab === 'participants' && (
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <input
              type="text"
              placeholder="Search participants..."
              className="px-4 py-2 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">Filter by Status</button>
              <button className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">Sort by Wins</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4">Seed</th>
                  <th className="text-left p-4">Player/Team</th>
                  <th className="text-left p-4">Wins</th>
                  <th className="text-left p-4">Losses</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tournament.participantsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No participants yet.</td>
                  </tr>
                ) : (
                  tournament.participantsList.map((participant) => (
                    <tr key={participant.seed} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-semibold">#{participant.seed}</td>
                      <td className="p-4">
                        <Link
                          to={`/app/${participant.type === 'team' ? 'teams' : 'players'}/${participant.slug}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {participant.name}
                        </Link>
                      </td>
                      <td className="p-4">{participant.wins}</td>
                      <td className="p-4">{participant.losses}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          participant.status === 'checked_in' ? 'bg-success/20 text-success' :
                          participant.status === 'approved' ? 'bg-primary/20 text-primary' :
                          'bg-warning/20 text-warning'
                        }`}>
                          {participant.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BRACKET TAB */}
      {activeTab === 'bracket' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <BracketViewer tournamentId={tournament.id} />
        </div>
      )}

      {/* MATCHES TAB */}
      {activeTab === 'matches' && (
        <div className="bg-card border border-border rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4">Round</th>
                  <th className="text-left p-4">Match</th>
                  <th className="text-left p-4">Player A</th>
                  <th className="text-left p-4">Player B</th>
                  <th className="text-left p-4">Score</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournament.matches.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">No matches yet.</td>
                  </tr>
                ) : (
                  tournament.matches.map((match) => (
                    <tr key={match.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-semibold">{match.round}</td>
                      <td className="p-4">#{match.matchNum}</td>
                      <td className="p-4">{match.playerA}</td>
                      <td className="p-4">{match.playerB}</td>
                      <td className="p-4">
                        {match.scoreA !== null ? (
                          <span className="font-semibold">{match.scoreA} - {match.scoreB}</span>
                        ) : (
                          <span className="text-muted-foreground">TBD</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          match.status === 'Completed' ? 'bg-success/20 text-success' :
                          match.status === 'In progress' ? 'bg-destructive/20 text-destructive' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{match.time}</td>
                      <td className="p-4">
                        <Link
                          to={`/app/matches/${match.id}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Swords className="w-4 h-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}