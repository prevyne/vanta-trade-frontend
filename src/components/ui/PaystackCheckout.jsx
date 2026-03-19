import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { ShieldCheck, Loader2 } from 'lucide-react';

const PaystackCheckout = ({ 
  amount, // Amount in standard currency (e.g., 500 for $500)
  email,  // User's email
  planName, // e.g., "100k Evaluation"
  onSuccessCallback 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Paystack requires the amount in the lowest denomination (e.g., kobo/cents). 
  // We multiply by 100 to convert standard currency to cents.
  const config = {
    reference: `VANTA_${new Date().getTime()}_${Math.floor(Math.random() * 1000000)}`,
    email: email || "trader@example.com", // Fallback for testing
    amount: amount * 100, 
    publicKey: 'publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY',
    currency: 'USD', // Change to NGN, KES, ZAR, or GHS depending on your core market
    metadata: {
      custom_fields: [
        {
          display_name: "Challenge Plan",
          variable_name: "challenge_plan",
          value: planName
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    setIsProcessing(false);
    console.log("Paystack Payment Complete! Reference:", reference);
    // Here you will eventually trigger your backend to create the trading account
    if (onSuccessCallback) onSuccessCallback(reference);
  };

  const onClose = () => {
    setIsProcessing(false);
    console.log("User closed the Paystack modal.");
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    initializePayment(onSuccess, onClose);
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={isProcessing}
      className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <><Loader2 className="animate-spin" size={20} /> Initializing Secure Checkout...</>
      ) : (
        <><ShieldCheck size={20} /> Pay ${amount.toLocaleString()} via Paystack</>
      )}
    </button>
  );
};

export default PaystackCheckout;