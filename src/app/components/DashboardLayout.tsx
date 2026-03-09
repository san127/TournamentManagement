import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Home, Gamepad2, Trophy, Users, UserCircle, ClipboardList,
  Swords, BarChart3, Settings, Bell, Search, Plus, Menu, X,
  ChevronLeft, LogOut
} from 'lucide-react';

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { path: '/app/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/app/games', icon: Gamepad2, label: 'Games' },
    { path: '/app/tournaments', icon: Trophy, label: 'Tournaments' },
    { path: '/app/teams', icon: Users, label: 'Teams' },
    { path: '/app/players', icon: UserCircle, label: 'Players' },
    { path: '/app/registrations', icon: ClipboardList, label: 'Registrations' },
    { path: '/app/matches', icon: Swords, label: 'Matches' },
    { path: '/app/organizer', icon: BarChart3, label: 'Organizer Panel' },
  ];

  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/app/dashboard" className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                <span className="font-bold">CompeteHub</span>
              </Link>
            </div>

            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tournaments, players..."
                  className="w-full pl-10 pr-4 py-2 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/app/tournaments/create"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Tournament</span>
              </Link>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <UserCircle className="w-5 h-5 text-primary" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1">
                    <Link to="/app/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors">
                      <UserCircle className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link to="/app/my-tournaments" className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors">
                      <Trophy className="w-4 h-4" />
                      My Tournaments
                    </Link>
                    <Link to="/app/my-teams" className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors">
                      <Users className="w-4 h-4" />
                      My Teams
                    </Link>
                    <Link to="/app/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <div className="border-t border-border my-1"></div>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors w-full text-left text-destructive">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } border-r border-border bg-sidebar transition-all duration-300 overflow-hidden sticky top-16 h-[calc(100vh-4rem)]`}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
