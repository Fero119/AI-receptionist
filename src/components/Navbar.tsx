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

          {/* Role badge button with dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
              title="Switch between Landing Page, Client Dashboard, and Admin Dashboard"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">
                {currentRole === 'landing' ? 'Landing View' : currentRole === 'client' ? 'Client Dashboard' : 'Admin Console'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl glass-panel-glow py-1.5 z-50 shadow-2xl border border-blue-500/20">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Application View
                </div>
                <button
                  onClick={() => {
                    onSelectRole('landing');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                    currentRole === 'landing' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Public Landing Page</span>
                  </div>
                  {currentRole === 'landing' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>

                <button
                  onClick={() => {
                    onSelectRole('client');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                    currentRole === 'client' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Client Dashboard (Contractor)</span>
                  </div>
                  {currentRole === 'client' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>

                <button
                  onClick={() => {
                    onSelectRole('admin');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                    currentRole === 'admin' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Admin Dashboard (Agency Owner)</span>
                  </div>
                  {currentRole === 'admin' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              </div>
            )}
          </div>
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
                Contractor Log in
              </button>
              <button
                onClick={onOpenDemo}
                className="btn-glow-primary px-4 py-2 rounded-full text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-100" />
                <span>Book a demo</span>
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
