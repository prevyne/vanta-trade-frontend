import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import { Loader2, Menu, X } from 'lucide-react';
import { useAuth } from './context/AuthContext';

// Page Imports
import Landing from './pages/public/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const Evaluations = () => <div className="p-8 pt-24 text-center text-white">Evaluations Breakdown</div>;
const Rules = () => <div className="p-8 pt-24 text-center text-white">Trading Rules & IP</div>;

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
};

/* =========================================
   PUBLIC LAYOUT WRAPPER (Mobile Responsive)
   ========================================= */
const PublicLayout = () => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile State

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] glow-bg pointer-events-none"></div>

      <nav className="h-16 border-b border-white/5 glass-panel sticky top-0 z-50 flex items-center px-6 lg:px-12 justify-between">
        <Link to="/" onClick={closeMenu} className="font-bold text-xl tracking-wider cursor-pointer">
          VANTA<span className="text-primary">.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {currentUser ? (
            <Link to="/dashboard" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-text-muted hover:text-text-main transition-colors">Log in</Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Create account
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-text-muted hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-white/5 p-6 flex flex-col gap-4 z-40 shadow-2xl backdrop-blur-xl">
          {currentUser ? (
            <Link to="/dashboard" onClick={closeMenu} className="bg-primary text-white text-center font-bold px-5 py-3 rounded-lg">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="text-white text-center font-medium px-5 py-3 bg-surface-hover rounded-lg border border-white/5">
                Log in
              </Link>
              <Link to="/register" onClick={closeMenu} className="bg-primary text-white text-center font-bold px-5 py-3 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Create account
              </Link>
            </>
          )}
        </div>
      )}

      <main className="flex-grow relative z-10 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

/* =========================================
   MAIN APP COMPONENT
   ========================================= */
function App() {
  const { loading, currentUser } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="text-sm font-medium text-text-muted">Loading Application...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/rules" element={<Rules />} />
        </Route>
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;