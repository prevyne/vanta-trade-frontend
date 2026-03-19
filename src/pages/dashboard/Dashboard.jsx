import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Target, CreditCard, Settings as SettingsIcon, 
  LogOut, Bell, ChevronDown 
} from 'lucide-react';

// Firebase Auth
import { auth, signOut } from '../../config/firebase';

// Page Imports
import Overview from './Overview';
import ActiveChallenge from './ActiveChallenge';
import Payouts from './Payouts';
import Settings from './Settings';

const Dashboard = () => {
  // ALL HOOKS MUST LIVE HERE, INSIDE THE COMPONENT
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const navLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Active Challenge', path: '/dashboard/challenge', icon: <Target size={20} /> },
    { name: 'Payouts', path: '/dashboard/payouts', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-surface/30 glass-panel hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="font-bold text-xl tracking-wider cursor-pointer hover:opacity-80 transition-opacity">
            VANTA<span className="text-primary">.</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                replace={true}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
                    : 'text-text-muted hover:text-white hover:bg-surface-hover'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          {/* Logout Button wired up here */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        {/* Dashboard Topbar */}
        <header className="h-16 border-b border-white/5 glass-panel sticky top-0 z-10 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="font-medium text-sm">Account #88291 ($100k)</span>
              <ChevronDown size={16} className="text-text-muted" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-text-muted hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-300 flex items-center justify-center text-sm font-bold shadow-lg text-white">
              JS
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/challenge" element={<ActiveChallenge />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;