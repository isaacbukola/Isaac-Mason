import React from 'react';
import { Mail, CheckCircle2, Shield, Clock, Award, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onScrollToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToContact }) => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Isaac's Bio and Positioning (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888]">
              <span>About Isaac Mason</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Founder & Automation Engineer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              I build systems that work in the background so you can focus on your business.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              <p>
                Most small business owners lose 2 to 3 hours every day to the same repetitive admin: copying lead contact details between emails and spreadsheets, sending manual booking confirmations, reminding clients to pay invoices, and chasing unanswered enquiries.
              </p>
              <p>
                I founded this consultancy to eliminate that drag. As a dedicated website and automation specialist, I work directly with you to connect your website, calendar, messaging, and databases into clean, reliable pipelines.
              </p>
              <p className="font-medium text-zinc-900">
                No bloated agency retainers, no junior account managers, and no confusing technical jargon—just clear blueprints, fixed pricing, and rock-solid automations that pay for themselves in days.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-[#FAF9FE] rounded-xl border border-purple-100">
                <Shield className="w-4 h-4 text-[#432888] mb-2" />
                <h4 className="text-xs font-bold text-zinc-900 mb-1">100% Client Ownership</h4>
                <p className="text-[11px] text-zinc-500">You retain full ownership of all accounts, keys, and workflows. Zero vendor lock-in.</p>
              </div>

              <div className="p-4 bg-[#FAF9FE] rounded-xl border border-purple-100">
                <Clock className="w-4 h-4 text-[#432888] mb-2" />
                <h4 className="text-xs font-bold text-zinc-900 mb-1">Fast Turnaround</h4>
                <p className="text-[11px] text-zinc-500">Most packages are planned, built, tested, and handed over within 3 to 7 business days.</p>
              </div>

              <div className="p-4 bg-[#FAF9FE] rounded-xl border border-purple-100">
                <Award className="w-4 h-4 text-[#432888] mb-2" />
                <h4 className="text-xs font-bold text-zinc-900 mb-1">Direct Communication</h4>
                <p className="text-[11px] text-zinc-500">You collaborate 1-on-1 directly with me from kickoff audit to post-launch handover.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToContact}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#432888] hover:bg-[#382470] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Schedule a Project Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="mailto:isaacmason928@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-700 hover:text-[#432888] p-2"
              >
                <Mail className="w-4 h-4 text-[#432888]" />
                <span className="font-mono">isaacmason928@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Trust Card / Spec Sheet (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 bg-[#FAF9FE] rounded-3xl border border-purple-200/90 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-purple-100">
                <img 
                  src="/assets/aistudio/unnamed_49b198f5.jpg" 
                  alt="Isaac Mason - I Logic AI" 
                  className="w-16 h-16 rounded-2xl object-contain bg-white p-1 border-2 border-purple-200/80 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-zinc-950">Isaac Mason</h3>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">I Logic AI</span>
                  </div>
                  <span className="text-xs text-zinc-500 block">Website & Business Automation Specialist</span>
                  <span className="text-[11px] font-mono text-[#432888] font-semibold">isaacmason928@gmail.com</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#432888] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Personalised Handover Video</span>
                    <span className="text-zinc-500">Every setup includes a private video explaining the logic so your team is 100% comfortable.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#432888] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">50/50 Payment Security</span>
                    <span className="text-zinc-500">50% upfront to reserve time; 50% only after full testing and satisfactory delivery.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#432888] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Ongoing Monthly Care Option</span>
                    <span className="text-zinc-500">Optional scheduled checks, error monitoring, and priority adjustments from £39/month.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-100 bg-white/70 -mx-2 -mb-2 p-4 rounded-2xl border border-zinc-200/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  Client Focus
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  "Let’s simplify your workflow. No matter how messy your current spreadsheets or inbox feel right now, we can turn it into an automated engine."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
