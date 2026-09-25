import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const TrustAndHangingSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>('All systems stable');

  const tags = [
    { id: 'tag-1', title: 'Proof or it\'s not real', detail: 'Audio recordings & transcripts logged instantly in Supabase' },
    { id: 'tag-2', title: 'All systems stable', detail: '99.98% carrier uptime with dual Twilio & Vapi fallback' },
    { id: 'tag-3', title: 'Perfect rhythm', detail: 'Sub-500ms voice response with natural conversational cadence' },
    { id: 'tag-4', title: 'Fix pushed', detail: 'Instant SMS dispatch sent to technician on call in <2s' },
    { id: 'tag-5', title: 'Incidents resolved', detail: 'Over 1,200 emergency calls captured and converted to revenue' },
  ];

  return (
    <section id="products" className="relative py-16 sm:py-24 overflow-hidden border-t border-b border-white/5">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-900/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo Ticker from Image 2 */}
        <div className="mb-20 sm:mb-28">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 mb-8 font-mono">
            Trusted by modern home service leaders & enterprise dispatchers
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 text-slate-400 font-bold opacity-80">
            {/* NETFLIX */}
            <div className="flex items-center gap-1.5 text-lg sm:text-xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors">
              <span className="text-rose-500">NETFLIX</span>
            </div>

            {/* Trace */}
            <div className="flex items-center gap-2 text-base sm:text-lg tracking-tight hover:text-white transition-colors">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center text-[10px]">
                🧭
              </div>
              <span className="font-semibold text-slate-200">Trace</span>
            </div>

            {/* Recharge */}
            <div className="flex items-center gap-1.5 text-base sm:text-lg tracking-tight hover:text-white transition-colors">
              <span className="font-mono text-blue-400 font-black">7</span>
              <span className="font-semibold text-slate-200">Recharge</span>
            </div>

            {/* Automation */}
            <div className="flex items-center gap-2 text-base sm:text-lg tracking-tight hover:text-white transition-colors">
              <div className="w-4 h-4 rounded-full border border-slate-400 border-t-blue-400 animate-spin"></div>
              <span className="font-semibold text-slate-200">Automation</span>
            </div>

            {/* Orbitc */}
            <div className="flex items-center gap-2 text-base sm:text-lg tracking-tight hover:text-white transition-colors">
              <div className="w-4 h-4 rotate-45 border-2 border-slate-300"></div>
              <span className="font-semibold text-slate-200">Orbitc</span>
            </div>
          </div>
        </div>

        {/* Hanging Tags Container from Image 2 */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-14 glass-panel border border-white/10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Text */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Issues arise <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
                  every day
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md pt-2">
                Issues arise every day. Outages and missed calls are inevitable, but with the right approach, chaos isn&apos;t.
              </p>

              <div className="pt-4 flex items-center gap-3 text-xs text-blue-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>Active status: 100% of emergency calls answered in &lt;1 ring</span>
              </div>
            </div>

            {/* Right Hanging Wires & Floating Tag Nodes from Image 2 */}
            <div className="lg:col-span-6 relative h-64 sm:h-72 w-full flex items-center justify-center">
              {/* Vertical string lines hanging from ceiling */}
              <div className="absolute inset-0 pointer-events-none">
                {/* String 1 */}
                <div className="absolute top-0 left-[22%] w-[1px] h-28 bg-gradient-to-b from-blue-400/40 via-blue-500/60 to-blue-400"></div>
                {/* String 2 */}
                <div className="absolute top-0 left-[45%] w-[1px] h-36 bg-gradient-to-b from-indigo-400/40 via-indigo-500/60 to-indigo-400"></div>
                {/* String 3 */}
                <div className="absolute top-0 left-[75%] w-[1px] h-20 bg-gradient-to-b from-cyan-400/40 via-blue-500/60 to-cyan-400"></div>
                {/* String 4 */}
                <div className="absolute top-0 left-[72%] w-[1px] h-48 bg-gradient-to-b from-blue-400/40 via-blue-500/60 to-blue-400"></div>
                {/* String 5 */}
                <div className="absolute top-0 left-[35%] w-[1px] h-52 bg-gradient-to-b from-blue-400/40 via-indigo-500/60 to-blue-400"></div>
              </div>

              {/* Tag 1: Proof or it's not real */}
              <div
                onMouseEnter={() => setActiveTag('Proof or it\'s not real')}
                className="absolute top-10 left-[16%] -translate-x-1/2 cursor-pointer z-10 transition-all duration-300 hover:scale-105"
              >
                <div className="relative px-3.5 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800/80 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-[11px] font-medium text-blue-100 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                  <span>Proof or it&apos;s not real</span>
                </div>
              </div>

              {/* Tag 2: All systems stable */}
              <div
                onMouseEnter={() => setActiveTag('All systems stable')}
                className="absolute top-28 left-[38%] -translate-x-1/2 cursor-pointer z-20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 border border-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.6)] text-xs font-semibold text-white flex items-center gap-2 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span>All systems stable</span>
                </div>
              </div>

              {/* Tag 3: Perfect rhythm */}
              <div
                onMouseEnter={() => setActiveTag('Perfect rhythm')}
                className="absolute top-16 right-[12%] cursor-pointer z-10 transition-all duration-300 hover:scale-105"
              >
                <div className="relative px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-blue-950 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-[11px] font-medium text-indigo-200 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>Perfect rhythm</span>
                </div>
              </div>

              {/* Tag 4: Fix pushed */}
              <div
                onMouseEnter={() => setActiveTag('Fix pushed')}
                className="absolute bottom-16 right-[18%] cursor-pointer z-10 transition-all duration-300 hover:scale-105"
              >
                <div className="relative px-3.5 py-1.5 rounded-lg bg-blue-950/90 hover:bg-blue-900 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-[11px] font-medium text-blue-200 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Fix pushed</span>
                </div>
              </div>

              {/* Tag 5: Incidents resolved */}
              <div
                onMouseEnter={() => setActiveTag('Incidents resolved')}
                className="absolute bottom-6 left-[25%] cursor-pointer z-10 transition-all duration-300 hover:scale-105"
              >
                <div className="relative px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] text-[11px] font-medium text-slate-200 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Incidents resolved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom active detail banner */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">Active Tag Insight:</span>
              <span className="text-slate-200">{tags.find(t => t.title === activeTag)?.detail}</span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">LIVE ENGINE STATUS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
