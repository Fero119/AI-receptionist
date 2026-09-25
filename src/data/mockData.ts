import { ClientContractor, CallRecord, AgencyMetrics, WebhookLog } from '../types';

export const initialClients: ClientContractor[] = [
  {
    id: 'client-1',
    businessName: 'Apex Elite Plumbing & Drain',
    trade: 'Plumbing',
    city: 'Denver',
    state: 'CO',
    contactName: 'Marcus Vance',
    email: 'marcus@apexeliteplumbing.com',
    phone: '+1 (303) 555-0192',
    twilioNumber: '+1 (303) 747-9201',
    emergencyTechPhone: '+1 (303) 555-0814',
    hours: '24/7 Emergency · Mon-Fri 7AM-6PM Routine',
    bilingual: true,
    hourlyRate: 145,
    status: 'active',
    plan: 'Growth Pro',
    monthlyRetainer: 2400,
    minutesUsed: 1240,
    totalCalls: 318,
    bookedJobs: 94,
    emergenciesTriaged: 38,
    revenueCaptured: 142500,
    promptInstructions: 'You are Sarah, the virtual assistant for Apex Elite Plumbing in Denver. Triage flooded basements, sewer backups, and burst pipes as high-priority emergencies. Ask caller address and water shut-off status. If Spanish is spoken, immediately respond fluently in Spanish.',
    createdAt: '2026-01-15'
  },
  {
    id: 'client-2',
    businessName: 'Vanguard Roof & Restorations',
    trade: 'Roofing',
    city: 'Dallas',
    state: 'TX',
    contactName: 'Carlos Morales',
    email: 'carlos@vanguardroofingtx.com',
    phone: '+1 (214) 555-0284',
    twilioNumber: '+1 (214) 839-4410',
    emergencyTechPhone: '+1 (214) 555-0992',
    hours: 'Mon-Sat 7AM-7PM · 24/7 Storm Triage',
    bilingual: true,
    hourlyRate: 180,
    status: 'active',
    plan: 'Enterprise Multi-Van',
    monthlyRetainer: 3200,
    minutesUsed: 1860,
    totalCalls: 412,
    bookedJobs: 128,
    emergenciesTriaged: 45,
    revenueCaptured: 284000,
    promptInstructions: 'You are Elena, AI receptionist for Vanguard Roof. Inquire about active leaks into living areas, storm wind damage, or missing shingles. Book drone inspection slots.',
    createdAt: '2026-02-01'
  },
  {
    id: 'client-3',
    businessName: 'CoolBreeze Climate Solutions',
    trade: 'HVAC',
    city: 'Phoenix',
    state: 'AZ',
    contactName: 'Brett Thompson',
    email: 'brett@coolbreezeaz.com',
    phone: '+1 (602) 555-0731',
    twilioNumber: '+1 (602) 691-3829',
    emergencyTechPhone: '+1 (602) 555-0455',
    hours: '24/7 Heat Wave Emergency Dispatch',
    bilingual: true,
    hourlyRate: 155,
    status: 'active',
    plan: 'Growth Pro',
    monthlyRetainer: 2400,
    minutesUsed: 1420,
    totalCalls: 380,
    bookedJobs: 110,
    emergenciesTriaged: 52,
    revenueCaptured: 165000,
    promptInstructions: 'You are David, receptionist for CoolBreeze. In Arizona heat over 100°F with elderly or children, mark no-AC as critical emergency and dispatch technician immediately.',
    createdAt: '2026-02-12'
  },
  {
    id: 'client-4',
    businessName: 'Precision Current Electrical',
    trade: 'Electrical',
    city: 'Miami',
    state: 'FL',
    contactName: 'Mateo Delgado',
    email: 'mateo@precisioncurrentelec.com',
    phone: '+1 (305) 555-0482',
    twilioNumber: '+1 (305) 782-1940',
    emergencyTechPhone: '+1 (305) 555-0633',
    hours: 'Mon-Fri 8AM-5PM · 24/7 Breaker Sparking Support',
    bilingual: true,
    hourlyRate: 160,
    status: 'active',
    plan: 'Starter',
    monthlyRetainer: 1800,
    minutesUsed: 890,
    totalCalls: 215,
    bookedJobs: 67,
    emergenciesTriaged: 19,
    revenueCaptured: 89400,
    promptInstructions: 'You are Sofia at Precision Current. Warn callers not to touch sparking electrical panels or burning outlets. Triage power outages vs lighting installs.',
    createdAt: '2026-03-05'
  }
];

export const initialCalls: CallRecord[] = [
  {
    id: 'call-101',
    contractorId: 'client-1',
    callerName: 'Evelyn Parker',
    callerPhone: '+1 (303) 492-8190',
    timestamp: 'Today at 02:14 AM',
    durationSeconds: 142,
    language: 'en',
    intent: 'emergency_leak',
    intentLabel: 'CRITICAL EMERGENCY: Burst Pipe',
    isEmergency: true,
    summary: 'Homeowner woke up to 2 inches of water in the basement from ruptured main pipe. Instructed caller on main water shutoff valve. Dispatched on-call technician Marcus and booked priority emergency dispatch.',
    estimatedValue: 2400,
    transcript: [
      { speaker: 'ai', text: 'Thank you for calling Apex Elite Plumbing 24/7 line. This is Sarah. I hear water running—are you experiencing an emergency?', time: '0:02' },
      { speaker: 'caller', text: 'Yes, please help! My basement is flooding right now, water is gushing out of the pipe near the furnace!', time: '0:08' },
      { speaker: 'ai', text: 'I understand completely Evelyn, take a deep breath. First, do you know where your main water shutoff valve is located to stop the flow right now?', time: '0:16' },
      { speaker: 'caller', text: 'Yes, it is next to the water meter in the front corner. I am turning it right now... okay, it stopped gushing!', time: '0:29' },
      { speaker: 'ai', text: 'Great job. What is your address? I am dispatching our on-call emergency technician to your home immediately.', time: '0:35' },
      { speaker: 'caller', text: '4820 Montview Blvd, Denver, 80220.', time: '0:41' },
      { speaker: 'ai', text: 'Address confirmed. Our master plumber Marcus Vance is en route with an estimated arrival of 35 minutes. You will receive an SMS confirmation right now.', time: '0:50' }
    ],
    appointmentBooked: {
      date: 'Today',
      time: '03:00 AM (Priority Emergency)',
      service: 'Burst Main Line & Water Extraction Triage',
      customerName: 'Evelyn Parker',
      customerPhone: '+1 (303) 492-8190',
      address: '4820 Montview Blvd, Denver, CO 80220',
      status: 'confirmed'
    },
    smsDispatched: {
      recipientPhone: '+1 (303) 555-0814',
      recipientName: 'Tech: Marcus Vance',
      message: '🚨 URGENT EMERGENCY DISPATCH: Evelyn Parker (303-492-8190) has basement flooding at 4820 Montview Blvd Denver. Main valve shut off. ETA needed <40m.',
      sentAt: '02:16 AM',
      status: 'delivered'
    }
  },
  {
    id: 'call-102',
    contractorId: 'client-1',
    callerName: 'Roberto Gomez',
    callerPhone: '+1 (720) 338-9921',
    timestamp: 'Today at 08:30 AM',
    durationSeconds: 110,
    language: 'es',
    intent: 'routine_estimate',
    intentLabel: 'Routine: Calentador de Agua',
    isEmergency: false,
    summary: 'Bilingual Spanish inquiry regarding tankless water heater upgrade and installation estimate. Booked on-site inspection for tomorrow at 10:00 AM.',
    estimatedValue: 3800,
    transcript: [
      { speaker: 'ai', text: 'Gracias por llamar a Apex Elite Plumbing. Habla Sarah, ¿en qué podemos asistirle hoy?', time: '0:03' },
      { speaker: 'caller', text: 'Buenos días, quisiera un presupuesto para cambiar mi calentador de agua tradicional por uno sin tanque.', time: '0:12' },
      { speaker: 'ai', text: 'Con mucho gusto, Don Roberto. Realizamos instalaciones de alta eficiencia Navien y Rinnai. ¿Le gustaría que nuestro especialista lo visite mañana a las 10:00 AM?', time: '0:22' },
      { speaker: 'caller', text: 'Perfecto, mañana a las 10 me queda excelente. Mi dirección es 1120 South Clarkson St.', time: '0:34' },
      { speaker: 'ai', text: 'Cita confirmada para mañana a las 10:00 AM. Le enviamos la confirmación por mensaje de texto. ¡Que tenga un excelente día!', time: '0:45' }
    ],
    appointmentBooked: {
      date: 'Tomorrow',
      time: '10:00 AM',
      service: 'Tankless Water Heater Installation Estimate',
      customerName: 'Roberto Gomez',
      customerPhone: '+1 (720) 338-9921',
      address: '1120 South Clarkson St, Denver, CO',
      status: 'confirmed'
    }
  },
  {
    id: 'call-103',
    contractorId: 'client-1',
    callerName: 'Rachel Goldstein',
    callerPhone: '+1 (303) 881-2094',
    timestamp: 'Yesterday at 04:45 PM',
    durationSeconds: 95,
    language: 'en',
    intent: 'routine_estimate',
    intentLabel: 'Routine: Bathroom Remodel Rough-In',
    isEmergency: false,
    summary: 'Homeowner planning master bath renovation needing rough-in plumbing inspection and estimate. Scheduled for Thursday 2:00 PM.',
    estimatedValue: 4500,
    transcript: [
      { speaker: 'ai', text: 'Hello, thank you for reaching Apex Elite Plumbing. This is Sarah, how can I help you today?', time: '0:02' },
      { speaker: 'caller', text: 'Hi, I am remodeling my master bathroom and need a licensed plumber to quote relocating the shower drain and double vanity rough-in.', time: '0:11' },
      { speaker: 'ai', text: 'We specialize in residential bathroom remodels! We have consultation availability this Thursday at 2:00 PM. Would that work for you, Rachel?', time: '0:24' },
      { speaker: 'caller', text: 'Thursday at 2 PM is great. I will have the architectural drawings ready.', time: '0:35' },
      { speaker: 'ai', text: 'Wonderful, our senior estimator is booked for Thursday at 2 PM at your property. Have a great evening!', time: '0:48' }
    ],
    appointmentBooked: {
      date: 'Thursday',
      time: '02:00 PM',
      service: 'Bathroom Remodel Rough-In Consultation',
      customerName: 'Rachel Goldstein',
      customerPhone: '+1 (303) 881-2094',
      address: '744 Columbine St, Denver, CO',
      status: 'confirmed'
    }
  },
  {
    id: 'call-104',
    contractorId: 'client-1',
    callerName: 'Devon Miller',
    callerPhone: '+1 (303) 674-1180',
    timestamp: 'Yesterday at 11:20 AM',
    durationSeconds: 65,
    language: 'en',
    intent: 'general_inquiry',
    intentLabel: 'Inquiry: Hydro-Jetting Commercial Drain',
    isEmergency: false,
    summary: 'Commercial restaurant manager requesting hydro-jetting service specs. Information provided and lead logged.',
    estimatedValue: 1200,
    transcript: [
      { speaker: 'ai', text: 'Apex Elite Plumbing, this is Sarah. How can I assist you today?', time: '0:02' },
      { speaker: 'caller', text: 'Hi, do you guys have 4000 PSI hydro-jetting equipment for commercial grease line cleanout?', time: '0:09' },
      { speaker: 'ai', text: 'Yes, Devon! We operate truck-mounted 4000 PSI trailer jetters with video camera inspection. I can schedule a camera inspection today at 3 PM.', time: '0:20' }
    ]
  }
];

export const initialAgencyMetrics: AgencyMetrics = {
  totalClients: 18,
  totalMinutesUsed: 14820,
  monthlyRecurringRevenue: 46800,
  infrastructureCosts: 1845,
  grossMarginPct: 96.1,
  averageLatencyMs: 412,
  systemUptime: 99.98,
  activeLines: 24
};

export const initialWebhooks: WebhookLog[] = [
  {
    id: 'wb-1',
    timestamp: 'Just now',
    service: 'Vapi.ai',
    event: 'call.completed (Intent: Emergency Triage)',
    status: 'success',
    latencyMs: 380,
    payload: '{"call_id": "vapi_88291", "duration": 142, "language": "en", "is_emergency": true, "caller": "+13034928190"}'
  },
  {
    id: 'wb-2',
    timestamp: '2 mins ago',
    service: 'Twilio',
    event: 'sms.dispatched (Priority Tech Alert)',
    status: 'success',
    latencyMs: 140,
    payload: '{"to": "+13035550814", "status": "delivered", "sid": "SM94827103"}'
  },
  {
    id: 'wb-3',
    timestamp: '5 mins ago',
    service: 'Google Calendar',
    event: 'event.created (Emergency Booking #4820)',
    status: 'success',
    latencyMs: 290,
    payload: '{"calendarId": "primary", "event": "Priority Emergency Dispatch - Evelyn Parker"}'
  },
  {
    id: 'wb-4',
    timestamp: '12 mins ago',
    service: 'Supabase',
    event: 'db.insert: call_records & metrics',
    status: 'success',
    latencyMs: 45,
    payload: '{"table": "call_logs", "inserted_id": "call-101", "tokens_billed": 842}'
  }
];
