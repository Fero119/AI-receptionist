import React, { useState } from 'react';
import { TradeType, ClientContractor } from '../types';
import { Sparkles, X, CheckCircle2, PhoneCall, Shield } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSignUp: (client: ClientContractor) => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onCompleteSignUp
}) => {
  const [formData, setFormData] = useState({
    businessName: '',
    trade: 'Plumbing' as TradeType,
    city: '',
    state: '',
    contactName: '',
    email: '',
    phone: '',
    emergencyTechPhone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName) return;

    const areaCode = formData.state === 'CO' ? '303' : formData.state === 'TX' ? '214' : formData.state === 'FL' ? '305' : '555';
    const generatedTwilio = `+1 (${areaCode}) ${Math.floor(200 + Math.random() * 700)}-${Math.floor(1000 + Math.random() * 8999)}`;

    const newClient: ClientContractor = {
      id: `client-${Date.now()}`,
      businessName: formData.businessName,
      trade: formData.trade,
      city: formData.city || 'Denver',
      state: formData.state || 'CO',
      contactName: formData.contactName || 'Owner',
      email: formData.email || 'dispatch@contractor.com',
      phone: formData.phone || '+1 (555) 012-3456',
      twilioNumber: generatedTwilio,
      emergencyTechPhone: formData.emergencyTechPhone || formData.phone || '+1 (555) 098-7654',
      hours: '24/7 Emergency Dispatch',
      bilingual: true,
      hourlyRate: 150,
      status: 'active',
      plan: 'Growth Pro',
      monthlyRetainer: 2400,
      minutesUsed: 12,
      totalCalls: 1,
      bookedJobs: 1,
      emergenciesTriaged: 1,
      revenueCaptured: 2400,
      promptInstructions: `You are the virtual assistant for ${formData.businessName}. Answer calls instantly, triage emergencies, and book estimates directly into the calendar.`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onCompleteSignUp(newClient);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl glass-panel-glow p-6 sm:p-8 border border-blue-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs uppercase font-mono tracking-wider text-blue-300 font-semibold">
            Instant Contractor Access
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl text-white mb-2">
          Sign Up in 60 Seconds
        </h3>
        <p className="text-xs text-slate-300 mb-6">
          Set up your contractor profile to immediately unlock and explore your live Virtual Receptionist Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Company / Trade Business Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Master Plumbing & Heating"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Trade Specialty</label>
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
                placeholder="Denver, CO"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Owner / Contact Name</label>
              <input
                type="text"
                placeholder="Marcus Vance"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Direct Phone</label>
              <input
                type="text"
                placeholder="+1 (303) 555-0192"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
            <div className="font-semibold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>What happens next:</span>
            </div>
            <div className="text-[11px] text-slate-300">
              We immediately assign a test Twilio carrier phone number and open your personalized Client Dashboard with speech synthesis call simulators ready.
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-glow-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg cursor-pointer"
            >
              Launch My Contractor Dashboard →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
