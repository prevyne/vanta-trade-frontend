# Vanta Trade - Prop-Trading Platform Frontend

A high-performance, institutional-grade frontend web application built for **Vanta Trade**, a modern proprietary trading firm. The platform features a dark-themed, glassmorphic UI, real-time market data integration, a secure client dashboard, and seamless payment/authentication flows.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-variable driven, no config file needed)
- **Routing:** [React Router v6](https://reactrouter.com/) (with Protected Routes)
- **State Management:** React Context API (Global Auth & Profile State)
- **Authentication & Database:** [Firebase](https://firebase.google.com/) (Auth + Firestore)
- **Payments:** [Paystack](https://paystack.com/) (`react-paystack` integration)
- **Icons & Widgets:** [Lucide React](https://lucide.dev/), [react-ts-tradingview-widgets](https://www.npmjs.com/package/react-ts-tradingview-widgets)

---

## 🏗️ Project Architecture & Features

The application is split into two distinct layout paradigms: the **Public Storefront** and the **Secure Dashboard**, bridged by a robust Global Auth Context.

### 1. Global Auth & Profile State
- **AuthContext:** A global state provider that listens to Firebase Auth changes, automatically fetches the logged-in user's Firestore profile data, and distributes it across the application.
- **Dynamic Routing:** Intercepts unauthorized users and seamlessly redirects authenticated users away from public auth forms.

### 2. Public Storefront (`/`)
- **Landing Page:** High-conversion hero section, TradingView ticker tape, and interactive feature grids.
- **Investment Plans:** Dynamic pricing cards integrated directly with the Paystack checkout modal.
- **Navigation:** Smart navbar that detects global Auth state (swaps "Login" to "Go to Dashboard") and features a mobile-responsive drawer.

### 3. Authentication (`/login`, `/register`)
- **Firebase Auth:** Full Email/Password and Google OAuth popup integration.
- **Firestore Provisioning:** Automatically creates user documents in the database upon registration (Name, Email, Role, Balance).

### 4. Secure Dashboard (`/dashboard/*`)
- **Overview & Header:** Dynamically renders user initials and account IDs based on Firestore profiles.
- **Trading Terminal:** Embedded real-time TradingView charting engine alongside a custom mock-order execution panel.
- **Performance Analytics:** Deep-dive journal featuring a custom SVG equity curve chart, win rate/profit factor tracking, and trade history table.
- **Deposit Funds (Pay-ins):** Secure portal for users to fund their live trading accounts instantly via Paystack.
- **Payouts (Withdrawals):** A simulated real-time withdrawal portal to manage profit splits.
- **Settings:** Dynamically populated profile forms displaying real user data and KYC verification status.

---

##  Getting Started
1. Prerequisites
Ensure you have Node.js (v18+) installed on your machine.

2. Installation
Clone the repository and install the dependencies. Note: The --legacy-peer-deps flag is required due to react-paystack and react-ts-tradingview-widgets peer-dependency mismatches with React 19.

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

## Folder Structure

```text
vanta_frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── PaystackCheckout.jsx    # Reusable payment modal component
│   ├── config/
│   │   └── firebase.js                 # Firebase initialization & exports
│   ├── context/
│   │   └── AuthContext.jsx             # Global user state & Firestore fetching
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx               # Firebase sign-in
│   │   │   └── Register.jsx            # Firebase sign-up & Firestore insert
│   │   ├── dashboard/
│   │   │   ├── Analytics.jsx           # Performance metrics & SVG Chart
│   │   │   ├── Dashboard.jsx           # Secure layout wrapper & Sidebar
│   │   │   ├── Deposit.jsx             # Account funding & Paystack integration
│   │   │   ├── Overview.jsx            # Core metrics & progress bars
│   │   │   ├── Payouts.jsx             # Withdrawal requests
│   │   │   ├── Settings.jsx            # Dynamic User profile & security
│   │   │   └── Terminal.jsx            # TradingView chart & execution UI
│   │   └── public/
│   │       └── Landing.jsx             # Main marketing page
│   ├── App.jsx                         # Main Router & Layout logic
│   ├── index.css                       # Tailwind v4 variables & custom utilities
│   └── main.jsx                        # React root execution & Context Provider
├── .env                                # Local environment secrets (ignored by Git)
├── vite.config.js                      # Vite & Tailwind plugin config
└── package.json