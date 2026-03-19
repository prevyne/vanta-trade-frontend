import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Monitor, BarChart2, CreditCard, 
  Settings as SettingsIcon, LogOut, Bell, ChevronDown, 
  ArrowDownToLine, Menu, X 
} from 'lucide-react'; 

// Firebase & Context
import { auth, signOut } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

// Page Imports
import Overview from './Overview';
import Terminal from './Terminal';
import Analytics from './Analytics';
import Deposit from './Deposit';
import Payouts from './Payouts';
import Settings from './Settings';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, currentUser } = useAuth();
  
  // Mobile Sidebar State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    return currentUser?.email?.[0].toUpperCase() || 'VT';
  };

  const getAccountId = () => currentUser?.uid?.substring(0, 6).toUpperCase() || '000000';

  // Navigation Array with Terminal Included
  const navLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Trading Terminal', path: '/dashboard/terminal', icon: <Monitor size={20} /> },
    { name: 'Performance', path: '/dashboard/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Deposit Funds', path: '/dashboard/deposit', icon: <ArrowDownToLine size={20} /> },
    { name: 'Payouts', path: '/dashboard/payouts', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
        <Link to="/" onClick={closeMobileMenu} className="font-bold text-xl tracking-wider cursor-pointer hover:opacity-80 transition-opacity">
          VANTA<span className="text-primary">.</span>
        </Link>
        <button onClick={closeMobileMenu} className="md:hidden text-text-muted hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.name} 
              to={link.path}
              replace={true}
              onClick={closeMobileMenu}
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

      <div className="p-4 border-t border-white/5 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-surface/30 glass-panel hidden md:flex flex-col z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeMobileMenu}></div>
          <aside className="relative w-64 max-w-[80%] bg-surface border-r border-white/5 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <header className="h-16 border-b border-white/5 glass-panel sticky top-0 z-10 flex items-center justify-between px-4 lg:px-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-text-muted hover:text-white transition-colors">
              <Menu size={24} />
            </button>
            <button className="flex items-center gap-2 bg-surface px-3 md:px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0"></div>
              <span className="font-medium text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
                <span className="md:hidden">#{getAccountId()}</span>
                <span className="hidden md:inline">Account #{getAccountId()} (${(userData?.accountSize || 0).toLocaleString()})</span>
              </span>
              <ChevronDown size={14} className="text-text-muted shrink-0 md:w-4 md:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button className="p-2 text-text-muted hover:text-white relative hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-300 flex items-center justify-center text-sm font-bold shadow-lg text-white">
              {getInitials()}
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative z-10">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;