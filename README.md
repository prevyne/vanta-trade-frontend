# Vanta Trade - Prop-Trading Platform Frontend

A high-performance, institutional-grade frontend web application built for **Vanta Trade**, a modern proprietary trading firm. The platform features a dark-themed, glassmorphic UI, real-time market data integration, a secure client dashboard, and seamless payment/authentication flows.

## TECH STACK

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-variable driven, no config file needed)
- **Routing:** [React Router v6](https://reactrouter.com/) (with Protected Routes)
- **Authentication & Database:** [Firebase](https://firebase.google.com/) (Auth + Firestore)
- **Payments:** [Paystack](https://paystack.com/) (`react-paystack` integration)
- **Icons & Widgets:** [Lucide React](https://lucide.dev/), [react-ts-tradingview-widgets](https://www.npmjs.com/package/react-ts-tradingview-widgets)

---

## PROJECT ARCHITECTURE AND FEATURES

The application is split into two distinct layout paradigms: the **Public Storefront** and the **Secure Dashboard**.

### 1. Public Storefront (`/`)
- **Landing Page:** High-conversion hero section, TradingView ticker tape, and interactive feature grids.
- **Investment Plans:** Dynamic pricing cards integrated directly with the Paystack checkout modal.
- **Navigation:** Smart navbar that detects Firebase Auth state (swaps "Login" to "Go to Dashboard").

### 2. Authentication (`/login`, `/register`)
- **Firebase Auth:** Full Email/Password and Google OAuth popup integration.
- **Firestore Provisioning:** Automatically creates user documents in the database upon registration.
- **Error Handling:** Clean, user-friendly UI alerts for invalid credentials or existing accounts.

### 3. Secure Dashboard (`/dashboard/*`)
Protected behind a higher-order component that verifies the Firebase session before rendering.
- **Overview:** Real-time balance, equity, and drawdown tracking against profit targets.
- **Active Challenge:** Deep-dive analytics featuring a custom SVG equity curve chart and trade history table.
- **Payouts:** A simulated real-time withdrawal portal (prepped for backend Webhooks) to manage profit splits via Crypto or Bank Wire.
- **Settings:** Tabbed interface for managing Profile/KYC details, 2FA Security, and Notification preferences.

---

## DIRECTORY STRUCTURE

```text
vanta_frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── PaystackCheckout.jsx    # Reusable payment modal component
│   ├── config/
│   │   └── firebase.js                 # Firebase initialization & exports
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx               # Firebase sign-in
│   │   │   └── Register.jsx            # Firebase sign-up & Firestore insert
│   │   ├── dashboard/
│   │   │   ├── ActiveChallenge.jsx     # Analytics & SVG Chart
│   │   │   ├── Dashboard.jsx           # Secure layout wrapper & Sidebar
│   │   │   ├── Overview.jsx            # Core metrics & progress bars
│   │   │   ├── Payouts.jsx             # Withdrawal requests
│   │   │   └── Settings.jsx            # User profile & security
│   │   └── public/
│   │       └── Landing.jsx             # Main marketing page
│   ├── App.jsx                         # Main Router & Layout logic
│   ├── index.css                       # Tailwind v4 variables & custom utilities
│   └── main.jsx                        # React root execution
├── .env                                # Local environment secrets (ignored by Git)
├── vite.config.js                      # Vite & Tailwind plugin config
└── package.json
 
 # GETTING STARTED
1. Prerequisites
Ensure you have Node.js (v18+) installed on your machine.

2. Installation
Clone the repository and install the dependencies. Note: The --legacy-peer-deps flag is required due to react-paystack peer-dependency mismatches with React 19.

Bash
git clone <repository-url>
cd vanta_frontend
npm install --legacy-peer-deps
3. Environment Variables
Create a .env file in the root directory and add your specific API keys. Never commit this file to version control.

Code snippet
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_key_here
4. Running the Development Server
Start the Vite hot-reloading server:

Bash
npm run dev
Open your browser and navigate to http://localhost:5173.

# NOTES FOR BACKEND INTEGRATION
Payments: The Paystack frontend implementation securely handles the UI popup, but successful payments must be verified on the backend via Webhooks before provisioning a trading account.

Real-Time Payouts: The /dashboard/payouts view currently uses a simulated setTimeout to mimic a status change. When integrating a backend (e.g., Express/Node.js), replace this with a WebSocket or Server-Sent Events (SSE) listener.