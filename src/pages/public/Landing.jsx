import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, UserPlus, Wallet, Layers, TrendingUp, 
  ArrowRightLeft, CircleDollarSign, Zap, DownloadCloud, 
  ShieldCheck, Bitcoin, CreditCard, Landmark, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { TickerTape } from 'react-ts-tradingview-widgets';
import PaystackCheckout from '../../components/ui/PaystackCheckout';

const Landing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How fast are withdrawals processed?", a: "Withdrawals are carried out in seconds with no manual processing, ensuring you have access to your funds instantly, even on weekends." },
    { q: "Are there any hidden fees?", a: "No. We operate with radical transparency. You pay zero commission and no swap fees. Our spreads start as low as 0.8 pips." },
    { q: "What payment methods do you accept?", a: "We accept Bitcoin, major credit cards (Visa/Mastercard), Western Union, and direct bank wire transfers." },
    { q: "Is Vanta a regulated platform?", a: "Vanta operates with a strong capital position, conservative balance sheets, and automated risk controls designed to protect our clients." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-main">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
        <div className="glow-bg absolute top-0"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-8 font-medium">
          <ShieldCheck size={16} /> Trusted by over 2.5 Million Users
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Generate recurring income with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">stable portfolio.</span>
        </h1>
        
        <p className="text-lg text-text-muted max-w-2xl mb-10 leading-relaxed">
          We offer a superior trading environment that puts investors in the best position to profit. VANTA predicts currency and stock rates to help you grow your financial portfolio.
        </p>

        <Link to="/dashboard" className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] text-lg">
          Get Started <ChevronRight size={20} />
        </Link>
      </section>

      {/* 2. LIVE TICKER */}
      <section className="w-full border-y border-white/5 bg-surface/50">
        <TickerTape colorTheme="dark" displayMode="compact" isTransparent={true} />
      </section>

      {/* 3. QUICK START STEPS */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {[
            { icon: <UserPlus size={24} />, title: "Sign up in minutes" },
            { icon: <Wallet size={24} />, title: "Make a deposit" },
            { icon: <Layers size={24} />, title: "Select a Plan" },
            { icon: <TrendingUp size={24} />, title: "Start Earning" }
          ].map((step, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform cursor-default">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
                {step.icon}
              </div>
              <h3 className="font-semibold text-white">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROVEN RESULTS & FEATURES */}
      <section className="py-24 px-6 lg:px-12 bg-surface/30 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Results Are Proven in Numbers</h2>
            <p className="text-text-muted">Nobody does more to provide you with what you need to maximise your trading potential.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">1.5 Billion</div>
              <div className="text-text-muted">trades executed in Vanta</div>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">Zero</div>
              <div className="text-text-muted">rejections or failed investments</div>
            </div>
            <div>
              <div className="text-5xl font-black text-success mb-2">95.9%</div>
              <div className="text-text-muted">of withdrawals automatically approved</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <ArrowRightLeft />, title: "Tight Spreads", desc: "Our expert traders trade with as low as 0.8 pips." },
              { icon: <CircleDollarSign />, title: "No hidden costs", desc: "Pay no swap fees and zero commission." },
              { icon: <Zap />, title: "Superior Execution", desc: "Enjoy fair prices with no requotes or rejections." },
              { icon: <DownloadCloud />, title: "Instant Withdrawals", desc: "Get your funds easily and pay no fees with Vanta." }
            ].map((feat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors">
                <div className="text-text-muted mb-4">{feat.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INVESTMENT PLANS */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Investment Plans</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Silver', price: 300, time: '24 hours', range: '£300 - £1,000', min: '£300', max: '£1,000', target: '£1,800 - £6,000', popular: false },
            { name: 'Gold', price: 2000, time: '48 hours', range: '£2,000 - £5,000', min: '£2,000', max: '£5,000', target: '£12,000 - £32,000', popular: true },
            { name: 'Exclusive', price: 6000, time: '72 hours', range: '£6,000 - £10,000', min: '£6,000', max: '£10,000', target: '£36,000 - £60,000', popular: false }
          ].map((plan, i) => (
            <div key={i} className={`glass-panel rounded-3xl p-8 relative flex flex-col ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(59,130,246,0.15)] md:-translate-y-4' : 'border-white/5'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <span className="text-xs bg-surface px-3 py-1 rounded-full border border-white/10 text-text-muted">Plan</span>
              </div>
              <p className="text-sm text-text-muted mb-6">Profit received in ({plan.time})</p>
              
              <div className="text-4xl font-black text-white mb-8 tracking-tight">{plan.range}</div>
              
              <div className="mb-8 w-full">
                {/* Paystack Integration */}
                <PaystackCheckout 
                  amount={plan.price} 
                  planName={`${plan.name} Investment Plan`} 
                  email="guest@vanta-trade.com" 
                  onSuccessCallback={(ref) => alert(`Payment successful for ${plan.name} plan! Reference: ${ref.reference}`)}
                />
              </div>

              <div className="space-y-4 text-sm mt-auto">
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-primary" /> Signal Pro</div>
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-primary" /> Signal Analysis</div>
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-white" /> <span className="text-white">Minimum: {plan.min}</span></div>
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-white" /> <span className="text-white">Maximum: {plan.max}</span></div>
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-success" /> <span className="text-success">Target Return: {plan.target}</span></div>
                <div className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={18} className="text-primary" /> 24/7 Customer Care</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST & PAYMENTS */}
      <section className="py-24 px-6 lg:px-12 bg-surface/30 border-y border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Instant withdrawals, 24/7</h2>
          <p className="text-text-muted mb-12">Our withdrawals are carried out in seconds with no manual processing, including on weekends.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 mb-12 opacity-70">
            <div className="flex items-center gap-2 text-xl font-bold"><Bitcoin size={32} className="text-[#F7931A]" /> Bitcoin</div>
            <div className="flex items-center gap-2 text-xl font-bold"><CreditCard size={32} /> Visa / MC</div>
            <div className="flex items-center gap-2 text-xl font-bold text-yellow-500">WESTERN UNION</div>
            <div className="flex items-center gap-2 text-xl font-bold"><Landmark size={32} /> Bank Wire</div>
          </div>
          <p className="text-xs text-text-muted max-w-2xl mx-auto">
            We comply with the Payment Card Industry Data Security Standard (PCI DSS) to ensure your security and privacy.
          </p>
        </div>
      </section>

      {/* 7. FAQ & CONTACT SECTION */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="p-4 flex justify-between items-center text-white font-medium">
                  {faq.q}
                  <ChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180 text-primary' : 'text-text-muted'}`} size={20} />
                </div>
                {activeFaq === i && (
                  <div className="p-4 pt-0 text-text-muted text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full"></div>
          <h2 className="text-3xl font-bold mb-2 relative z-10">Contact Support</h2>
          <p className="text-text-muted mb-8 relative z-10">Award-winning support, seconds away.</p>
          
          <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
              <input type="text" placeholder="Last Name" className="bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white" />
            <textarea placeholder="How can we help?" rows="4" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white resize-none"></textarea>
            <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#0a0c13] pt-16 pb-8 px-6 lg:px-12 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12 text-sm">
          <div className="md:col-span-1">
             <div className="font-bold text-2xl tracking-wider mb-6">
              VANTA<span className="text-primary">.</span>
            </div>
            <p className="text-text-muted leading-relaxed">
              The Company does not provide services to citizens and/or residents of Iran, Myanmar, Pakistan, Syria, Yemen, Jordan, Afghanistan.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Conditions</h4>
            <ul className="space-y-3 text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">Deposits and withdrawals</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Client protection</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">About Us</h4>
            <ul className="space-y-3 text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">Why VANTA</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Regulations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">Investment plans</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Terms of use</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs">
          <p>&copy; {new Date().getFullYear()} Vanta Trade. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Legal Info</span>
            <span className="hover:text-white cursor-pointer transition-colors">Risk Warning</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;