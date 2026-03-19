import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface/30 border-t border-white/5 py-12 px-6 lg:px-12 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Disclaimer */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="font-bold text-2xl tracking-wider cursor-pointer hover:opacity-80 transition-opacity inline-block">
            VANTA<span className="text-primary">.</span>
          </Link>
          <p className="text-sm text-text-muted leading-relaxed pr-4">
            The Company does not provide services to citizens and/or residents of Iran, Myanmar, Pakistan, Syria, Yemen, Jordan, Afghanistan.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><a href="/#plans" className="hover:text-primary transition-colors">Investment Plans</a></li>
            <li><a href="/#rules" className="hover:text-primary transition-colors">Trading Rules</a></li>
            <li><a href="/#platform" className="hover:text-primary transition-colors">Trading Terminal</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><a href="/#why-vanta" className="hover:text-primary transition-colors">Why VANTA</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Contact Support</a></li>
            <li><a href="/#faq" className="hover:text-primary transition-colors">FAQs</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted gap-4">
        <p>&copy; {new Date().getFullYear()} Vanta Trade. All rights reserved.</p>
        <p>Risk Warning: Trading involves significant risk of loss.</p>
      </div>
    </footer>
  );
};

export default Footer;