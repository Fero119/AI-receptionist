import React, { useState } from 'react';
import { UserRole } from '../types';
import { PhoneCall, Shield, Briefcase, Sparkles, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenSignUp: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenSignUp,
  onOpenDemo
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl glass-nav rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl shadow-black/60 transition-all duration-300">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectRole('landing')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#070b18] flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm tracking-tighter">R</span>
              </div>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
              Resq<span className="text-blue-400">.io</span>
            </span>
          </button>

          {/* Role switcher removed for production */}
        </div>

        {/* Navigation links matching Resq.io layout */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#solutions"
            onClick={(e) => {
              if (currentRole !== 'landing') {
                e.preventDefault();
                onSelectRole('landing');
              }
            }}
            className="hover:text-white transition-colors"
          >
            Solutions
          </a>
          <a
            href="#products"
            onClick={(e) => {
              if (currentRole !== 'landing') {
                e.preventDefault();
                onSelectRole('landing');
              }
            }}
            className="hover:text-white transition-colors"
          >
            Products
          </a>
          <a
            href="#capabilities"
            onClick={(e) => {
              if (currentRole !== 'landing') {
                e.preventDefault();
                onSelectRole('landing');
              }
            }}
            className="hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#foundation"
            onClick={(e) => {
              if (currentRole !== 'landing') {
                e.preventDefault();
                onSelectRole('landing');
              }
            }}
            className="hover:text-white transition-colors"
          >
            Resources
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {currentRole === 'landing' ? (
            <>
              <button
                onClick={onOpenSignUp}
                className="hidden sm:inline-block text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={onOpenSignUp}
                className="hidden sm:inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Sign up
              </button>
              <button
                onClick={onOpenDemo}
                className="btn-glow-primary px-4 py-1.5 rounded-full text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <Sparkles className="w-3 h-3 text-blue-100" />
                <span>Try Demo</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onSelectRole('landing')}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              Exit to Landing
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
