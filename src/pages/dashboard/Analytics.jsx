import React from 'react';
import { TrendingUp, Percent, BarChart2, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Analytics = () => {
  const { userData } = useAuth();
  const currentBalance = userData?.accountSize || 0;

  // Mock Performance Data
  const stats = [
    { label: 'Win Rate', value: '68.5%', icon: <Percent size={18} />, trend: '+2.4%' },
    { label: 'Profit Factor', value: '1.82', icon: <BarChart2 size={18} />, trend: '+0.15' },
    { label: 'Best Trade', value: '+$1,240.00', icon: <ArrowUpRight size={18} className="text-success" />, trend: 'EURUSD' },
    { label: 'Worst Trade', value: '-$450.00', icon: <ArrowDownRight size={18} className="text-danger" />, trend: 'GBPUSD' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-text-muted">Track your equity curve, win rate, and historical trade data.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3 text-text-muted">
              <span className="text-sm font-medium">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-text-muted">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Equity Curve Chart Area */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-primary" /> Equity Curve
          </h2>
          <div className="flex gap-2">
            {['1W', '1M', 'ALL'].map(period => (
              <button key={period} className="px-3 py-1 text-xs font-medium rounded bg-surface border border-white/10 hover:text-white transition-colors">
                {period}
              </button>
            ))}
          </div>
        </div>
        
        {/* Simple SVG Chart Representation */}
        <div className="h-64 w-full relative flex items-end">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-white/10 pb-6 pl-2">
            {[4, 3, 2, 1, 0].map((line) => (
              <div key={line} className="w-full border-t border-white/5 relative">
                <span className="absolute -left-12 -top-2 text-[10px] text-text-muted">
                  ${(currentBalance + line * 500).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          {/* Mock Line (Replaces external chart library for now) */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,40 T100,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,40 T100,10 L100,100 L0,100 Z" fill="url(#grad)" opacity="0.2" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Trade History Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Recent Trades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-surface/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Open Time</th>
                <th className="px-6 py-4 text-right">PnL</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sym: 'EURUSD', type: 'Buy', time: 'Oct 24, 10:30 AM', pnl: '+$420.50', up: true },
                { sym: 'GBPUSD', type: 'Sell', time: 'Oct 24, 08:15 AM', pnl: '-$150.00', up: false },
                { sym: 'XAUUSD', type: 'Buy', time: 'Oct 23, 14:20 PM', pnl: '+$890.00', up: true },
              ].map((trade, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{trade.sym}</td>
                  <td className={`px-6 py-4 font-bold ${trade.up ? 'text-success' : 'text-danger'}`}>{trade.type}</td>
                  <td className="px-6 py-4 text-text-muted">{trade.time}</td>
                  <td className={`px-6 py-4 text-right font-bold ${trade.up ? 'text-success' : 'text-danger'}`}>{trade.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Analytics;