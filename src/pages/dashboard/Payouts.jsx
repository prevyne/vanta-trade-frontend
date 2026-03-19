import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Wallet, Clock, CheckCircle2, 
  AlertCircle, ArrowRightLeft, Bitcoin, Landmark, 
  RefreshCw
} from 'lucide-react';

const Payouts = () => {
  // 1. Initial State (Mocking what you'd fetch from your database on load)
  const [transactions, setTransactions] = useState([
    { id: 'PAY-88291-03', date: '2026-03-19 10:15', amount: 4500.00, method: 'Bitcoin (BTC)', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', status: 'Processing' },
    { id: 'PAY-88291-02', date: '2026-02-15 14:30', amount: 3200.00, method: 'Bank Wire', address: 'Ending in 4492', status: 'Completed' },
    { id: 'PAY-88291-01', date: '2026-01-10 09:45', amount: 1500.00, method: 'USDT (TRC20)', address: 'TY1v9Z...pQw2', status: 'Completed' },
  ]);

  // UI State for the payout request form
  const [requestAmount, setRequestAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('crypto');

  // Account Metrics
  const metrics = {
    withdrawable: 8245.50,
    profitSplit: 90,
    nextPayoutDate: 'Available Now',
    status: 'Eligible'
  };

  // =========================================================================
  // 2. WEBHOOK & REAL-TIME ARCHITECTURE PREP
  // This effect simulates listening for real-time updates pushed from your 
  // backend (via WebSockets/SSE) after your backend receives a provider webhook.
  // =========================================================================
  useEffect(() => {
    // TODO: Replace this timeout with your actual WebSocket listener.
    // Example: socket.on('payout_webhook_update', (payload) => { ... })
    
    const simulatedWebhookTimer = setTimeout(() => {
      setTransactions(prev => prev.map(tx => {
        // Simulating the webhook arriving for the 'Processing' transaction
        if (tx.id === 'PAY-88291-03') {
          return { ...tx, status: 'Completed' };
        }
        return tx;
      }));
    }, 8000); // Simulates a webhook arriving 8 seconds after page load

    return () => clearTimeout(simulatedWebhookTimer);
  }, []);
  // =========================================================================

  // Helper to style status badges dynamically
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 size={14}/> {status}</span>;
      case 'Processing':
        return <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center gap-1 w-fit"><RefreshCw size={14} className="animate-spin"/> {status}</span>;
      case 'Pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold flex items-center gap-1 w-fit"><Clock size={14}/> {status}</span>;
      case 'Failed':
        return <span className="px-3 py-1 rounded-full bg-danger/20 text-danger text-xs font-bold flex items-center gap-1 w-fit"><AlertCircle size={14}/> {status}</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-surface-hover text-text-muted text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Payout Portal</h1>
        <p className="text-text-muted">Manage your profit splits and track real-time withdrawal statuses.</p>
      </div>

      {/* 1. Metrics & Eligibility Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-l-[3px] border-l-success">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-text-muted">Withdrawable Balance</div>
            <Wallet size={20} className="text-success" />
          </div>
          <div className="text-3xl font-bold text-white">${metrics.withdrawable.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
          <div className="text-sm text-text-muted mt-2">After {metrics.profitSplit}% split applied</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-text-muted">Payout Status</div>
            <CheckCircle2 size={20} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics.status}</div>
          <div className="text-sm text-text-muted mt-2">Next Request: {metrics.nextPayoutDate}</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-surface to-primary/5">
          <div className="text-sm text-text-muted mb-4">Lifetime Withdrawals</div>
          <div className="text-3xl font-bold text-white mb-2">$4,700.00</div>
          <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
            Download Tax Report <ArrowRightLeft size={14} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 2. Request Payout Form */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl h-fit border border-white/5">
          <h2 className="text-xl font-bold mb-6">Request Payout</h2>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Amount (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-text-muted">$</span>
                </div>
                <input 
                  type="number" 
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:border-primary text-white font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setRequestAmount(metrics.withdrawable)}
                  className="absolute inset-y-0 right-2 text-xs text-primary font-bold hover:text-white"
                >
                  MAX
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Withdrawal Method</label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setPayoutMethod('crypto')}
                  className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center gap-2 transition-all ${payoutMethod === 'crypto' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-surface/50 text-text-muted hover:border-white/30'}`}
                >
                  <Bitcoin size={24} className={payoutMethod === 'crypto' ? 'text-primary' : ''} />
                  <span className="text-sm font-medium">Crypto</span>
                </div>
                <div 
                  onClick={() => setPayoutMethod('bank')}
                  className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center gap-2 transition-all ${payoutMethod === 'bank' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-surface/50 text-text-muted hover:border-white/30'}`}
                >
                  <Landmark size={24} className={payoutMethod === 'bank' ? 'text-primary' : ''} />
                  <span className="text-sm font-medium">Bank Wire</span>
                </div>
              </div>
            </div>

            {payoutMethod === 'crypto' && (
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Wallet Address</label>
                <input 
                  type="text" 
                  placeholder="Paste your address here"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white text-sm"
                />
              </div>
            )}

            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-4">
              Submit Request
            </button>
          </form>
        </div>

        {/* 3. Transaction History (Real-time Webhook Feed) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface/50">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCard size={20} className="text-primary" /> Payout History
            </h3>
            <div className="flex items-center gap-2 text-xs text-text-muted bg-surface px-3 py-1.5 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Live Updates Enabled
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1 p-6">
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-white/5 bg-surface/30 hover:bg-surface-hover/50 transition-colors gap-4">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                      {tx.method.includes('BTC') || tx.method.includes('USDT') ? <Bitcoin size={18} className="text-text-muted" /> : <Landmark size={18} className="text-text-muted" />}
                    </div>
                    <div>
                      <div className="font-bold text-white">${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                      <div className="text-xs text-text-muted mt-0.5">{tx.id} • {tx.date}</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    {getStatusBadge(tx.status)}
                    <div className="text-xs text-text-muted font-mono">{tx.method}</div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payouts;