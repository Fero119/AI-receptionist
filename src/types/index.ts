export type TradeType = 'Plumbing' | 'Roofing' | 'HVAC' | 'Electrical' | 'General Contracting';

export type UserRole = 'landing' | 'client' | 'admin';

export interface CallTranscriptItem {
  speaker: 'caller' | 'ai' | 'system';
  text: string;
  time: string;
}

export interface AppointmentSlot {
  date: string;
  time: string;
  service: string;
  customerName: string;
  customerPhone: string;
  address: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface SmsDispatchAlert {
  recipientPhone: string;
  recipientName: string;
  message: string;
  sentAt: string;
  status: 'delivered' | 'sent';
}

export interface CallRecord {
  id: string;
  contractorId: string;
  callerName: string;
  callerPhone: string;
  timestamp: string;
  durationSeconds: number;
  language: 'en' | 'es';
  intent: 'emergency_leak' | 'routine_estimate' | 'hvac_failure' | 'roof_damage' | 'general_inquiry';
  intentLabel: string;
  isEmergency: boolean;
  summary: string;
  transcript: CallTranscriptItem[];
  appointmentBooked?: AppointmentSlot;
  smsDispatched?: SmsDispatchAlert;
  estimatedValue: number;
}

export interface ClientContractor {
  id: string;
  businessName: string;
  trade: TradeType;
  city: string;
  state: string;
  contactName: string;
  email: string;
  phone: string;
  twilioNumber: string;
  emergencyTechPhone: string;
  hours: string;
  bilingual: boolean;
  hourlyRate: number;
  status: 'active' | 'paused' | 'onboarding';
  plan: 'Starter' | 'Growth Pro' | 'Enterprise Multi-Van';
  monthlyRetainer: number;
  minutesUsed: number;
  totalCalls: number;
  bookedJobs: number;
  emergenciesTriaged: number;
  revenueCaptured: number;
  promptInstructions: string;
  createdAt: string;
}

export interface AgencyMetrics {
  totalClients: number;
  totalMinutesUsed: number;
  monthlyRecurringRevenue: number;
  infrastructureCosts: number;
  grossMarginPct: number;
  averageLatencyMs: number;
  systemUptime: number;
  activeLines: number;
}

export interface WebhookLog {
  id: string;
  timestamp: string;
  service: 'Vapi.ai' | 'Twilio' | 'Google Calendar' | 'Supabase';
  event: string;
  status: 'success' | 'warning' | 'error';
  latencyMs: number;
  payload: string;
}
