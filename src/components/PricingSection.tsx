import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  FileDown, 
  Eye, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  PACKAGES_DATA, 
  INCLUDED_WITH_EVERY_SETUP, 
  SCOPE_AND_PAYMENT_TERMS 
} from '../data/packagesData';

interface PricingSectionProps {
  onSelectPackage: (packageId: string) => void;
  onOpenRateCard: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  onOpenRateCard,
}) => {
  const [includeCare, setIncludeCare] = useState<boolean>(false);
  const [showScopeTerms, setShowScopeTerms] = useState<boolean>(false);

  return (
    <section id="packages" className="py-16 md:py-24 border-b border-zinc-200/80 bg-[#FAF9FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888] mb-2">
              <span>ONE-TIME SETUP / PRICES IN GBP</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Fixed Price Guarantee</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
              Automation packages.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 mt-2 max-w-2xl">
              Simplify enquiries, bookings and everyday business admin. Transparent one-off pricing with optional ongoing care.
            </p>
          </div>

          {/* Pricing Controls: Care Toggle & Rate Card Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle optional care preview */}
            <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-zinc-200 shadow-xs">
              <button
                onClick={() => setIncludeCare(false)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !includeCare 
                    ? 'bg-[#432888] text-white shadow-xs' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                One-Time Setup
              </button>
              <button
                onClick={() => setIncludeCare(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  includeCare 
                    ? 'bg-[#432888] text-white shadow-xs' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Show Care Cost
              </button>
            </div>

            {/* Inspect / Download Rate Card button */}
            <button
              onClick={onOpenRateCard}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#432888]" />
              <span>Original Rate Card</span>
            </button>

            <a
              href="/assets/aistudio/Isaac_Mason_Automation_Packages__1__ab22a62a.pdf"
              download="Isaac_Mason_Automation_Packages.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#432888] bg-purple-100/80 hover:bg-purple-200/80 rounded-xl transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const isHighlight = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl transition-all duration-200 ${
                  isHighlight
                    ? 'bg-white border-2 border-[#432888] shadow-lg ring-1 ring-[#432888]/20 -translate-y-1'
                    : 'bg-white border border-zinc-200/90 hover:border-purple-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Popularity badge */}
                {isHighlight && (
                  <div className="absolute -top-3 left-6 bg-[#432888] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    Most Popular for Growing SMBs
                  </div>
                )}

                <div>
                  {/* Top package indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-zinc-950">
                      {pkg.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#432888] bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      {pkg.number}
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-6 pb-6 border-b border-zinc-100">
                    <div className="flex items-baseline gap-1 text-[#432888]">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        {pkg.setupPrice}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium block mt-1">
                      {pkg.setupNote}
                    </span>

                    {/* Optional Care Sub-pricing */}
                    <div className="mt-3 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 font-medium">Optional care:</span>
                      <span className="font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded">
                        {pkg.optionalCare}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points list */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#432888] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & summary */}
                <div className="pt-4 border-t border-zinc-100 mt-4">
                  <p className="text-[11px] text-zinc-500 mb-4 italic leading-snug">
                    {pkg.recommendedFor}
                  </p>
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isHighlight
                        ? 'bg-[#432888] hover:bg-[#382470] text-white shadow-sm hover:shadow'
                        : 'bg-zinc-100 hover:bg-[#432888] text-zinc-900 hover:text-white'
                    }`}
                  >
                    <span>Choose {pkg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Included With Every Setup Box */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-purple-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#432888] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Included with every setup</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950">
                Planning, testing, a handover video and one round of in-scope changes.
              </h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                You never receive half-finished scripts. Every automation is thoroughly verified with real dummy leads, recorded on video for your team, and fine-tuned to your feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
              {INCLUDED_WITH_EVERY_SETUP.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-800 bg-[#FAF9FE] px-3 py-2 rounded-xl border border-purple-100">
                  <Check className="w-3.5 h-3.5 text-[#432888] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scope & Payment Terms Accordion */}
        <div className="mt-6 bg-white rounded-2xl border border-zinc-200/90 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-[#432888]" />
              <h4 className="text-sm font-bold text-zinc-950">
                Scope & Payment Terms (Transparent & Straightforward)
              </h4>
            </div>
            <button
              onClick={() => setShowScopeTerms(!showScopeTerms)}
              className="text-xs font-semibold text-[#432888] hover:underline cursor-pointer"
            >
              {showScopeTerms ? 'Hide Details' : 'View Full Terms'}
            </button>
          </div>

          {showScopeTerms && (
            <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-600">
              {SCOPE_AND_PAYMENT_TERMS.map((term, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#FAF9FE] p-3 rounded-lg border border-zinc-200/60">
                  <span className="font-mono text-[#432888] font-bold shrink-0">0{idx + 1}.</span>
                  <span className="leading-relaxed">{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct contact note matching the PDF footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200/70 text-xs text-zinc-600">
          <span className="font-semibold text-zinc-900">
            Let’s simplify your workflow.
          </span>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:isaacmason928@gmail.com" 
              className="font-medium text-[#432888] hover:underline font-mono"
            >
              isaacmason928@gmail.com
            </a>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <button
              onClick={onOpenRateCard}
              className="text-zinc-600 hover:text-zinc-950 hover:underline cursor-pointer"
            >
              View Official Rate Card (PNG/PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
