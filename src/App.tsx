import React, { useState } from 'react';
import { UserRole, ClientContractor, CallRecord, AgencyMetrics, WebhookLog } from './types';
import { initialClients, initialCalls, initialAgencyMetrics, initialWebhooks } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustAndHangingSection } from './components/TrustAndHangingSection';
import { AiCoreSection } from './components/AiCoreSection';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { FoundationCards } from './components/FoundationCards';
import { CtaSection, Footer } from './components/CtaSection';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SignUpModal } from './components/SignUpModal';
import { DemoModal } from './components/DemoModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('landing');
  const [clients, setClients] = useState<ClientContractor[]>(initialClients);
  const [calls, setCalls] = useState<CallRecord[]>(initialCalls);
  const [metrics, setMetrics] = useState<AgencyMetrics>(initialAgencyMetrics);
  const [webhooks, setWebhooks] = useState<WebhookLog[]>(initialWebhooks);
  const [activeClientId, setActiveClientId] = useState<string>(initialClients[0].id);

  // Modals
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Add new call to state (from simulator or webhook)
  const handleAddNewCall = (newCall: CallRecord) => {
    setCalls(prev => [newCall, ...prev]);

    // Update contractor client counters
    setClients(prev => prev.map(c => {
      if (c.id === newCall.contractorId) {
        return {
          ...c,
          totalCalls: c.totalCalls + 1,
          bookedJobs: newCall.appointmentBooked ? c.bookedJobs + 1 : c.bookedJobs,
          emergenciesTriaged: newCall.isEmergency ? c.emergenciesTriaged + 1 : c.emergenciesTriaged,
          revenueCaptured: c.revenueCaptured + newCall.estimatedValue,
          minutesUsed: c.minutesUsed + Math.ceil(newCall.durationSeconds / 60)
        };
      }
      return c;
    }));

    // Update global agency metrics
    setMetrics(prev => ({
      ...prev,
      totalMinutesUsed: prev.totalMinutesUsed + Math.ceil(newCall.durationSeconds / 60)
    }));

    // Add webhook log entry
    const newLog: WebhookLog = {
      id: `wb-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Vapi.ai',
      event: `call.completed (${newCall.intentLabel})`,
      status: 'success',
      latencyMs: 340,
      payload: JSON.stringify({
        contractorId: newCall.contractorId,
        caller: newCall.callerPhone,
        emergency: newCall.isEmergency,
        value: newCall.estimatedValue
      })
    };
    setWebhooks(prev => [newLog, ...prev]);
  };

  // Add newly provisioned client
  const handleAddNewClient = (newClient: ClientContractor) => {
    setClients(prev => [newClient, ...prev]);
    setActiveClientId(newClient.id);
    setMetrics(prev => ({
      ...prev,
      totalClients: prev.totalClients + 1,
      activeLines: prev.activeLines + 1,
      monthlyRecurringRevenue: prev.monthlyRecurringRevenue + newClient.monthlyRetainer
    }));
  };

  // Sign up completion -> redirects to client dashboard
  const handleCompleteSignUp = (newClient: ClientContractor) => {
    handleAddNewClient(newClient);
    setIsSignUpModalOpen(false);
    setCurrentRole('client');
  };

  // Trigger test webhook
  const handleTriggerTestWebhook = (log: WebhookLog) => {
    setWebhooks(prev => [log, ...prev]);
  };

  // Toggle client status (pause / resume)
  const handleToggleClientStatus = (clientId: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          status: c.status === 'active' ? 'paused' : 'active'
        };
      }
      return c;
    }));
  };

  // Update client settings
  const handleUpdateClientSettings = (updatedClient: ClientContractor) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Top Floating Glass Capsule Navbar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onOpenSignUp={() => setIsSignUpModalOpen(true)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRole === 'landing' && (
          <div>
            {/* Hero Section matching Image 1 */}
            <HeroSection
              onOpenDemo={() => setIsDemoModalOpen(true)}
              onOpenSignUp={() => setIsSignUpModalOpen(true)}
              onGoToClientDashboard={() => setCurrentRole('client')}
            />

            {/* Trust Partner Logos & Hanging Tag Cards matching Image 2 */}
            <TrustAndHangingSection />

            {/* Unified AI Processor Core & Dispatch Modules matching Image 3 */}
            <AiCoreSection />

            {/* All-in-one capabilities Bento Grid matching Image 4 */}
            <CapabilitiesBento
              onGoToClientDashboard={() => setCurrentRole('client')}
            />

            {/* 3D Tilted Foundation Cards matching Images 5 & 6 */}
            <FoundationCards />

            {/* Book Your Demo Today CTA Section matching Images 7 & 8 */}
            <CtaSection
              onOpenDemo={() => setIsDemoModalOpen(true)}
              onOpenSignUp={() => setIsSignUpModalOpen(true)}
            />

            {/* Minimalist Agency Footer */}
            <Footer />
          </div>
        )}

        {currentRole === 'client' && (
          <ClientDashboard
            clients={clients}
            calls={calls}
            activeClientId={activeClientId}
            onSelectClient={setActiveClientId}
            onAddNewCall={handleAddNewCall}
            onUpdateClientSettings={handleUpdateClientSettings}
          />
        )}

        {currentRole === 'admin' && (
          <AdminDashboard
            metrics={metrics}
            clients={clients}
            webhooks={webhooks}
            onAddNewClient={handleAddNewClient}
            onTriggerTestWebhook={handleTriggerTestWebhook}
            onToggleClientStatus={handleToggleClientStatus}
          />
        )}
      </main>

      {/* Contractor Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onCompleteSignUp={handleCompleteSignUp}
      />

      {/* 1-on-1 Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onGoToSimulator={() => {
          setIsDemoModalOpen(false);
          setCurrentRole('client');
        }}
      />
    </div>
  );
}
