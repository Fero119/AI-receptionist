import React, { useState } from 'react';
import { ArrowUpRight, Search, Bell, Sparkles, PhoneCall, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onOpenSignUp: () => void;
  onGoToClientDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemo,
  onOpenSignUp,
  onGoToClientDashboard
}) => {
  const [activeChartRange, setActiveChartRange] = useState<'12m' | '30d' | '1w'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4);

  // Chart data points based on selected range
  const chartDatasets = {
    '1w': [
      { label: 'Mon', value: 24, emergencies: 6 },
      { label: 'Tue', value: 38, emergencies: 11 },
      { label: 'Wed', value: 29, emergencies: 8 },
      { label: 'Thu', value: 45, emergencies: 14 },
      { label: 'Fri', value: 52, emergencies: 18 },
      { label: 'Sat', value: 68, emergencies: 22 },
      { label: 'Sun', value: 62, emergencies: 19 }
    ],
    '30d': [
      { label: '24 Aug', value: 140, emergencies: 32 },
      { label: '31 Aug', value: 210, emergencies: 45 },
      { label: '7 Sept', value: 318, emergencies: 74 },
      { label: '14 Sept', value: 260, emergencies: 58 },
      { label: '21 Sept', value: 295, emergencies: 63 },
      { label: '28 Sept', value: 340, emergencies: 81 }
    ],
    '12m': [
      { label: 'Q1', value: 680, emergencies: 140 },
      { label: 'Q2', value: 890, emergencies: 210 },
      { label: 'Q3', value: 1240, emergencies: 318 },
      { label: 'Q4', value: 1490, emergencies: 390 }
    ]
  };

  const currentData = chartDatasets[activeChartRange];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Cosmic Starfield & Spotlight Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top ambient violet/blue glow cone */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[750px] hero-god-rays opacity-90 blur-2xl"></div>
        
        {/* Subtle diagonal light streaks */}
        <div className="absolute top-1/4 left-[-10%] w-[600px] h-[300px] bg-blue-600/10 -rotate-12 blur-3xl"></div>
        <div className="absolute top-1/3 right-[-10%] w-[600px] h-[300px] bg-indigo-600/10 rotate-12 blur-3xl"></div>

        {/* Scattered celestial particle dots */}
        <div className="absolute top-28 left-[15%] w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60 animate-particle-1"></div>
        <div className="absolute top-44 right-[20%] w-2 h-2 rounded-full bg-cyan-200 opacity-70 animate-particle-2"></div>
        <div className="absolute top-64 left-[30%] w-1 h-1 rounded-full bg-indigo-300 opacity-50 animate-particle-3"></div>
        <div className="absolute top-80 right-[35%] w-1.5 h-1.5 rounded-full bg-blue-400 opacity-80 animate-particle-1"></div>
        <div className="absolute top-96 left-[18%] w-2 h-2 rounded-full bg-white opacity-40 animate-particle-2"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Headline Block matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              Never miss a lead
            </span>{' '}
            while you're on the job
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            The bilingual AI receptionist for US contractors. It answers instantly, triages emergencies, and books estimates directly into your calendar 24/7.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="btn-glow-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white tracking-wide shadow-xl flex items-center gap-2 cursor-pointer group"
            >
              <span>Book a demo</span>
              <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={onOpenSignUp}
              className="px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-slate-500 backdrop-blur-md transition-all shadow-lg cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>

        {/* Hero Interactive Dashboard Mockup - Exact reproduction from Image 1 */}
        <div className="relative mx-auto max-w-5xl rounded-3xl p-1 bg-gradient-to-b from-blue-500/25 via-white/10 to-transparent shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-[22px] bg-[#090d1a]/95 border border-white/10 backdrop-blur-xl p-5 sm:p-7 overflow-hidden text-slate-100">
            {/* Top Bar of the Mockup */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                    R
                  </div>
                  <span className="font-display font-semibold text-sm tracking-tight text-white">
                    Resq.io
                  </span>
                </div>

                {/* Submenu Pills */}
                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/5 text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">Overview</span>
                  <span className="px-2.5 py-1 hover:text-slate-200 transition-colors">Incidents</span>
                  <span className="px-2.5 py-1 hover:text-slate-200 transition-colors">Metrics</span>
                  <span className="px-2.5 py-1 hover:text-slate-200 transition-colors">History</span>
                  <span className="px-2.5 py-1 hover:text-slate-200 transition-colors">Teams</span>
                </div>
              </div>

              {/* Right Mockup Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <button type="button" aria-label="Search" className="p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Search className="w-4 h-4" />
                  </button>
                  <button type="button" aria-label="Notifications" className="relative p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500"></span>
                  </button>
                </div>

                <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center text-amber-200 text-xs font-bold">
                      C
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Greeting & Status Pill Track */}
            <div className="pt-6 pb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Welcome in, <span className="text-slate-300 font-semibold">Caroline</span>
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                  {/* Status Progress Pills from screenshot */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300">
                    <span className="text-slate-400">On-call shifts</span>
                    <span className="font-semibold text-pink-400">20%</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-200">
                    <span className="text-slate-400">Status pages</span>
                    <span className="font-semibold text-white">25%</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    <span className="text-slate-400">Alerts used</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400">
                    <span className="text-slate-400">Reports</span>
                    <span className="font-semibold">15%</span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Pills with circular badges from screenshot */}
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                    +12%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white tracking-tight tabular-nums">38</div>
                    <div className="text-[11px] text-slate-400">Critical issues</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                    +26%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white tracking-tight tabular-nums">26</div>
                    <div className="text-[11px] text-slate-400">Days spent</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] text-rose-400 font-bold">
                    -64%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white tracking-tight tabular-nums">103</div>
                    <div className="text-[11px] text-slate-400">Overnight work</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Interactive Grid matching Image 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              {/* Summary Stats Left Column */}
              <div className="lg:col-span-3 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Summary
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span>Triage</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-white">1234</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Fixing</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-white">0</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                        <span>Investigating</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-white">24</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-500">
                  Incidents frequency spiked in September, show higher system pressure
                </div>
              </div>

              {/* Main Spline Graph Center Column */}
              <div className="lg:col-span-6 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-300">
                    Incident frequency
                  </span>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5 border border-white/5 text-xs">
                    <button
                      onClick={() => setActiveChartRange('12m')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeChartRange === '12m' ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      12 months
                    </button>
                    <button
                      onClick={() => setActiveChartRange('30d')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeChartRange === '30d' ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      30 days
                    </button>
                    <button
                      onClick={() => setActiveChartRange('1w')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeChartRange === '1w' ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      1 week
                    </button>
                  </div>
                </div>

                {/* SVG Spline Curve Visualization */}
                <div className="relative h-44 w-full flex flex-col justify-end">
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-slate-500 font-mono">
                    <div className="border-b border-dashed border-slate-700 pb-0.5">400</div>
                    <div className="border-b border-dashed border-slate-700 pb-0.5">300</div>
                    <div className="border-b border-dashed border-slate-700 pb-0.5">200</div>
                    <div className="border-b border-dashed border-slate-700 pb-0.5">100</div>
                  </div>

                  {/* SVG Curves */}
                  <svg className="w-full h-36 overflow-visible" viewBox="0 0 500 140" fill="none">
                    {/* Pink accent spline */}
                    <path
                      d="M 10 110 C 80 40, 140 130, 210 50 C 270 -10, 340 120, 420 70 C 460 45, 480 30, 490 25"
                      stroke="#ec4899"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Blue primary spline */}
                    <path
                      d="M 10 95 C 90 90, 150 20, 220 75 C 290 120, 360 40, 430 85 C 470 100, 485 90, 490 85"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Highlight Tooltip at index 2 (7 September) */}
                    <g transform="translate(210, 50)">
                      <circle r="5" fill="#3b82f6" className="animate-ping" opacity="0.75" />
                      <circle r="4" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
                      
                      {/* Tooltip bubble from screenshot */}
                      <g transform="translate(-45, -42)">
                        <rect width="90" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                        <text x="45" y="14" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">7 September</text>
                        <text x="45" y="27" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">318 incidents</text>
                      </g>
                    </g>
                  </svg>

                  {/* X Axis labels */}
                  <div className="flex justify-between pt-2 text-[10px] text-slate-500 font-medium">
                    {currentData.map((d, i) => (
                      <span key={i}>{d.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Vulnerability / Dispatch Card from Image 1 */}
              <div className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 p-4 text-white flex flex-col justify-between shadow-xl shadow-blue-900/30">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold tracking-wide">
                      Vulnerability
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed font-light mb-4">
                    Encryption ensures supplier data remains consistently secure from breaches
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/10 backdrop-blur-md">
                      <span className="text-xs text-blue-100">Priority</span>
                      <span className="w-5 h-5 rounded-full bg-white text-blue-700 text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/10 backdrop-blur-md">
                      <span className="text-xs text-blue-100">Thread</span>
                      <span className="w-5 h-5 rounded-full bg-white text-blue-700 text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGoToClientDashboard}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Open Full Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
