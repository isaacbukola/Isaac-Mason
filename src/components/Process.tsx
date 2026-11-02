import React from 'react';
import { Search, Compass, Cpu, Video, CheckCircle } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '15-Min Workflow Audit',
      description:
        'We review the tools you currently use (website, emails, spreadsheets, calendar) and map out where manual repetitive tasks or missed leads are costing you time.',
      outcome: 'Clear list of agreed triggers and actions',
      icon: Search,
    },
    {
      num: '02',
      title: 'Blueprint & Architecture',
      description:
        'I design a concise blueprint showing exactly how data will flow between your apps. You sign off on the exact logic before any code or connectors are touched.',
      outcome: 'No guesswork, 100% transparent scope',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Build, Integrate & Stress-Test',
      description:
        'I build the workflows, connect the APIs/webhooks, format message templates, and run rigorous edge-case tests with dummy inquiries to ensure zero leaks.',
      outcome: 'Rock-solid reliability with automated retry logic',
      icon: Cpu,
    },
    {
      num: '04',
      title: 'Loom Handover & Setup Support',
      description:
        'You receive a recorded video walkthrough showing exactly how the automation works, followed by 7 to 30 days of direct support to ensure seamless adoption.',
      outcome: 'Peace of mind with 1 round of in-scope adjustments',
      icon: Video,
    },
  ];

  return (
    <section id="process" className="py-16 md:py-24 border-b border-zinc-200/80 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888] mb-2">
            <span>Frictionless Delivery</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>Fast Turnaround</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            How it works from start to finish.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-2">
            A straightforward 4-step delivery with zero technical headaches on your end.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-extrabold text-[#432888]">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#432888] flex items-center justify-center border border-purple-100">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-semibold text-purple-900 bg-purple-50/60 px-2 py-1.5 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-[#432888] shrink-0" />
                  <span>{step.outcome}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
