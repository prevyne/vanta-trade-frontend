import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../../config/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="font-bold text-3xl tracking-wider cursor-pointer hover:opacity-80 transition-opacity inline-block mb-2">
            VANTA<span className="text-primary">.</span>
          </Link>
          <p className="text-text-muted">Sign in to your trading command center</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl">
          {error && (
            <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-start gap-2 text-danger text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail size={18} className="text-text-muted" /></div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surface/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary text-white" placeholder="trader@example.com" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-text-muted">Password</label>
                <button type="button" className="text-xs text-primary hover:text-white transition-colors">Forgot Password?</button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock size={18} className="text-text-muted" /></div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-surface/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary text-white" placeholder="••••••••" />
              </div>
            </div>

            <button disabled={isLoading} className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex justify-center items-center gap-2 disabled:opacity-70 mt-6">
              {isLoading ? 'Authenticating...' : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <button onClick={handleGoogleLogin} type="button" className="w-full bg-surface border border-white/10 text-white font-medium py-3 rounded-lg hover:bg-surface-hover transition-colors flex justify-center items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>
        </div>

        <p className="text-center text-text-muted mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-primary hover:text-white font-medium transition-colors">Apply for funding</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;