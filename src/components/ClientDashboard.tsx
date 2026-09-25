import React, { useState, useEffect, useRef } from 'react';
import { ClientContractor, CallRecord, AppointmentSlot } from '../types';
import {
  PhoneCall,
  PhoneOff,
  ShieldAlert,
  Calendar,
  DollarSign,
  Clock,
  Play,
  Pause,
  Send,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  User,
  Sliders,
  Volume2,
  RefreshCw,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface ClientDashboardProps {
  clients: ClientContractor[];
  calls: CallRecord[];
  activeClientId: string;
  onSelectClient: (clientId: string) => void;
  onAddNewCall: (newCall: CallRecord) => void;
  onUpdateClientSettings: (updatedClient: ClientContractor) => void;
  initialTab?: 'overview' | 'simulator' | 'calls' | 'calendar' | 'settings';
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  clients,
  calls,
  activeClientId,
  onSelectClient,
  onAddNewCall,
  onUpdateClientSettings,
  initialTab = 'overview'
}) => {
  const currentClient = clients.find(c => c.id === activeClientId) || clients[0];
  const clientCalls = calls.filter(c => c.contractorId === currentClient.id);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'calls' | 'calendar' | 'settings'>(initialTab);

  // Call detail drawer
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(clientCalls[0] || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Simulator state
  const [isSimulatingCall, setIsSimulatingCall] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simScenario, setSimScenario] = useState<'burst_pipe' | 'spanish_leak' | 'ac_tuneup'>('burst_pipe');
  const [simTranscript, setSimTranscript] = useState<{ speaker: 'caller' | 'ai' | 'system'; text: string; time: string }[]>([]);
  const [simStatus, setSimStatus] = useState<string>('Ready to test');
  const [voiceAudioActive, setVoiceAudioActive] = useState(true);

  // Filter state for calls
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'emergency' | 'routine'>('all');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(currentClient);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setSettingsForm(currentClient);
  }, [currentClient]);

  // Audio waveform animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Helper to trigger speech synthesis if available
  const speakText = (text: string, lang = 'en-US') => {
    if (!voiceAudioActive || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synth limitations
    }
  };

  // Run live call simulation script
  const startSimulation = (scenarioKey: 'burst_pipe' | 'spanish_leak' | 'ac_tuneup') => {
    setSimScenario(scenarioKey);
    setIsSimulatingCall(true);
    setSimTranscript([]);
    setSimStep(1);

    if (scenarioKey === 'burst_pipe') {
      setSimStatus('Incoming call connecting... Ring 1');
      setTimeout(() => {
        const text1 = `Thank you for calling ${currentClient.businessName} 24/7 hotline. This is Sarah, your virtual dispatcher. Are you experiencing a plumbing emergency?`;
        setSimTranscript(prev => [...prev, { speaker: 'ai', text: text1, time: '0:02' }]);
        speakText(text1, 'en-US');
        setSimStatus('AI Receptionist Answered (<0.5s)');
        setSimStep(2);

        setTimeout(() => {
          const text2 = 'Help! My basement is flooding right now, water is gushing out of the pipe near the water heater!';
          setSimTranscript(prev => [...prev, { speaker: 'caller', text: text2, time: '0:08' }]);
          setSimStep(3);

          setTimeout(() => {
            const text3 = 'Don\'t panic! First, please locate your main water shutoff valve near the water meter to stop the flow immediately. What is your address so I can dispatch our on-call tech?';
            setSimTranscript(prev => [...prev, { speaker: 'ai', text: text3, time: '0:15' }]);
            speakText(text3, 'en-US');
            setSimStatus('🚨 CRITICAL EMERGENCY DETECTED: Dispatched on-call technician');
            setSimStep(4);

            setTimeout(() => {
              const text4 = 'I am at 940 Colorado Blvd. I just turned the valve and water stopped!';
              setSimTranscript(prev => [...prev, { speaker: 'caller', text: text4, time: '0:26' }]);
              setSimStep(5);

              setTimeout(() => {
                const text5 = 'Emergency technician Marcus Vance has been notified via instant SMS. He is en route with an ETA of 30 minutes. You\'ll receive a confirmation text immediately.';
                setSimTranscript(prev => [...prev, { speaker: 'ai', text: text5, time: '0:34' }]);
                speakText(text5, 'en-US');
                setSimStatus('Call Completed · SMS Alert Dispatched · Job Logged');
                setSimStep(6);
                setIsSimulatingCall(false);

                // Add record to actual client calls
                const newRec: CallRecord = {
                  id: `call-sim-${Date.now()}`,
                  contractorId: currentClient.id,
                  callerName: 'Simulated Homeowner (Live Test)',
                  callerPhone: '+1 (303) 555-0919',
                  timestamp: 'Just now',
                  durationSeconds: 42,
                  language: 'en',
                  intent: 'emergency_leak',
                  intentLabel: 'CRITICAL EMERGENCY: Burst Pipe Flooding',
                  isEmergency: true,
                  summary: 'Live test simulation: Basement flooding at 940 Colorado Blvd. AI advised main shutoff and dispatched technician.',
                  estimatedValue: 2800,
                  transcript: [
                    { speaker: 'ai', text: text1, time: '0:02' },
                    { speaker: 'caller', text: text2, time: '0:08' },
                    { speaker: 'ai', text: text3, time: '0:15' },
                    { speaker: 'caller', text: text4, time: '0:26' },
                    { speaker: 'ai', text: text5, time: '0:34' }
                  ],
                  appointmentBooked: {
                    date: 'Today',
                    time: 'ASAP Emergency',
                    service: 'Burst Pipe Emergency Dispatch',
                    customerName: 'Live Test Homeowner',
                    customerPhone: '+1 (303) 555-0919',
                    address: '940 Colorado Blvd, Denver, CO',
                    status: 'confirmed'
                  },
                  smsDispatched: {
                    recipientPhone: currentClient.emergencyTechPhone,
                    recipientName: 'On-Call Technician',
                    message: `🚨 URGENT EMERGENCY: Homeowner at 940 Colorado Blvd has flooding. Shutoff handled. ETA requested <35m.`,
                    sentAt: 'Just now',
                    status: 'delivered'
                  }
                };
                onAddNewCall(newRec);
                setSelectedCall(newRec);
              }, 3000);
            }, 2500);
          }, 3000);
        }, 2500);
      }, 1500);
    } else if (scenarioKey === 'spanish_leak') {
      setSimStatus('Conectando llamada entrante en español...');
      setTimeout(() => {
        const text1 = `Gracias por comunicarse con ${currentClient.businessName}. Habla Sarah, su recepcionista virtual. ¿En qué le podemos asistir hoy?`;
        setSimTranscript(prev => [...prev, { speaker: 'ai', text: text1, time: '0:02' }]);
        speakText(text1, 'es-ES');
        setSimStatus('Detección de idioma: Español Bilingüe Activo');

        setTimeout(() => {
          const text2 = 'Hola buenas tardes, tengo una fuga de agua fuerte debajo del fregadero y necesito un plomero urgente.';
          setSimTranscript(prev => [...prev, { speaker: 'caller', text: text2, time: '0:09' }]);

          setTimeout(() => {
            const text3 = 'Comprendo perfectamente. Para proteger su hogar, cierre la llave de paso bajo el fregadero. ¿Cuál es su dirección para enviarle a nuestro técnico de guardia?';
            setSimTranscript(prev => [...prev, { speaker: 'ai', text: text3, time: '0:18' }]);
            speakText(text3, 'es-ES');
            setSimStatus('Triage de emergencia bilingüe completado');
            setIsSimulatingCall(false);
          }, 2500);
        }, 2200);
      }, 1500);
    } else {
      setSimStatus('Routine estimate simulation...');
      setTimeout(() => {
        const text1 = `Hello and thank you for calling ${currentClient.businessName}. This is Sarah. How can I help your home today?`;
        setSimTranscript(prev => [...prev, { speaker: 'ai', text: text1, time: '0:02' }]);
        speakText(text1, 'en-US');

        setTimeout(() => {
          const text2 = 'Hi, I would like to schedule an annual maintenance check and estimate for our heating system.';
          setSimTranscript(prev => [...prev, { speaker: 'caller', text: text2, time: '0:08' }]);

          setTimeout(() => {
            const text3 = 'We have certified technician availability this Wednesday at 10:00 AM or Thursday at 2:00 PM. Which works best for you?';
            setSimTranscript(prev => [...prev, { speaker: 'ai', text: text3, time: '0:16' }]);
            speakText(text3, 'en-US');
            setSimStatus('Routine appointment offered · Calendar slot available');
            setIsSimulatingCall(false);
          }, 2500);
        }, 2000);
      }, 1500);
    }
  };

  // Filtered calls list
  const filteredCalls = clientCalls.filter(call => {
    const matchesSearch =
      call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.callerPhone.includes(searchQuery);

    if (filterType === 'emergency') return matchesSearch && call.isEmergency;
    if (filterType === 'routine') return matchesSearch && !call.isEmergency;
    return matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Client Top Header Banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 mb-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Virtual Receptionist Online · 24/7 Dispatch Active
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {currentClient.businessName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
              <span className="text-blue-400 font-mono font-medium">
                Twilio Line: {currentClient.twilioNumber}
              </span>
              <span>·</span>
              <span>Trade: {currentClient.trade}</span>
              <span>·</span>
              <span>Market: {currentClient.city}, {currentClient.state}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                {currentClient.plan} Plan
              </span>
            </div>
          </div>

          {/* Quick Client Switcher (for testing multiple contractor trades) */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400 text-right hidden sm:block">
              Switch Contractor:
            </div>
            <select
              value={activeClientId}
              onChange={(e) => onSelectClient(e.target.value)}
              className="bg-slate-900 border border-white/15 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.businessName} ({c.trade})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Overview & Metrics
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>Live Voice Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('calls')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'calls'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Call Logs & Transcripts ({clientCalls.length})
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Booked Appointments
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Receptionist Settings
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top 4 Impact KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Calls */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3 text-xs">
                <span>Inbound Calls Handled</span>
                <PhoneCall className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                {currentClient.totalCalls}
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span>+18% from last month</span>
                <span className="text-slate-500">· 0 missed calls</span>
              </div>
            </div>

            {/* Appointments Booked */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3 text-xs">
                <span>Appointments Booked</span>
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                {currentClient.bookedJobs}
              </div>
              <div className="text-[11px] text-indigo-300 font-medium">
                <span>29.5% conversion rate to calendar</span>
              </div>
            </div>

            {/* Emergencies Triaged */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-rose-500/20 shadow-xl shadow-rose-950/20">
              <div className="flex items-center justify-between text-slate-400 mb-3 text-xs">
                <span>Emergencies Triaged</span>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-bold text-rose-300 tracking-tight tabular-nums mb-1">
                {currentClient.emergenciesTriaged}
              </div>
              <div className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                <span>100% immediate SMS dispatched</span>
              </div>
            </div>

            {/* Revenue Captured */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-900/60 to-blue-950/80 border border-blue-500/30 shadow-xl">
              <div className="flex items-center justify-between text-blue-200 mb-3 text-xs">
                <span>Captured Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                ${currentClient.revenueCaptured.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                <span>59x ROI on monthly retainer</span>
              </div>
            </div>
          </div>

          {/* Live System Performance & Inbound Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-2xl p-6 bg-[#090e1f] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">
                    Emergency Triage & Call Breakdown
                  </h3>
                  <p className="text-xs text-slate-400">
                    Caller intents auto-classified by ElevenLabs & OpenAI voice model
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('simulator')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Test My Receptionist</span>
                </button>
              </div>

              {/* Progress categories */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Critical Emergency Calls (Burst Pipes, Severe Leaks)</span>
                    <span className="text-rose-400 font-mono font-bold">38% (121 calls)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Routine Estimates & Consultations</span>
                    <span className="text-blue-400 font-mono font-bold">44% (140 calls)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '44%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Bilingual Spanish Inquiries</span>
                    <span className="text-amber-400 font-mono font-bold">18% (57 calls)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>

              {/* Call Activity Preview Table */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Latest Inbound Calls
                  </span>
                  <button
                    onClick={() => setActiveTab('calls')}
                    className="text-xs text-blue-400 hover:text-blue-300 underline"
                  >
                    View all calls ({clientCalls.length})
                  </button>
                </div>

                <div className="space-y-2.5">
                  {clientCalls.slice(0, 3).map(call => (
                    <div
                      key={call.id}
                      onClick={() => {
                        setSelectedCall(call);
                        setActiveTab('calls');
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          call.isEmergency ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {call.isEmergency ? '🚨' : '📞'}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{call.callerName}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-sm">{call.summary}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-mono font-semibold text-emerald-400">+${call.estimatedValue}</div>
                        <div className="text-[10px] text-slate-500">{call.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Telephony & SLA Health */}
            <div className="lg:col-span-4 rounded-2xl p-6 bg-[#090e1f] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-4">
                  Telephony SLA & Health
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Average Pickup Speed</span>
                    <span className="font-mono text-emerald-400 font-bold">0.42 seconds</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Voice AI Model</span>
                    <span className="font-mono text-blue-300 font-semibold">Vapi + ElevenLabs</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Google Calendar Sync</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Emergency SMS Fallback</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Armed & Active
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">On-Call Tech Phone</span>
                    <span className="font-mono text-slate-200">{currentClient.emergencyTechPhone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-[11px] text-slate-400 italic">
                  White-glove guarantee: All Twilio routing and custom prompts are managed directly by your Resq.io agency engineering team.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE VOICE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="rounded-3xl p-6 sm:p-8 bg-[#090e1f] border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive AI Voice Simulator</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Test Your Virtual Receptionist Live
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Experience what homeowners hear when calling your Twilio line. Watch real-time triage, audio generation, and automatic SMS technician dispatching.
              </p>
            </div>

            {/* Scenario Chooser */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <button
                onClick={() => startSimulation('burst_pipe')}
                disabled={isSimulatingCall}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  simScenario === 'burst_pipe'
                    ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/50'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-1">
                  🚨 Scenario 1
                </div>
                <div className="text-sm font-semibold mb-1">Burst Pipe Emergency</div>
                <div className="text-[11px] text-slate-400">English · Basement flooded · Immediate tech SMS dispatch</div>
              </button>

              <button
                onClick={() => startSimulation('spanish_leak')}
                disabled={isSimulatingCall}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  simScenario === 'spanish_leak'
                    ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-950/50'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                  🌐 Scenario 2
                </div>
                <div className="text-sm font-semibold mb-1">Bilingual Spanish Triage</div>
                <div className="text-[11px] text-slate-400">Spanish · Fuga de agua · Fluidez instantánea sin demora</div>
              </button>

              <button
                onClick={() => startSimulation('ac_tuneup')}
                disabled={isSimulatingCall}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  simScenario === 'ac_tuneup'
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-1">
                  📅 Scenario 3
                </div>
                <div className="text-sm font-semibold mb-1">Routine Estimate Booking</div>
                <div className="text-[11px] text-slate-400">English · Calendar slot selection · Customer confirmation</div>
              </button>
            </div>

            {/* Audio Voice Control toggle */}
            <div className="flex items-center justify-between mb-4 px-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Status: <strong className="text-slate-200">{simStatus}</strong></span>
              </div>
              <button
                onClick={() => setVoiceAudioActive(!voiceAudioActive)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  voiceAudioActive ? 'bg-blue-600/30 border-blue-500 text-blue-200' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Speech: {voiceAudioActive ? 'ON' : 'MUTE'}</span>
              </button>
            </div>

            {/* Call Interactive Screen */}
            <div className="rounded-2xl bg-black/60 border border-white/10 p-6 min-h-[300px] flex flex-col justify-between shadow-inner">
              {/* Dynamic Soundwave Bar when call is active */}
              {isSimulatingCall && (
                <div className="flex items-center justify-center gap-1.5 py-4 mb-4 border-b border-white/5">
                  <div className="text-xs text-blue-400 font-mono font-semibold mr-3">VOICE SYNTHESIS ACTIVE:</div>
                  {[40, 80, 100, 60, 90, 75, 45, 95, 85, 50, 70, 100, 60, 80, 40].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full animate-pulse"
                      style={{ height: `${h * 0.4}px`, animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Streaming Transcript */}
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {simTranscript.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Press one of the scenarios above to initiate a live simulated telephone call.
                  </div>
                ) : (
                  simTranscript.map((t, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 text-xs leading-relaxed ${
                        t.speaker === 'ai' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      {t.speaker === 'ai' && (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0 mt-0.5">
                          AI
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-md ${
                          t.speaker === 'ai'
                            ? 'bg-blue-900/40 text-blue-100 border border-blue-500/30'
                            : 'bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                          <span className="font-semibold">{t.speaker === 'ai' ? 'Virtual Assistant (Sarah)' : 'Homeowner Caller'}</span>
                          <span className="font-mono">{t.time}</span>
                        </div>
                        {t.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Action trigger button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Simulated Twilio Line: <span className="font-mono text-blue-300">{currentClient.twilioNumber}</span>
                </span>
                <button
                  onClick={() => startSimulation(simScenario)}
                  disabled={isSimulatingCall}
                  className="btn-glow-primary px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingCall ? 'animate-spin' : ''}`} />
                  <span>{isSimulatingCall ? 'Call in Progress...' : 'Restart Call Test'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CALL LOGS & TRANSCRIPTS */}
      {activeTab === 'calls' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Call List */}
          <div className="lg:col-span-5 rounded-2xl p-5 bg-[#090e1f] border border-white/10">
            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search caller name, phone, or issue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                    filterType === 'all' ? 'bg-white/15 text-white font-medium' : 'text-slate-400'
                  }`}
                >
                  All Calls ({clientCalls.length})
                </button>
                <button
                  onClick={() => setFilterType('emergency')}
                  className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                    filterType === 'emergency' ? 'bg-rose-500/20 text-rose-300 font-medium' : 'text-slate-400'
                  }`}
                >
                  Emergencies ({clientCalls.filter(c => c.isEmergency).length})
                </button>
                <button
                  onClick={() => setFilterType('routine')}
                  className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                    filterType === 'routine' ? 'bg-blue-500/20 text-blue-300 font-medium' : 'text-slate-400'
                  }`}
                >
                  Routine
                </button>
              </div>
            </div>

            {/* List items */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredCalls.map(call => {
                const isSelected = selectedCall?.id === call.id;
                return (
                  <div
                    key={call.id}
                    onClick={() => {
                      setSelectedCall(call);
                      setIsPlayingAudio(false);
                      setAudioProgress(0);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900/30 border-blue-400 shadow-md'
                        : 'bg-white/5 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                          {call.callerName}
                        </span>
                        {call.language === 'es' && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                            ES
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{call.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2">
                      {call.summary}
                    </p>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        call.isEmergency ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {call.isEmergency ? '🚨 Emergency Triage' : 'Routine Estimate'}
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">+${call.estimatedValue}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Call Transcript & Audio Player Drawer */}
          <div className="lg:col-span-7 rounded-2xl p-6 bg-[#090e1f] border border-white/10 flex flex-col justify-between">
            {selectedCall ? (
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg text-white">
                        {selectedCall.callerName}
                      </h3>
                      <span className="font-mono text-xs text-slate-400">
                        {selectedCall.callerPhone}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Intent: <strong className="text-blue-300">{selectedCall.intentLabel}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-emerald-400">
                      ${selectedCall.estimatedValue.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">Estimated Job Value</div>
                  </div>
                </div>

                {/* Audio Waveform Player Simulation */}
                <div className="my-5 p-4 rounded-xl bg-black/50 border border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <span className="font-mono text-white text-xs">
                        {isPlayingAudio ? `0:${Math.floor((audioProgress * selectedCall.durationSeconds) / 100).toString().padStart(2, '0')}` : '0:00'} / 0:{selectedCall.durationSeconds}
                      </span>
                    </div>
                    <span className="text-[11px] text-blue-300 font-mono">Carrier Audio: 24kHz HD</span>
                  </div>

                  {/* Scrub Bar with Audio Bars */}
                  <div className="flex items-center gap-1 h-8 px-1">
                    {[15, 30, 60, 90, 45, 75, 100, 80, 50, 65, 85, 40, 70, 95, 60, 40, 70, 85, 30, 60, 90, 45, 80, 100, 65, 35, 20].map((h, i) => {
                      const barPct = (i / 27) * 100;
                      const isFilled = audioProgress >= barPct;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all ${
                            isFilled ? 'bg-blue-400' : 'bg-slate-700'
                          }`}
                          style={{ height: `${h}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                {/* Emergency SMS Notification Banner if applicable */}
                {selectedCall.smsDispatched && (
                  <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-semibold text-rose-300 mb-1">
                        Dispatched SMS to: {selectedCall.smsDispatched.recipientName} ({selectedCall.smsDispatched.recipientPhone})
                      </div>
                      <div className="text-slate-300 text-[11px] italic font-mono bg-black/40 p-2 rounded">
                        {selectedCall.smsDispatched.message}
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Transcript */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Call Transcript (Bilingual Auto-Sync)
                  </h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {selectedCall.transcript.map((line, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl text-xs ${
                          line.speaker === 'ai'
                            ? 'bg-blue-950/40 border border-blue-500/20 text-blue-100'
                            : 'bg-white/5 border border-white/5 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-semibold">
                            {line.speaker === 'ai' ? 'Sarah (AI Virtual Receptionist)' : selectedCall.callerName}
                          </span>
                          <span className="font-mono">{line.time}</span>
                        </div>
                        <p className="leading-relaxed">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 text-xs">
                Select a call from the list to view transcript and listen to recording.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: BOOKED APPOINTMENTS */}
      {activeTab === 'calendar' && (
        <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Booked Appointments & Emergency Dispatches
              </h3>
              <p className="text-xs text-slate-400">
                Synchronized in real time with your company calendar
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Google Calendar Live
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Date / Slot</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clientCalls
                  .filter(c => c.appointmentBooked)
                  .map(c => {
                    const apt = c.appointmentBooked!;
                    return (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-white">
                          {apt.date} · {apt.time}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{apt.customerName}</div>
                          <div className="text-[11px] text-slate-400">{apt.customerPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            c.isEmergency ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {apt.service}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 text-[11px]">{apt.address}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: RECEPTIONIST SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 bg-[#090e1f] border border-white/10">
          <h3 className="font-display font-bold text-xl text-white mb-2">
            AI Receptionist Configuration
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Fine-tune how your virtual assistant answers incoming customer calls.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdateClientSettings(settingsForm);
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 3500);
            }}
            className="space-y-5"
          >
            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Receptionist settings and prompts updated successfully!</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Business Display Name
              </label>
              <input
                type="text"
                value={settingsForm.businessName}
                onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Assigned Twilio Inbound Line
                </label>
                <input
                  type="text"
                  disabled
                  value={settingsForm.twilioNumber}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Emergency Tech SMS Alert Number
                </label>
                <input
                  type="text"
                  value={settingsForm.emergencyTechPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, emergencyTechPhone: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="text-xs font-semibold text-white">Bilingual Spanish Auto-Detection</div>
                <div className="text-[11px] text-slate-400">
                  Switch automatically to natural Spanish if the caller speaks Spanish.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settingsForm.bilingual}
                onChange={(e) => setSettingsForm({ ...settingsForm, bilingual: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                AI Prompt Directives & Triage Instructions
              </label>
              <textarea
                rows={4}
                value={settingsForm.promptInstructions}
                onChange={(e) => setSettingsForm({ ...settingsForm, promptInstructions: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="btn-glow-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-lg"
              >
                Save Receptionist Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
