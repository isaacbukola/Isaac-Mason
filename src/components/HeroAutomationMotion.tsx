import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Database, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Sliders, 
  FileCheck,
  CreditCard,
  Sparkles,
  Play
} from 'lucide-react';

interface AutomationStage {
  id: string;
  stepNumber: string;
  title: string;
  app: string;
  appColor: string;
  status: string;
  payloadTitle: string;
  payloadSub: string;
  latency: string;
}

export const HeroAutomationMotion: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [packetCount, setPacketCount] = useState<number>(1482);
  const [isManualTriggering, setIsManualTriggering] = useState<boolean>(false);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const stages: AutomationStage[] = [
    {
      id: 'capture',
      stepNumber: '01',
      title: 'Inbound Enquiry Captured',
      app: 'Website Form',
      appColor: '#382470',
      status: 'Trigger Fired',
      payloadTitle: 'James Whitfield (Apex Logistics)',
      payloadSub: 'High-Intent Request · Budget: £3.5k',
      latency: '0ms',
    },
    {
      id: 'crm',
      stepNumber: '02',
      title: 'Auto-Enrich & CRM Sync',
      app: 'Airtable & HubSpot',
      appColor: '#EC4899',
      status: 'Payload Transformed',
      payloadTitle: 'Record Created #REC-8849',
      payloadSub: 'Category: Business Flow · Priority: High',
      latency: '85ms',
    },
    {
      id: 'ack',
      stepNumber: '03',
      title: 'Instant WhatsApp & Booking',
      app: 'WhatsApp / Calendly',
      appColor: '#10B981',
      status: 'Dispatched to Lead',
      payloadTitle: 'Personalised Confirmation Sent',
      payloadSub: 'Auto-synced slot: Tomorrow 14:00 GMT',
      latency: '190ms',
    },
    {
      id: 'billing',
      stepNumber: '04',
      title: 'Deposit Invoice & Onboarding',
      app: 'Stripe & Drive',
      appColor: '#6366F1',
      status: 'Workflow Complete',
      payloadTitle: 'Invoice Issued #INV-089',
      payloadSub: 'Client Workspace Folder Provisioned',
      latency: '340ms',
    },
  ];

  // Continuous automation loop
  useEffect(() => {
    if (hoveredStage !== null) return; // Pause on hover

    const interval = setInterval(() => {
      setActiveStage((prev) => {
        const next = (prev + 1) % stages.length;
        if (next === 0) {
          setPacketCount((c) => c + 1);
        }
        return next;
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [hoveredStage, stages.length]);

  const fireManualTest = () => {
    setIsManualTriggering(true);
    setActiveStage(0);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step < stages.length) {
        setActiveStage(step);
      } else {
        clearInterval(timer);
        setIsManualTriggering(false);
        setPacketCount((c) => c + 1);
      }
    }, 450);
  };

  const currentActiveIndex = hoveredStage !== null ? hoveredStage : activeStage;

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none bg-transparent select-none">
      {/* Decorative subtle ambient backdrop glow (transparent) */}
      <div 
        aria-hidden="true" 
        className="absolute -inset-4 bg-gradient-to-r from-purple-200/25 via-indigo-200/20 to-purple-300/20 rounded-3xl blur-2xl -z-10 pointer-events-none"
      />

      {/* Transparent Floating Automation Motion Shell */}
      <div className="relative rounded-3xl border border-purple-200/60 bg-white/50 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-purple-900/5">
        
        {/* Top Floating HUD Bar (Transparent) */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-purple-100/80 text-xs">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="absolute w-4 h-4 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Autonomous Engine</span>
                <span className="text-[10px] font-normal text-purple-700 bg-purple-100/90 px-1.5 py-0.2 rounded font-mono">
                  LIVE
                </span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                Throughput: {packetCount} executions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fireManualTest}
              disabled={isManualTriggering}
              className="px-2.5 py-1 text-[11px] font-semibold text-[#432888] bg-purple-100/70 hover:bg-purple-200/80 rounded-lg transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Send a live test data packet through the automation loop"
            >
              <Play className="w-2.5 h-2.5 fill-[#432888]" />
              <span>{isManualTriggering ? 'Pulsing...' : 'Fire Test Packet'}</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500 bg-white/80 px-2 py-1 rounded-lg border border-zinc-200/80 tabular-nums">
              ~340ms total
            </span>
          </div>
        </div>

        {/* Moving Flow Nodes Sequence */}
        <div className="relative space-y-3">
          {/* Animated Connecting Vertical Conduit (SVG with moving dashed light) */}
          <div className="absolute left-6 top-8 bottom-8 w-1 pointer-events-none -z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="#E4E4E7"
                strokeWidth="2"
              />
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="#432888"
                strokeWidth="2.5"
                strokeDasharray="8 12"
                className="animate-dash-flow"
              />
            </svg>
          </div>

          {stages.map((stage, index) => {
            const isActive = currentActiveIndex === index;
            const isPassed = currentActiveIndex > index;

            return (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredStage(index)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`relative z-10 transition-all duration-300 rounded-2xl p-3.5 sm:p-4 border cursor-pointer ${
                  isActive
                    ? 'bg-white/95 border-[#432888] shadow-lg shadow-purple-900/10 scale-[1.02] ring-1 ring-[#432888]/30'
                    : isPassed
                    ? 'bg-white/70 border-purple-200/70 opacity-90'
                    : 'bg-white/40 border-zinc-200/70 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Step status node icon */}
                  <div
                    className={`relative w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#432888] text-white shadow-md shadow-purple-700/30'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      stage.stepNumber
                    )}

                    {/* Active pulse aura */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-xl bg-purple-500/30 animate-ping -z-10" />
                    )}
                  </div>

                  {/* Node Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs font-bold text-zinc-950 truncate">
                          {stage.title}
                        </span>
                        <span className="text-[10px] font-semibold text-[#432888] bg-purple-50 px-1.5 py-0.2 rounded border border-purple-100/80">
                          {stage.app}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0 tabular-nums">
                        +{stage.latency}
                      </span>
                    </div>

                    {/* Payload line that updates during execution */}
                    <div className="text-xs text-zinc-700 font-medium truncate">
                      {stage.payloadTitle}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1">
                      <span className="truncate">{stage.payloadSub}</span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-[#432888] animate-pulse flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5 fill-[#432888]" />
                          Processing
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Micro progress line inside the active node */}
                {isActive && (
                  <div className="w-full bg-purple-100 h-1 rounded-full overflow-hidden mt-3">
                    <div className="bg-[#432888] h-full w-full animate-pulse transition-all" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Transparent Status Strip */}
        <div className="mt-4 pt-3 border-t border-purple-100/70 flex items-center justify-between text-[11px] text-zinc-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#432888]" />
            <span className="font-semibold text-zinc-900">Zero human intervention required</span>
          </div>
          <span className="text-zinc-500 font-mono">100% Reliable Delivery</span>
        </div>
      </div>
    </div>
  );
};
