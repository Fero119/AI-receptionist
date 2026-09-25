import React from 'react';
import { Sparkles, PhoneCall } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemo: () => void;
  onOpenSignUp: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenDemo,
  onOpenSignUp
}) => {
  return (
    <section className="relative pt-32 pb-24 sm:pt-44 sm:pb-36 overflow-hidden">
      {/* Dramatic Upward Blue Spotlight God Rays from Images 7 & 8 */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end overflow-hidden">
        {/* Main Central Spotlight Cone beaming upward */}
        <div className="w-[800px] h-[550px] cosmic-spotlight blur-2xl opacity-90"></div>

        {/* Diagonal Light Rays beaming from bottom-center outward */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[650px] bg-gradient-to-t from-blue-500/35 via-blue-600/10 to-transparent blur-xl"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-gradient-to-t from-indigo-500/25 to-transparent blur-2xl"></div>

        {/* Floating Stardust and Sparkle Particles around button from screenshot */}
        <div className="absolute bottom-36 left-1/2 -translate-x-28 w-2 h-2 rounded-full bg-white opacity-80 animate-ping"></div>
        <div className="absolute bottom-28 left-1/2 translate-x-24 w-1.5 h-1.5 rounded-full bg-cyan-200 opacity-90 animate-particle-1"></div>
        <div className="absolute bottom-48 left-1/2 -translate-x-12 w-1 h-1 rounded-full bg-blue-200 opacity-70 animate-particle-2"></div>
        <div className="absolute bottom-32 left-1/2 translate-x-16 w-2 h-2 rounded-full bg-white opacity-90 animate-particle-3"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-44 w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60 animate-particle-1"></div>
        <div className="absolute bottom-24 left-1/2 translate-x-48 w-1 h-1 rounded-full bg-blue-400 opacity-70 animate-particle-2"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Brand tag from screenshot */}
        <div className="font-display text-lg font-bold text-white mb-3 tracking-tight">
          Resq<span className="text-blue-400">.io</span>
        </div>

        {/* Main Heading from Images 7 & 8 */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Book Your Demo Today
        </h2>

        {/* Subtitle from Images 7 & 8 */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Ready to streamline your incident management? <br />
          Schedule a call with our experts today
        </p>

        {/* Glowing Pill Button with Specular Shine from screenshot */}
        <div className="relative inline-block">
          {/* Specular particle halo directly under button */}
          <div className="absolute -inset-1 rounded-full bg-blue-400 opacity-50 blur-lg animate-pulse"></div>

          <button
            onClick={onOpenDemo}
            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base tracking-wide shadow-[0_0_40px_rgba(59,130,246,0.8),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-2.5 mx-auto border border-blue-300/40"
          >
            <span>Book a demo.</span>
            <Sparkles className="w-4 h-4 text-blue-100" />
          </button>
        </div>

        {/* Secondary client shortcut */}
        <div className="mt-8">
          <button
            onClick={onOpenSignUp}
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Are you a US contractor? Sign up in 60 seconds to open your client dashboard →
          </button>
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5 py-10 bg-[#04060d] text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6">
        {/* Left Links matching Images 7 & 8 */}
        <div className="flex items-center gap-6">
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#products" className="hover:text-white transition-colors">Products</a>
          <a href="#capabilities" className="hover:text-white transition-colors">Pricing</a>
        </div>

        {/* Center Copyright */}
        <div className="text-slate-500 text-[11px] font-mono">
          © 2026 Resq.io AI Voice Telephony Systems. All rights reserved.
        </div>

        {/* Right Links matching Images 7 & 8 */}
        <div className="flex items-center gap-6">
          <a href="#foundation" className="hover:text-white transition-colors">Careers</a>
          <a href="#foundation" className="hover:text-white transition-colors">Resources</a>
          <a href="#solutions" className="hover:text-white transition-colors">Privacy & Policy</a>
        </div>
      </div>
    </footer>
  );
};
