import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

const Overview = () => {
  // Mock data for the $100k Challenge
  const stats = {
    balance: 102450.00,
    equity: 102800.50,
    dailyLossLimit: 95000.00, // 5% of starting
    maxLossLimit: 90000.00,   // 10% of starting
    profitTarget: 108000.00,  // 8% target
    startingBalance: 100000.00,
  };

  const calculateProgress = (current, target, start) => {
    const progress = ((current - start) / (target - start)) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Trader</h1>
        <p className="text-text-muted">Here is the current status of your Vanta Phase 1 Evaluation.</p>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="text-sm text-text-muted mb-1">Current Balance</div>
          <div className="text-3xl font-bold text-white mb-2">${stats.balance.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp size={16} /> +2.45%
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="text-sm text-text-muted mb-1">Current Equity</div>
          <div className="text-3xl font-bold text-white mb-2">${stats.equity.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp size={16} /> +2.80%
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-[3px] border-l-danger/50">
          <div className="text-sm text-text-muted mb-1">Daily Loss Limit</div>
          <div className="text-xl font-bold text-white">${stats.dailyLossLimit.toLocaleString()}</div>
          <div className="text-xs text-text-muted mt-2">Equity must not fall below this</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-[3px] border-l-danger/50">
          <div className="text-sm text-text-muted mb-1">Max Drawdown</div>
          <div className="text-xl font-bold text-white">${stats.maxLossLimit.toLocaleString()}</div>
          <div className="text-xs text-text-muted mt-2">Hard breach level</div>
        </div>
      </div>

      {/* Trading Objectives Progress */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle2 className="text-primary" /> Trading Objectives
        </h2>
        
        <div className="space-y-8">
          {/* Profit Target Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-text-muted">Profit Target ($8,000)</span>
              <span className="text-sm font-bold text-success">
                ${(stats.balance - stats.startingBalance).toLocaleString()} / ${(stats.profitTarget - stats.startingBalance).toLocaleString()}
              </span>
            </div>
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" 
                style={{ width: `${calculateProgress(stats.balance, stats.profitTarget, stats.startingBalance)}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-text-muted mt-2">
              {calculateProgress(stats.balance, stats.profitTarget, stats.startingBalance)}% Completed
            </div>
          </div>

          {/* Rules Status Grid */}
          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-medium text-sm">Minimum Trading Days</div>
                <div className="text-xs text-text-muted">5 / 5 Days (Passed)</div>
              </div>
            </div>
            <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-medium text-sm">Daily Drawdown</div>
                <div className="text-xs text-text-muted">Respected</div>
              </div>
            </div>
            <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-medium text-sm">Max Drawdown</div>
                <div className="text-xs text-text-muted">Respected</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Overview;