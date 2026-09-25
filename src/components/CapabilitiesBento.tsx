import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';

interface CapabilitiesBentoProps {
  onGoToClientDashboard: () => void;
}

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({
  onGoToClientDashboard
}) => {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/10 blur-[130px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Title matching Image 4 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            All-in-one platform capabilities
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Everything your trade business needs to operate 24/7 without hiring costly in-house dispatchers.
          </p>
        </div>

        {/* Bento Grid from Image 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Left: Glowing Electric Blue Card */}
          <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40 flex flex-col justify-between group">
            {/* Sparkle Particles from screenshot */}
            <div className="absolute top-10 right-8 w-2 h-2 rounded-full bg-white/70 animate-ping"></div>
            <div className="absolute bottom-16 right-16 w-1.5 h-1.5 rounded-full bg-cyan-200"></div>
            <div className="absolute top-1/2 right-10 w-1 h-1 rounded-full bg-white"></div>
            <div className="absolute bottom-8 right-28 w-2 h-2 rounded-full bg-blue-200/80"></div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4">
                Your world, <br />
                simplified in <br />
                one dashboard.
              </h3>

              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xs font-light">
                Gain full visibility across your inbound emergency calls, bookings, and revenue with real-time insights and effortless control.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={onGoToClientDashboard}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
              >
                <span>Explore Client Dashboard</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top Right: Tilted Perspective Mockup Card from Image 4 */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#090e1f] border border-white/10 relative overflow-hidden flex flex-col justify-center">
            {/* Stardust glow backdrop */}
            <div className="absolute top-4 right-10 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Mini Dashboard Window preview */}
            <div className="relative rounded-2xl bg-[#0d142b] border border-white/10 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="font-display font-semibold text-xs text-white">Resq.io Live Call Feed</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">● REAL-TIME DISPATCH</span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Denver Inbound Trunk #1</span>
                  <span className="font-mono text-white">Twilio SIP: +1 (303) 747-9201</span>
                </div>

                {/* Simulated Audio Waveform Bar */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <PhoneCall className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-white font-medium">Caller: Evelyn Parker (Burst Pipe)</span>
                      <span className="text-rose-400 font-bold uppercase text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20">
                        Emergency
                      </span>
                    </div>
                    {/* Sound Bars */}
                    <div className="flex items-center gap-1 h-3">
                      {[30, 70, 95, 45, 80, 100, 60, 40, 85, 90, 50, 75, 95, 60, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-blue-400 rounded-full"
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  &ldquo;Sarah (AI): I hear water running—do you know where your main shutoff valve is?&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Quick Issue Triage / Chat Card from Image 4 */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 bg-[#090e1f] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-lg text-white">
                  Quick issue triage
                </span>
                <span className="text-xs text-slate-400">Automated SMS Trigger</span>
              </div>

              {/* Chat bubbles from screenshot */}
              <div className="space-y-3 pt-2">
                {/* Message 1 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-slate-300 font-light mb-1.5">
                    &ldquo;The issue has been resolved. Service is back online - thank you.&rdquo;
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-400/20 text-[10px] text-amber-300 font-bold flex items-center justify-center">
                      N
                    </div>
                    <span className="text-[11px] text-slate-400">Nick Wilson · nickyyy@gmail.com</span>
                  </div>
                </div>

                {/* Message 2 with Investigating badge */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-semibold">
                      Investigating
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">INC-0000 · 7h 7m</span>
                  </div>
                  <div className="text-xs text-slate-300 font-light mb-1.5">
                    &ldquo;Looks like the system&apos;s a bit slow right now&rdquo;
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-400/20 text-[10px] text-purple-300 font-bold flex items-center justify-center">
                      E
                    </div>
                    <span className="text-[11px] text-slate-400">Elizabeth Belle · eliebelle@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 text-xs text-blue-400 font-medium">
              Zero dropped leads: Instant SMS follows up if a contractor is under a sink.
            </div>
          </div>

          {/* Bottom Right: AI SRE / AI Receptionist Card from Image 4 */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 bg-[#090e1f] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
                AI SRE fixes issues like your best engineer - automatically.
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                Detects problems, suggests fixes, and restores systems fast. For contractors, it detects burst pipes, advises homeowners on shutoff valves, dispatches on-call technicians, and confirms calendar appointments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilingual EN / ES</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Calendar Auto-Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
