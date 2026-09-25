import React, { useState } from 'react';
import { BarChart3, FileText, ArrowDown, GitFork, Sparkles } from 'lucide-react';

export const FoundationCards: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: 'insights',
      title: 'Call Analytics',
      description: 'Track exactly how many missed calls were recovered into booked jobs.',
      icon: BarChart3,
      isSpecial: false,
      rotation: '-rotate-2',
      badgeGradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'catalog',
      title: 'Transcripts',
      description: 'Access the full audio and transcript of every customer interaction instantly.',
      icon: FileText,
      isSpecial: false,
      rotation: 'rotate-2',
      badgeGradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'integrations',
      title: 'CRM Integrations',
      description: 'Syncs directly with ServiceTitan, Jobber, Housecall Pro, and Google Calendar.',
      icon: ArrowDown,
      isSpecial: true,
      rotation: '-rotate-1',
      badgeGradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'workflows',
      title: 'Automated Dispatch',
      description: 'Routes emergency plumbing or HVAC calls directly to your on-call tech.',
      icon: GitFork,
      isSpecial: false,
      rotation: 'rotate-1',
      badgeGradient: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'ai',
      title: 'Conversational AI',
      description: 'Voices that sound human, speak Spanish, and know your pricing model.',
      icon: Sparkles,
      isSpecial: false,
      rotation: '-rotate-2',
      badgeGradient: 'from-purple-500 to-blue-500'
    }
  ];

  return (
    <section id="foundation" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Starfield and Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-indigo-900/10 blur-[140px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Title matching Images 5 & 6 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Built on a solid foundation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Architected for zero latency, carrier-grade telephony, and bulletproof reliability when every second counts.
          </p>
        </div>

        {/* 5 Staggered Tilted Cards Layout from Images 5 & 6 */}
        <div className="flex flex-col items-center gap-6">
          {/* Top Row: 2 Cards (Insights & Catalog) */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-3xl">
            {cards.slice(0, 2).map((c) => {
              const Icon = c.icon;
              const isHovered = hoveredCard === c.id;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setHoveredCard(c.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`w-full sm:w-80 rounded-3xl p-7 transition-all duration-300 cursor-pointer ${
                    c.rotation
                  } ${
                    isHovered ? 'scale-105 -translate-y-2' : ''
                  } bg-[#0b1024] hover:bg-[#111936] border border-white/10 shadow-2xl shadow-black/80 flex flex-col items-center text-center`}
                >
                  {/* Glossy 3D icon badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${c.badgeGradient} p-1 shadow-lg shadow-blue-500/30 mb-5 relative group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full rounded-[14px] bg-[#121c3d] flex items-center justify-center text-white border border-white/20">
                      <Icon className="w-7 h-7 text-blue-300" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {c.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 3 Cards (Integrations [Blue Highlight], Workflows, AI) */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
            {cards.slice(2, 5).map((c) => {
              const Icon = c.icon;
              const isHovered = hoveredCard === c.id;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setHoveredCard(c.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`w-full sm:w-72 rounded-3xl p-7 transition-all duration-300 cursor-pointer ${
                    c.rotation
                  } ${
                    isHovered ? 'scale-105 -translate-y-2' : ''
                  } ${
                    c.isSpecial
                      ? 'bg-blue-600 text-white shadow-[0_0_40px_rgba(37,99,235,0.6)] border border-blue-400'
                      : 'bg-[#0b1024] hover:bg-[#111936] border border-white/10 text-white shadow-2xl shadow-black/80'
                  } flex flex-col items-center text-center`}
                >
                  {/* Glossy 3D icon badge */}
                  <div className={`w-16 h-16 rounded-2xl ${
                    c.isSpecial ? 'bg-white/20 border border-white/30' : `bg-gradient-to-tr ${c.badgeGradient}`
                  } p-1 shadow-lg mb-5`}>
                    <div className={`w-full h-full rounded-[14px] ${
                      c.isSpecial ? 'bg-blue-700' : 'bg-[#121c3d]'
                    } flex items-center justify-center text-white border border-white/20`}>
                      <Icon className={`w-7 h-7 ${c.isSpecial ? 'text-white' : 'text-blue-300'}`} />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2">
                    {c.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                    c.isSpecial ? 'text-blue-50' : 'text-slate-300'
                  }`}>
                    {c.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
