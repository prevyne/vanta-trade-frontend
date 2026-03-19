import React, { useState } from 'react';
import { 
  Wallet, ArrowDownToLine, ShieldCheck, 
  CreditCard, Zap, Lock
} from 'lucide-react';

// Import Context & Checkout Component
import { useAuth } from '../../context/AuthContext';
import PaystackCheckout from '../../components/ui/PaystackCheckout';

const Deposit = () => {
  const { currentUser, userData } = useAuth();
  
  // State for the deposit amount
  const [amount, setAmount] = useState(500); // Default to $500
  const [customAmount, setCustomAmount] = useState('');

  // Pre-set quick amounts
  const presetAmounts = [100, 500, 1000, 5000];

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(Number(val));
  };

  const currentBalance = userData?.accountSize || userData?.balance || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Fund Your Account</h1>
        <p className="text-text-muted">Add trading capital instantly via secure payment gateways.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Deposit Form */}
        <div className="lg:col-span-2 glass-panel p-6 lg:p-8 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Select Amount</h2>
              <p className="text-sm text-text-muted">Choose a quick amount or enter a custom value.</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-muted mb-1">Current Balance</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <Wallet size={18} className="text-primary" />
                ${currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`py-3 rounded-lg font-bold border transition-all ${
                  amount === preset && customAmount === ''
                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-surface/50 border-white/10 text-white hover:border-white/30'
                }`}
              >
                ${preset.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-text-muted mb-2">Custom Amount (USD)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-text-muted font-bold">$</span>
              </div>
              <input 
                type="number" 
                min="50"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="Enter amount (Min $50)"
                className="w-full bg-surface border border-white/10 rounded-lg pl-8 pr-4 py-4 focus:outline-none focus:border-primary text-white font-bold text-lg"
              />
            </div>
          </div>

          {/* Checkout Button */}
          <div className="pt-4 border-t border-white/5">
            <PaystackCheckout 
              amount={amount > 0 ? amount : 0} 
              email={currentUser?.email || "trader@vanta.com"} 
              planName="Vanta Account Deposit" 
              onSuccessCallback={(ref) => alert(`Deposit successful! Reference: ${ref.reference}. Note: In production, a backend webhook will update your balance.`)}
            />
            <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1.5">
              <Lock size={12} /> Payments are 256-bit encrypted and processed securely.
            </p>
          </div>
        </div>

        {/* Right Column: Info & Trust Badges */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-surface to-primary/5 border border-primary/10">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={18} className="text-primary" /> Instant Processing
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Deposits made via Paystack (Cards, Bank Transfers, USSD) are credited to your Vanta trading account instantly with zero fees.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-bold text-white mb-2">Supported Methods</h3>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-white/5">
              <CreditCard size={20} className="text-primary" />
              <div>
                <div className="text-sm font-bold text-white">Credit & Debit Cards</div>
                <div className="text-xs text-text-muted">Visa, Mastercard, Verve</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-white/5">
              <ArrowDownToLine size={20} className="text-success" />
              <div>
                <div className="text-sm font-bold text-white">Bank Transfers</div>
                <div className="text-xs text-text-muted">Direct wire & mobile money</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-white/5">
              <ShieldCheck size={20} className="text-white" />
              <div>
                <div className="text-sm font-bold text-white">Secure API</div>
                <div className="text-xs text-text-muted">PCI-DSS Compliant</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Deposit;