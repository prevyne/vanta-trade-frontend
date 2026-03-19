import React, { useState } from 'react';
import { TrendingUp, Percent, BarChart2, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

const Analytics = () => {
  const { userData } = useAuth();
  const baseBalance = userData?.accountSize || 100000;

  // Timeframe Filter State
  const [activeFilter, setActiveFilter] = useState('1M');

  // Mock Data Sets for different timeframes
  const chartData = {
    '1D': [
      { date: '09:00', balance: baseBalance },
      { date: '11:00', balance: baseBalance + 120 },
      { date: '13:00', balance: baseBalance - 50 },
      { date: '15:00', balance: baseBalance + 340 },
      { date: '17:00', balance: baseBalance + 420 },
    ],
    '1W': [
      { date: 'Mon', balance: baseBalance },
      { date: 'Tue', balance: baseBalance + 450 },
      { date: 'Wed', balance: baseBalance + 200 },
      { date: 'Thu', balance: baseBalance + 890 },
      { date: 'Fri', balance: baseBalance + 1240 },
    ],
    '1M': [
      { date: 'Oct 01', balance: baseBalance },
      { date: 'Oct 08', balance: baseBalance + 800 },
      { date: 'Oct 15', balance: baseBalance + 650 },
      { date: 'Oct 22', balance: baseBalance + 1500 },
      { date: 'Oct 29', balance: baseBalance + 2400 },
    ],
    '1Y': [
      { date: 'Jan', balance: baseBalance },
      { date: 'Apr', balance: baseBalance + 4000 },
      { date: 'Jul', balance: baseBalance + 3200 },
      { date: 'Oct', balance: baseBalance + 8500 },
      { date: 'Dec', balance: baseBalance + 12000 },
    ],
    'ALL': [
      { date: '2023', balance: baseBalance },
      { date: '2024', balance: baseBalance + 15000 },
      { date: '2025', balance: baseBalance + 28000 },
    ]
  };

  // Mock Performance Data
  const stats = [
    { label: 'Win Rate', value: '68.5%', icon: <Percent size={18} />, trend: '+2.4%' },
    { label: 'Profit Factor', value: '1.82', icon: <BarChart2 size={18} />, trend: '+0.15' },
    { label: 'Best Trade', value: '+$1,240.00', icon: <ArrowUpRight size={18} className="text-success" />, trend: 'EURUSD' },
    { label: 'Worst Trade', value: '-$450.00', icon: <ArrowDownRight size={18} className="text-danger" />, trend: 'GBPUSD' },
  ];

  // Custom Tooltip for the Chart Hover state
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel border border-white/10 p-3 rounded-lg shadow-xl bg-surface/90 backdrop-blur-md">
          <p className="text-text-muted text-xs mb-1">{label}</p>
          <p className="text-white font-bold">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

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

      {/* Dynamic Equity Curve Chart Area */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-primary" /> Equity Curve
          </h2>
          
          {/* Timeframe Filter Buttons */}
          <div className="flex gap-2 bg-surface/50 p-1 rounded-lg border border-white/5 w-fit">
            {['1D', '1W', '1M', '1Y', 'ALL'].map(period => (
              <button 
                key={period} 
                onClick={() => setActiveFilter(period)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeFilter === period 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        {/* Recharts Implementation */}
        <div className="h-80 w-full" style={{ marginLeft: '-15px' }}> {/* Slight negative margin to align Y-axis text perfectly */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData[activeFilter]} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#6b7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `$${val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}`}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                animationDuration={1000} // Smooth transition when switching filters
              />
            </AreaChart>
          </ResponsiveContainer>
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