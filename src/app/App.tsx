import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { TournamentPage } from './components/TournamentPage';
import { MatchDetailsPage } from './components/MatchDetailsPage';
import { StandingsPage } from './components/StandingsPage';
import { PlayerProfilePage } from './components/PlayerProfilePage';
import { TeamPage } from './components/TeamPage';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { TournamentCreationWizard } from './components/TournamentCreationWizard';
import { GamesPage } from './components/GamesPage';
import { TournamentsListPage } from './components/TournamentsListPage';
import { TeamsPage } from './components/TeamsPage';
import { PlayersPage } from './components/PlayersPage';
import { RegistrationsPage } from './components/RegistrationsPage';
import { MatchesPage } from './components/MatchesPage';
import { supabase } from '../lib/supabaseClient';


export default function App() {

  console.log("ENV OBJECT:", import.meta.env);
  console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="tournaments" element={<TournamentsListPage />} />
          <Route path="tournaments/:id" element={<TournamentPage />} />
          <Route path="tournaments/create" element={<TournamentCreationWizard />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="teams/:id" element={<TeamPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="players/:id" element={<PlayerProfilePage />} />
          <Route path="registrations" element={<RegistrationsPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="matches/:id" element={<MatchDetailsPage />} />
          <Route path="standings/:tournamentId" element={<StandingsPage />} />
          <Route path="organizer" element={<OrganizerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
