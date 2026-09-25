import React, { useState } from 'react';
import { X, PhoneCall, Sparkles, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSimulator: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onGoToSimulator
}) => {
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl glass-panel-glow p-6 sm:p-8 border border-blue-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {booked ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Demo Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-6">
              We've received your request. Our team will send a personalized AI demo for {formData.company} directly to {formData.email}.
            </p>
            <button
              onClick={() => {
                setBooked(false);
                onClose();
                onGoToSimulator();
              }}
              className="btn-glow-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg cursor-pointer"
            >
              Test Voice Simulator in Browser Now →
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span className="text-xs uppercase font-mono tracking-wider text-blue-300 font-semibold">
                White-Glove Agency Onboarding
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Request Demo Access
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              See how our virtual receptionist handles 24/7 emergencies, cuts missed call losses, and books jobs directly into your calendar. Fill out the form to get your custom demo link.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Carlos Morales"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Trade Name</label>
                <input
                  type="text"
                  required
                  placeholder="Vanguard Roof & Restorations"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="carlos@vanguard.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToSimulator();
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 underline cursor-pointer"
                >
                  Or jump to live web simulator →
                </button>

                <button
                  type="submit"
                  className="btn-glow-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg cursor-pointer"
                >
                  Request Demo Link
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
