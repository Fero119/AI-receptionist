import React, { useState } from 'react';
import { ClientContractor, AgencyMetrics, WebhookLog, TradeType } from '../types';
import {
  Shield,
  Users,
  DollarSign,
  PhoneCall,
  Activity,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Terminal,
  ExternalLink,
  Cpu,
  RefreshCw,
  Sparkles,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  metrics: AgencyMetrics;
  clients: ClientContractor[];
  webhooks: WebhookLog[];
  onAddNewClient: (newClient: ClientContractor) => void;
  onTriggerTestWebhook: (webhook: WebhookLog) => void;
  onToggleClientStatus: (clientId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  metrics,
  clients,
  webhooks,
  onAddNewClient,
  onTriggerTestWebhook,
  onToggleClientStatus
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'webhooks' | 'financials'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);

  // New Client Form
  const [formData, setFormData] = useState({
    businessName: '',
    trade: 'Plumbing' as TradeType,
    city: '',
    state: '',
    contactName: '',
    email: '',
    phone: '',
    plan: 'Growth Pro' as 'Starter' | 'Growth Pro' | 'Enterprise Multi-Van',
    emergencyTechPhone: '',
    bilingual: true
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName) return;

    const areaCode = formData.state === 'CO' ? '303' : formData.state === 'TX' ? '214' : formData.state === 'AZ' ? '602' : '555';
    const randomTwilio = `+1 (${areaCode}) ${Math.floor(200 + Math.random() * 700)}-${Math.floor(1000 + Math.random() * 8999)}`;

    const newClient: ClientContractor = {
      id: `client-${Date.now()}`,
      businessName: formData.businessName,
      trade: formData.trade,
      city: formData.city || 'Austin',
      state: formData.state || 'TX',
      contactName: formData.contactName || 'Owner',
      email: formData.email || 'dispatch@contractor.com',
      phone: formData.phone || '+1 (555) 012-3456',
      twilioNumber: randomTwilio,
      emergencyTechPhone: formData.emergencyTechPhone || '+1 (555) 098-7654',
      hours: '24/7 Emergency Dispatch',
      bilingual: formData.bilingual,
      hourlyRate: 150,
      status: 'active',
      plan: formData.plan,
      monthlyRetainer: formData.plan === 'Starter' ? 1800 : formData.plan === 'Growth Pro' ? 2400 : 3200,
      minutesUsed: 0,
      totalCalls: 0,
      bookedJobs: 0,
      emergenciesTriaged: 0,
      revenueCaptured: 0,
      promptInstructions: `You are the virtual assistant for ${formData.businessName}. Answer calls instantly, triage emergencies, and book estimates directly into the calendar.`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddNewClient(newClient);
    setIsProvisionModalOpen(false);
    setFormData({
      businessName: '',
      trade: 'Plumbing',
      city: '',
      state: '',
      contactName: '',
      email: '',
      phone: '',
      plan: 'Growth Pro',
      emergencyTechPhone: '',
      bilingual: true
    });
  };

  const simulateNewWebhook = () => {
    const services: ('Vapi.ai' | 'Twilio' | 'Google Calendar' | 'Supabase')[] = ['Vapi.ai', 'Twilio', 'Google Calendar', 'Supabase'];
    const chosenService = services[Math.floor(Math.random() * services.length)];
    const newLog: WebhookLog = {
      id: `wb-${Date.now()}`,
      timestamp: 'Just now',
      service: chosenService,
      event: chosenService === 'Vapi.ai' ? 'voice.turn_completed (<390ms latency)' : chosenService === 'Twilio' ? 'sms.outbound_delivered' : 'db.record_persisted',
      status: 'success',
      latencyMs: Math.floor(80 + Math.random() * 320),
      payload: JSON.stringify({
        source: chosenService,
        trace_id: `tr_${Math.random().toString(36).substring(7)}`,
        status: 200,
        carrier: 'Twilio SIP Trunk'
      })
    };
    onTriggerTestWebhook(newLog);
  };

  const filteredClients = clients.filter(c =>
    c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Admin Top Header Banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 mb-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Agency Super Admin Console
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Agency Operations & Fleet Dispatch
            </h1>

            <p className="text-xs text-slate-300 mt-1">
              White-glove infrastructure management for US home service virtual receptionists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProvisionModalOpen(true)}
              className="btn-glow-primary px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New Contractor</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Agency Overview
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'clients'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Contractor Clients ({clients.length})
          </button>

          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'webhooks'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Telephony & Webhook Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('financials')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'financials'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            MRR & Infrastructure Margins
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top Agency KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Active Clients */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                <span>Active Contractor Accounts</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                {clients.length}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                100% retention · 0 churn
              </div>
            </div>

            {/* Total Minutes Used */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                <span>Voice Minutes Billed</span>
                <PhoneCall className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                {metrics.totalMinutesUsed.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Across {metrics.activeLines} active Twilio lines
              </div>
            </div>

            {/* MRR */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-950 to-blue-950 border border-indigo-500/30 shadow-xl">
              <div className="flex items-center justify-between text-indigo-300 mb-2 text-xs">
                <span>Monthly Recurring Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums mb-1">
                ${metrics.monthlyRecurringRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                +24% month-over-month growth
              </div>
            </div>

            {/* Gross Profit Margin */}
            <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                <span>Gross Profit Margin</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400 tracking-tight tabular-nums mb-1">
                {metrics.grossMarginPct}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Total server/Twilio costs: ${metrics.infrastructureCosts}
              </div>
            </div>
          </div>

          {/* Infrastructure Health & Live Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Active Client Fleet */}
            <div className="lg:col-span-7 rounded-2xl p-6 bg-[#090e1f] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-white">
                  Contractor Fleet Summary
                </h3>
                <button
                  onClick={() => setActiveTab('clients')}
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Manage All
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {clients.map(client => (
                  <div key={client.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{client.businessName}</span>
                        <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-slate-300">
                          {client.trade}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {client.twilioNumber} · {client.city}, {client.state}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-white">
                        ${client.monthlyRetainer}/mo
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {client.minutesUsed} mins used
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Telephony Specs */}
            <div className="lg:col-span-5 rounded-2xl p-6 bg-[#090e1f] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-4">
                  Voice Engine & Latency SLA
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Median Voice Latency</span>
                    <span className="font-mono text-emerald-400 font-bold">{metrics.averageLatencyMs} ms</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Carrier SIP Availability</span>
                    <span className="font-mono text-emerald-400 font-bold">{metrics.systemUptime}%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Voice Synthesis Engine</span>
                    <span className="text-slate-200">ElevenLabs Turbo v2.5</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Conversational LLM</span>
                    <span className="text-slate-200">OpenAI GPT-4o-mini / Vapi</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Database & Persistence</span>
                    <span className="text-slate-200">Supabase (PostgreSQL)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-slate-400">Active Webhook Triggers:</span>
                <button
                  onClick={simulateNewWebhook}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulate Webhook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTRACTOR CLIENTS TABLE */}
      {activeTab === 'clients' && (
        <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search contractor, city, trade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => setIsProvisionModalOpen(true)}
              className="btn-glow-primary px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Provision Contractor</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Contractor Business</th>
                  <th className="py-3 px-4">Trade</th>
                  <th className="py-3 px-4">Twilio Inbound Line</th>
                  <th className="py-3 px-4">Monthly Retainer</th>
                  <th className="py-3 px-4">Minutes Used</th>
                  <th className="py-3 px-4">Calls / Emergencies</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{client.businessName}</div>
                      <div className="text-[11px] text-slate-400">{client.city}, {client.state} · {client.contactName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">{client.trade}</td>
                    <td className="py-3.5 px-4 font-mono text-blue-300">{client.twilioNumber}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">${client.monthlyRetainer}/mo</td>
                    <td className="py-3.5 px-4 font-mono">{client.minutesUsed} mins</td>
                    <td className="py-3.5 px-4">
                      <div>{client.totalCalls} calls</div>
                      <div className="text-[10px] text-rose-400 font-semibold">{client.emergenciesTriaged} emergencies</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        client.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {client.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onToggleClientStatus(client.id)}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer"
                      >
                        {client.status === 'active' ? 'Pause Line' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div className="rounded-2xl p-6 bg-[#090e1f] border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-xl text-white">
                Live Webhook Stream & Payload Inspector
              </h3>
              <p className="text-xs text-slate-400">
                End-of-call webhooks, Twilio emergency SMS triggers, and Supabase insertions.
              </p>
            </div>

            <button
              onClick={simulateNewWebhook}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Fire Simulated Webhook</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {webhooks.map(log => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.service === 'Vapi.ai'
                        ? 'bg-blue-500/20 text-blue-300'
                        : log.service === 'Twilio'
                        ? 'bg-rose-500/20 text-rose-300'
                        : log.service === 'Google Calendar'
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {log.service}
                    </span>
                    <span className="text-white font-semibold">{log.event}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="text-emerald-400">{log.latencyMs}ms</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#060a17] text-slate-300 text-[11px] overflow-x-auto">
                  {log.payload}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIALS */}
      {activeTab === 'financials' && (
        <div className="rounded-2xl p-6 sm:p-8 bg-[#090e1f] border border-white/10 space-y-8">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Agency Economics & Unit Margins
            </h3>
            <p className="text-xs text-slate-400">
              Contractor retainers versus underlying Twilio SIP & Vapi.ai API costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1">Total Monthly Retainers (MRR)</div>
              <div className="text-3xl font-bold font-mono text-emerald-400">
                ${metrics.monthlyRecurringRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Average retainer: $2,600 / contractor / mo
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1">Telephony & AI Usage Costs</div>
              <div className="text-3xl font-bold font-mono text-rose-400">
                ${metrics.infrastructureCosts.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Twilio $0.014/min + Vapi $0.11/min = $0.124/min
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-blue-900 border border-indigo-500/40">
              <div className="text-xs text-indigo-200 mb-1">Agency Net Profit Margin</div>
              <div className="text-3xl font-bold font-mono text-white">
                {metrics.grossMarginPct}%
              </div>
              <div className="text-[11px] text-emerald-300 mt-2">
                Net Monthly Profit: ${(metrics.monthlyRecurringRevenue - metrics.infrastructureCosts).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROVISION NEW CONTRACTOR MODAL */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl glass-panel-glow p-6 sm:p-8 border border-indigo-500/30 relative">
            <button
              onClick={() => setIsProvisionModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs uppercase font-mono tracking-wider text-indigo-300 font-semibold">
                White-Glove Setup
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Provision New Contractor Client
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Automatically buys a local Twilio number and deploys trade-specific prompt logic.
            </p>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contractor Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paramount Plumbing & Heating"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Trade</label>
                  <select
                    value={formData.trade}
                    onChange={(e) => setFormData({ ...formData, trade: e.target.value as TradeType })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Roofing">Roofing</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Electrical">Electrical</option>
                    <option value="General Contracting">General Contracting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City & State</label>
                  <input
                    type="text"
                    placeholder="Austin, TX"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">On-Call Tech Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2831"
                    value={formData.emergencyTechPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyTechPhone: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Retainer Plan</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value as any })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Starter">Starter ($1,800/mo)</option>
                    <option value="Growth Pro">Growth Pro ($2,400/mo)</option>
                    <option value="Enterprise Multi-Van">Enterprise ($3,200/mo)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="bilingualCheck"
                  checked={formData.bilingual}
                  onChange={(e) => setFormData({ ...formData, bilingual: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <label htmlFor="bilingualCheck" className="text-xs text-slate-300 cursor-pointer">
                  Enable automatic English & Spanish bilingual detection
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glow-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg cursor-pointer"
                >
                  Deploy Telephony & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
