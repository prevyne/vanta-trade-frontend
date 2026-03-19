import React, { useState } from 'react';
import { 
  User, Lock, Bell, Shield, 
  CheckCircle2, AlertTriangle, Smartphone 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock User Data
  const user = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 019-2834',
    kycStatus: 'Verified',
  };

  const tabs = [
    { id: 'profile', label: 'Personal Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security & 2FA', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Alerts & Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-text-muted">Manage your profile, security preferences, and trading alerts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                  : 'text-text-muted hover:text-white hover:bg-surface-hover'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 glass-panel p-6 lg:p-8 rounded-2xl min-h-[500px]">
          
          {/* =========================================
              TAB: PROFILE & KYC
              ========================================= */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Personal Details</h2>
                  <p className="text-sm text-text-muted">Your basic account information.</p>
                </div>
                {/* KYC Badge */}
                <div className="flex items-center gap-2 bg-success/10 border border-success/20 px-3 py-1.5 rounded-lg text-success text-sm font-bold">
                  <Shield size={16} /> KYC {user.kycStatus}
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">First Name</label>
                    <input type="text" defaultValue={user.firstName} disabled className="w-full bg-surface border border-white/5 rounded-lg px-4 py-3 text-text-muted cursor-not-allowed opacity-70" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Last Name</label>
                    <input type="text" defaultValue={user.lastName} disabled className="w-full bg-surface border border-white/5 rounded-lg px-4 py-3 text-text-muted cursor-not-allowed opacity-70" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                  <input type="email" defaultValue={user.email} disabled className="w-full bg-surface border border-white/5 rounded-lg px-4 py-3 text-text-muted cursor-not-allowed opacity-70" />
                  <p className="text-xs text-text-muted mt-2">To change your name or email, please contact Vanta Support.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                  <input type="tel" defaultValue={user.phone} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
                </div>

                <div className="pt-4">
                  <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =========================================
              TAB: SECURITY & 2FA
              ========================================= */}
          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-white mb-1">Security & Authentication</h2>
              <p className="text-sm text-text-muted mb-8 pb-6 border-b border-white/5">Keep your account and payouts secure.</p>
              
              {/* 2FA Section */}
              <div className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-surface/30 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Smartphone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-text-muted max-w-md">Adds an extra layer of security. Required for requesting profit split payouts.</p>
                  </div>
                </div>
                <button className="bg-surface border border-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-surface-hover transition-colors">
                  Enable App
                </button>
              </div>

              {/* Password Section */}
              <h3 className="font-bold text-white mb-4">Change Password</h3>
              <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
                </div>
                <button className="bg-surface border border-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-surface-hover transition-colors mt-2">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* =========================================
              TAB: NOTIFICATIONS
              ========================================= */}
          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-white mb-1">Alerts & Notifications</h2>
              <p className="text-sm text-text-muted mb-8 pb-6 border-b border-white/5">Choose what events you want to be notified about.</p>
              
              <div className="space-y-4">
                {[
                  { title: 'Trade Execution Alerts', desc: 'Get notified when an order is opened or closed.', defaultChecked: false },
                  { title: 'Daily Drawdown Warnings', desc: 'Receive an alert if you reach 80% of your daily loss limit.', defaultChecked: true },
                  { title: 'Payout Status Updates', desc: 'Updates when your withdrawal is processed or completed.', defaultChecked: true },
                  { title: 'Marketing & Promotions', desc: 'News about discount codes and new challenge types.', defaultChecked: false },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-surface/30 transition-colors">
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-text-muted">{alert.desc}</p>
                    </div>
                    
                    {/* Pure Tailwind Toggle Mockup */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={alert.defaultChecked} />
                      <div className="w-11 h-6 bg-surface border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;