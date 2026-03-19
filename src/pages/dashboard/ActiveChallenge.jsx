import React from 'react';
import { 
  Activity, TrendingUp, TrendingDown, Crosshair, 
  BarChart2, Clock, CalendarDays, History 
} from 'lucide-react';

const ActiveChallenge = () => {
  // Mock data for the analytical view
  const performance = {
    winRate: 68.5,
    profitFactor: 2.14,
    tradesTaken: 42,
    averageWin: 450.20,
    averageLoss: -210.50,
    bestTrade: 1250.00,
    tradingDays: 12,
  };

  const recentTrades = [
    { id: '1092831', symbol: 'XAUUSD', type: 'BUY', lots: 2.5, open: '2026-03-18 08:15', close: '2026-03-18 10:30', profit: 845.50 },
    { id: '1092830', symbol: 'EURUSD', type: 'SELL', lots: 5.0, open: '2026-03-17 14:20', close: '2026-03-17 15:45', profit: 320.00 },
    { id: '1092829', symbol: 'US30', type: 'BUY', lots: 1.0, open: '2026-03-17 09:30', close: '2026-03-17 09:45', profit: -150.00 },
    { id: '1092828', symbol: 'GBPUSD', type: 'SELL', lots: 3.0, open: '2026-03-16 11:00', close: '2026-03-16 13:15', profit: 410.25 },
    { id: '1092827', symbol: 'XAUUSD', type: 'BUY', lots: 2.0, open: '2026-03-15 16:45', close: '2026-03-15 18:00', profit: -220.00 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Challenge Analytics</h1>
        <p className="text-text-muted">Deep dive into your Phase 1 performance metrics and trade history.</p>
      </div>

      {/* 1. Equity Curve Chart Section */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl relative overflow-hidden">
        <div className="flex justify-between items-end mb-8 relative z-10">
          <div>
            <div className="text-text-muted mb-1 flex items-center gap-2">
              <Activity size={16} className="text-primary" /> Equity Curve
            </div>
            <div className="text-4xl font-bold text-white">$102,800.50</div>
            <div className="text-success text-sm font-medium mt-1">+2.80% All Time</div>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', 'All'].map((tf, i) => (
              <button key={i} className={`px-3 py-1 text-sm rounded-md transition-colors ${tf === 'All' ? 'bg-primary text-white' : 'bg-surface border border-white/5 text-text-muted hover:text-white'}`}>
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Area Chart Mockup */}
        <div className="w-full h-[300px] relative z-10 border-b border-l border-white/10 flex items-end">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.0)" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <path d="M 0 75 L 1000 75 M 0 150 L 1000 150 M 0 225 L 1000 225" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
            
            {/* Area Fill */}
            <path 
              d="M 0 300 L 0 250 C 100 260 200 180 300 190 C 400 200 500 120 600 100 C 700 80 800 150 900 60 L 1000 20 L 1000 300 Z" 
              fill="url(#chartGradient)" 
            />
            {/* Line */}
            <path 
              d="M 0 250 C 100 260 200 180 300 190 C 400 200 500 120 600 100 C 700 80 800 150 900 60 L 1000 20" 
              stroke="#3b82f6" 
              strokeWidth="4" 
              fill="none" 
              className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            />
          </svg>
        </div>
      </div>

      {/* 2. Advanced Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Win Rate', value: `${performance.winRate}%`, icon: <Crosshair className="text-primary" size={20} /> },
          { label: 'Profit Factor', value: performance.profitFactor, icon: <BarChart2 className="text-primary" size={20} /> },
          { label: 'Trades Taken', value: performance.tradesTaken, icon: <History className="text-primary" size={20} /> },
          { label: 'Trading Days', value: performance.tradingDays, icon: <CalendarDays className="text-primary" size={20} /> },
          { label: 'Average Win', value: `$${performance.averageWin.toFixed(2)}`, icon: <TrendingUp className="text-success" size={20} /> },
          { label: 'Average Loss', value: `$${Math.abs(performance.averageLoss).toFixed(2)}`, icon: <TrendingDown className="text-danger" size={20} /> },
          { label: 'Best Trade', value: `$${performance.bestTrade.toFixed(2)}`, icon: <TrendingUp className="text-success" size={20} /> },
          { label: 'Avg Trade Duration', value: '2h 15m', icon: <Clock className="text-primary" size={20} /> },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl flex flex-col hover:bg-surface-hover transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-muted font-medium">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 3. Trade History Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface/50">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History size={20} className="text-primary" /> Recent Trades
          </h3>
          <button className="text-sm text-primary hover:text-white transition-colors">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-surface/30 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Ticket</th>
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Lots</th>
                <th className="px-6 py-4 font-medium">Open Time</th>
                <th className="px-6 py-4 font-medium">Close Time</th>
                <th className="px-6 py-4 font-medium text-right">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentTrades.map((trade, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-text-muted">#{trade.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{trade.symbol}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${trade.type === 'BUY' ? 'bg-primary/20 text-primary' : 'bg-danger/20 text-danger'}`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{trade.lots}</td>
                  <td className="px-6 py-4 text-text-muted">{trade.open}</td>
                  <td className="px-6 py-4 text-text-muted">{trade.close}</td>
                  <td className={`px-6 py-4 font-bold text-right ${trade.profit >= 0 ? 'text-success' : 'text-danger'}`}>
                    {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ActiveChallenge;