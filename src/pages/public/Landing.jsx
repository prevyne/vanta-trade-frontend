import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, TrendingUp, Monitor, 
  ShieldCheck, Globe, Zap, Mail, HelpCircle, ChevronRight
} from 'lucide-react';

// Import the TradingView Ticker Tape
import { TickerTape } from "react-ts-tradingview-widgets";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-white/10 text-xs font-bold text-primary mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Now accepting global traders
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-3 duration-700">
          Trade up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">$200,000</span> in simulated capital.
        </h1>
        
        <p className="text-lg text-text-muted mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Pass our two-step evaluation or fund your account directly. Keep up to 90% of your profits with industry-leading tight spreads and real-time payouts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          <Link to="/register" className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2">
            Start Your Challenge <ChevronRight size={18} />
          </Link>
          <a href="#plans" className="bg-surface border border-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-surface-hover transition-colors flex items-center justify-center">
            View Pricing
          </a>
        </div>
      </section>

      {/* =========================================
          MARKET TICKER CAROUSEL
          ========================================= */}
      <div className="w-full border-y border-white/5 bg-surface/30">
        <TickerTape 
          colorTheme="dark" 
          displayMode="regular"
          transparent={true}
          symbols={[
            { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
            { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
            { proName: "FX_IDC:USDJPY", title: "USD/JPY" },
            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
            { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
            { proName: "OANDA:XAUUSD", title: "Gold" },
            { proName: "OANDA:SPX500USD", title: "S&P 500" },
            { proName: "OANDA:NAS100USD", title: "Nasdaq 100" }
          ]}
        />
      </div>

      {/* =========================================
          WHY VANTA (Our Results)
          ========================================= */}
      <section id="why-vanta" className="py-20 px-6 lg:px-12 bg-surface/20 border-b border-white/5 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Results Are Proven in Numbers</h2>
            <p className="text-text-muted max-w-2xl mx-auto">We provide the most reliable infrastructure for simulated prop trading.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={24}/>, value: '180+', label: 'Countries Supported' },
              { icon: <TrendingUp size={24}/>, value: '$12M+', label: 'Paid Out to Traders' },
              { icon: <Zap size={24}/>, value: '< 50ms', label: 'Execution Speed' },
              { icon: <ShieldCheck size={24}/>, value: '99.9%', label: 'Platform Uptime' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TRADING TERMINAL (Platform)
          ========================================= */}
      <section id="platform" className="py-24 px-6 lg:px-12 scroll-mt-16 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pro-Grade Trading Terminal Built In</h2>
            <p className="text-lg text-text-muted mb-8">
              Don't deal with clunky third-party apps. Vanta Trade features a fully integrated TradingView charting engine directly inside your browser. Monitor your equity curve, execute trades, and request payouts from one unified dashboard.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Real-time market data directly from top-tier liquidity providers.',
                'Interactive performance analytics and automated journaling.',
                'One-click instant deposits via Paystack.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-muted">
                  <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/register" className="text-primary font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
              Explore the Dashboard <ChevronRight size={18} />
            </Link>
          </div>
          <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-2xl relative group cursor-pointer">
            {/* Outer glowing border */}
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            {/* Image Container */}
            <div className="bg-surface rounded-xl aspect-video border border-white/5 flex items-center justify-center relative z-10 overflow-hidden">
               
               {/* The Screenshot */}
               <img 
                 src="../../src/assets/terminal-preview.png" 
                 alt="Vanta Trading Terminal" 
                 className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
               />
               
               {/* Bottom Fade Overlay so it blends into the dark theme */}
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          TRADING RULES
          ========================================= */}
      <section id="rules" className="py-24 px-6 lg:px-12 bg-surface/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Fair Trading Rules</h2>
            <p className="text-text-muted max-w-2xl mx-auto">No hidden traps. Just straightforward risk management designed to find consistent traders.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Profit Target', desc: 'Reach an 8% profit target in Phase 1, and 5% in Phase 2 to get funded.' },
              { title: 'Daily Drawdown', desc: 'Your equity or balance cannot fall below 5% of your initial starting balance in a single day.' },
              { title: 'Maximum Drawdown', desc: 'Your account balance cannot fall below 10% of your initial starting balance at any time.' },
            ].map((rule, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[30px] rounded-full"></div>
                <div className="text-4xl font-bold text-white/10 mb-4">0{i + 1}</div>
                <h3 className="text-xl font-bold text-white mb-2">{rule.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          INVESTMENT PLANS
          ========================================= */}
      <section id="plans" className="py-24 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Select Your Account Size</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Choose an evaluation that fits your risk appetite. Refundable fee upon passing.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { size: '10,000', fee: 99 },
              { size: '50,000', fee: 299, popular: true },
              { size: '100,000', fee: 499 },
            ].map((plan, i) => (
              <div key={i} className={`glass-panel rounded-2xl border relative flex flex-col ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-105 z-10' : 'border-white/5'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8 text-center border-b border-white/5">
                  <div className="text-sm text-text-muted font-bold mb-2">Vanta Challenge</div>
                  <div className="text-4xl font-bold text-white">${plan.size}</div>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-4 text-sm text-text-muted mb-8">
                    <li className="flex justify-between"><span>Profit Target</span> <span className="text-white font-medium">8% / 5%</span></li>
                    <li className="flex justify-between"><span>Max Daily Loss</span> <span className="text-white font-medium">5%</span></li>
                    <li className="flex justify-between"><span>Max Overall Loss</span> <span className="text-white font-medium">10%</span></li>
                    <li className="flex justify-between"><span>Time Limit</span> <span className="text-white font-medium">Infinite</span></li>
                  </ul>
                  <Link to="/register" className={`w-full block text-center py-3 rounded-xl font-bold transition-colors ${plan.popular ? 'bg-primary text-white hover:bg-blue-600' : 'bg-surface border border-white/10 text-white hover:bg-surface-hover'}`}>
                    Start for ${plan.fee}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          FAQ SECTION
          ========================================= */}
      <section id="faq" className="py-24 px-6 lg:px-12 bg-surface/30 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle size={40} className="text-primary mx-auto mb-4 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "What happens if I breach a rule?", a: "If you hit the daily or maximum drawdown limits, your account will be disabled. You are welcome to purchase a new evaluation at a discounted retry rate." },
              { q: "When can I withdraw my profits?", a: "Funded traders can request their first payout 14 days after placing their first live trade. Subsequent payouts can be requested bi-weekly." },
              { q: "Do you support direct crypto deposits?", a: "Yes, our integrated Paystack and crypto gateways allow you to fund your account and receive payouts in local fiat or major cryptocurrencies." },
            ].map((faq, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT SECTION
          ========================================= */}
      <section id="contact" className="py-24 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <Mail size={40} className="text-primary mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
            Our global support team is available 24/7 to assist you with technical issues, account inquiries, or billing questions.
          </p>
          <a href="mailto:support@vantatrade.com" className="inline-flex items-center gap-2 bg-surface border border-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-surface-hover transition-colors">
            <Mail size={18} /> Email Support Team
          </a>
        </div>
      </section>

    </div>
  );
};

export default Landing;