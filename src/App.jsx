import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';

// Page Imports
import Landing from './pages/public/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Temporary placeholders for remaining public pages
const Evaluations = () => <div className="p-8 pt-24 text-center text-white">Evaluations Breakdown</div>;
const Rules = () => <div className="p-8 pt-24 text-center text-white">Trading Rules & IP</div>;

/* =========================================
   1. PROTECTED ROUTE WRAPPER
   ========================================= */
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* =========================================
   2. PUBLIC LAYOUT WRAPPER
   ========================================= */
const PublicLayout = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] glow-bg pointer-events-none"></div>

      <nav className="h-16 border-b border-white/5 glass-panel sticky top-0 z-50 flex items-center px-6 lg:px-12 justify-between">
        <Link to="/" className="font-bold text-xl tracking-wider cursor-pointer">
          VANTA<span className="text-primary">.</span>
        </Link>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          {currentUser ? (
            <Link to="/dashboard" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-text-muted hover:text-text-main transition-colors">
                Log in
              </Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Create account
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="flex-grow relative z-10 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

/* =========================================
   3. MAIN APP COMPONENT
   ========================================= */
function App() {
  const { loading, currentUser } = useAuth();

  // Wait for Firebase to check the user's session before rendering
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
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/rules" element={<Rules />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* Secure Route */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;