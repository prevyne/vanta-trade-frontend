import React, { useState } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

const Terminal = () => {
  const [symbol, setSymbol] = useState("FX:EURUSD");

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 flex flex-col h-[calc(100vh-100px)]">
      
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
          <div>
            <div className="text-xs text-text-muted mb-1">Daily Drawdown Limit</div>
            <div className="font-bold text-white">$4,500.00</div>
          </div>
          <Activity size={20} className="text-primary/50" />
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
          <div>
            <div className="text-xs text-text-muted mb-1">Open PnL</div>
            <div className="font-bold text-success">+$420.50</div>
          </div>
          <TrendingUp size={20} className="text-success/50" />
        </div>
      </div>

      {/* Main Terminal Area */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        
        {/* Left: TradingView Chart (Takes up most of the space) */}
        <div className="flex-1 glass-panel rounded-xl border border-white/5 overflow-hidden flex flex-col">
          <div className="h-full w-full pointer-events-auto">
            <AdvancedRealTimeChart 
              theme="dark" 
              autosize 
              symbol={symbol}
              timezone="Etc/UTC"
              style="1"
              locale="en"
              enable_publishing={false}
              hide_side_toolbar={false}
              allow_symbol_change={true}
              container_id="vanta_tv_widget"
            />
          </div>
        </div>

        {/* Right: Order Execution Panel (Your Custom UI) */}
        <div className="w-full lg:w-80 shrink-0 glass-panel rounded-xl border border-white/5 p-5 flex flex-col">
          <h3 className="font-bold text-lg mb-4">Order Entry</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Lot Size</label>
              <input type="number" defaultValue="1.00" step="0.01" className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Take Profit</label>
                <input type="number" placeholder="Price" className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-success" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Stop Loss</label>
                <input type="number" placeholder="Price" className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-danger" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button className="bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 font-bold py-4 rounded-lg transition-colors flex flex-col items-center justify-center gap-1">
              <TrendingDown size={18} />
              SELL MARKET
            </button>
            <button className="bg-success/10 hover:bg-success/20 text-success border border-success/20 font-bold py-4 rounded-lg transition-colors flex flex-col items-center justify-center gap-1">
              <TrendingUp size={18} />
              BUY MARKET
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terminal;