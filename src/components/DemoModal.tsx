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
    phone: '',
    date: 'Tomorrow at 10:00 AM'
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
              Our lead telephony architect will call you at {formData.phone} on {formData.date} with a personalized AI prompt for {formData.company}.
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
              Book Your 1-on-1 Voice AI Demo
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              See how our virtual receptionist handles 24/7 emergencies, cuts missed call losses, and books jobs directly into your calendar.
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number to Call You</label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time</label>
                <select
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Tomorrow at 10:00 AM EST">Tomorrow at 10:00 AM EST</option>
                  <option value="Tomorrow at 2:00 PM EST">Tomorrow at 2:00 PM EST</option>
                  <option value="Wednesday at 11:30 AM EST">Wednesday at 11:30 AM EST</option>
                  <option value="Thursday at 4:00 PM EST">Thursday at 4:00 PM EST</option>
                </select>
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
                  Schedule Demo Call
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
