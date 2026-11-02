import React from 'react';
import { ArrowRight, Play, CheckCircle2, Zap, Clock, ShieldCheck, Mail } from 'lucide-react';

import { HeroAutomationMotion } from './HeroAutomationMotion';

interface HeroProps {
  onScrollToWorkspace: () => void;
  onScrollToPackages: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToWorkspace,
  onScrollToPackages,
  onScrollToContact,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 border-b border-zinc-200/80 bg-gradient-to-b from-[#FAF9FE] via-[#FAFAFB] to-[#FAFAFB]">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-10 -z-10 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Positioning & CTAs (7 cols) */}
          <div className="lg:col-span-7">
            {/* Subtle natural kicker with typographic separator and logo mark */}
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#432888] mb-5">
              <img 
                src="/assets/aistudio/unnamed_49b198f5.jpg" 
                alt="Isaac Mason" 
                className="w-6 h-6 rounded-md object-contain bg-white border border-zinc-200"
              />
              <span>Isaac Mason</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>I Logic AI</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Websites & Business Automation Specialist</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-zinc-950 leading-[1.1] mb-5 [text-wrap:balance]">
              Simplify enquiries, bookings and everyday business admin.
            </h1>

            {/* Professional Positioning Paragraph */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-7 [text-wrap:balance]">
              I help small and medium-sized businesses improve their online presence and automate repetitive business processes—customer inquiries, lead management, follow-ups, appointment scheduling, and client onboarding.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onScrollToPackages}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#432888] hover:bg-[#382470] rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Automation Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToWorkspace}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200/90 rounded-xl transition-all shadow-sm hover:border-[#432888]/40 cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#432888] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-[#432888] ml-0.5" />
                </div>
                <span>Try Practical Workspace</span>
              </button>

              <a
                href="mailto:isaacmason928@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-[#432888] transition-colors py-2 px-2"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>isaacmason928@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Moving Animation of Automation with Transparent BG (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroAutomationMotion />
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Measurable Impact KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-zinc-200/70">
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-zinc-200/80">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-1">
              <Zap className="w-3.5 h-3.5 text-[#432888]" />
              <span>Lead Response</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
              &lt; 60 sec
            </div>
            <p className="text-xs text-zinc-500 mt-1">Instant customer acknowledgment before they contact a competitor.</p>
          </div>

          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-zinc-200/80">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Time Saved</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
              15+ hrs
            </div>
            <p className="text-xs text-zinc-500 mt-1">Reclaimed weekly from manual copy-pasting, reminders & scheduling.</p>
          </div>

          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-zinc-200/80">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Pipeline Integrity</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
              100%
            </div>
            <p className="text-xs text-zinc-500 mt-1">Every web enquiry logged into your central tracker with zero leaks.</p>
          </div>

          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-zinc-200/80">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Handover Guarantee</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
              7–30 days
            </div>
            <p className="text-xs text-zinc-500 mt-1">Direct post-launch setup support, video handover & edge-case testing.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
