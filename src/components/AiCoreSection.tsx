import React, { useState } from 'react';
import { Cpu, PhoneForwarded, Users, Sparkles, MessageSquareText } from 'lucide-react';

export const AiCoreSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    {
      id: 0,
      title: 'Response',
      description: 'Manage incidents from start to finish',
      contractorNote: 'Immediate bilingual phone pickup in under 1 second',
      icon: PhoneForwarded
    },
    {
      id: 1,
      title: 'On-call',
      description: 'Bring the right experts together',
      contractorNote: 'Automatic SMS dispatch to on-duty technician with address & notes',
      icon: Users
    },
    {
      id: 2,
      title: 'AI SRE',
      description: 'Fix incidents faster with AI-powered support',
      contractorNote: 'Sub-500ms voice logic with ElevenLabs & OpenAI conversational triage',
      icon: Sparkles
    },
    {
      id: 3,
      title: 'Status Pages',
      description: 'Keep users informed in real time',
      contractorNote: 'Instant Google Calendar slot booking and customer SMS confirmations',
      icon: MessageSquareText
    }
  ];

  return (
    <section id="solutions" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Starfield and Radial Center Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-cyan-300 opacity-60 animate-particle-1"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-80 animate-particle-2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Title and Subtitle matching Image 3 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Unified incident platform
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From first alert to full resolution, equip your team with the tools to act fast, minimize disruptions, and keep customers informed.
          </p>
        </div>

        {/* 4 Cards and AI Processor Core from Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 4 Modular Cards in a 2x2 grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isSelected = activeModule === mod.id;
              return (
                <div
                  key={mod.id}
                  onMouseEnter={() => setActiveModule(mod.id)}
                  onMouseLeave={() => setActiveModule(null)}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/80 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-[1.02]'
                      : 'bg-[#0b1022]/80 hover:bg-[#101730]/90 border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-semibold text-base sm:text-lg text-white">
                      {mod.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {mod.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-blue-300/80 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{mod.contractorNote}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Glowing Circuit Traces & Sapphire AI Microchip Core from Image 3 */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px]">
            {/* Animated SVG Circuit Bus Connectors */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bus Line 1: Top-Left to AI chip */}
              <path
                d="M 50 80 H 160 C 190 80, 200 160, 240 170 H 270"
                stroke={activeModule === 0 ? '#60a5fa' : '#3b82f6'}
                strokeWidth={activeModule === 0 ? '3' : '2'}
                strokeOpacity={activeModule === 0 ? '0.9' : '0.4'}
                strokeDasharray="6 4"
              />
              {/* Bus Line 2: Top-Right to AI chip */}
              <path
                d="M 120 120 H 180 C 210 120, 220 170, 260 175 H 270"
                stroke={activeModule === 1 ? '#60a5fa' : '#3b82f6'}
                strokeWidth={activeModule === 1 ? '3' : '2'}
                strokeOpacity={activeModule === 1 ? '0.9' : '0.4'}
                strokeDasharray="6 4"
              />
              {/* Bus Line 3: Bottom-Left to AI chip */}
              <path
                d="M 50 280 H 160 C 190 280, 200 200, 240 190 H 270"
                stroke={activeModule === 2 ? '#60a5fa' : '#3b82f6'}
                strokeWidth={activeModule === 2 ? '3' : '2'}
                strokeOpacity={activeModule === 2 ? '0.9' : '0.4'}
                strokeDasharray="6 4"
              />
              {/* Bus Line 4: Bottom-Right to AI chip */}
              <path
                d="M 120 240 H 180 C 210 240, 220 190, 260 185 H 270"
                stroke={activeModule === 3 ? '#60a5fa' : '#3b82f6'}
                strokeWidth={activeModule === 3 ? '3' : '2'}
                strokeOpacity={activeModule === 3 ? '0.9' : '0.4'}
                strokeDasharray="6 4"
              />

              {/* Glowing Junction Dots */}
              <circle cx="270" cy="170" r="3" fill="#60a5fa" className="animate-ping" />
              <circle cx="270" cy="190" r="3" fill="#60a5fa" className="animate-ping" />

              {/* Lateral Pin Connectors on Right Side */}
              <path d="M 410 140 H 460" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <path d="M 410 160 H 475" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <path d="M 410 180 H 490" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <path d="M 410 200 H 475" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <path d="M 410 220 H 460" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />

              {/* Pin Junction Terminal Dots */}
              <circle cx="460" cy="140" r="3" fill="#38bdf8" />
              <circle cx="475" cy="160" r="3" fill="#38bdf8" />
              <circle cx="490" cy="180" r="3" fill="#38bdf8" />
              <circle cx="475" cy="200" r="3" fill="#38bdf8" />
              <circle cx="460" cy="220" r="3" fill="#38bdf8" />
            </svg>

            {/* Glowing Sapphire Chip Processor matching Image 3 */}
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 p-1 shadow-[0_0_70px_rgba(59,130,246,0.65)] animate-float-slow">
              <div className="w-full h-full rounded-[22px] bg-gradient-to-tr from-[#142354] via-[#2242a3] to-[#406cee] p-5 flex flex-col items-center justify-center relative overflow-hidden border border-white/20">
                {/* Specular Inner Glare */}
                <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-white/30 blur-xl pointer-events-none"></div>

                {/* Stardust Sparkles on Chip from Image 3 */}
                <div className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                <div className="absolute top-5 right-7 w-1 h-1 rounded-full bg-cyan-200"></div>

                {/* AI Monogram */}
                <span className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  AI
                </span>

                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-blue-200 font-semibold">
                    Core Neural
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
