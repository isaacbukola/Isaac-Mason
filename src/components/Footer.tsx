import React from 'react';
import { FileText, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenRateCard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRateCard }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 md:py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/unnamed_49b198f5.jpg" 
                alt="Isaac Mason - I Logic AI" 
                className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 border border-zinc-800 shadow-sm"
              />
              <div>
                <span className="text-base font-bold text-white block">
                  Isaac Mason
                </span>
                <span className="text-xs text-zinc-400">
                  I Logic AI · Website & Business Automation Specialist
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              I help small and medium-sized businesses improve their online presence and automate repetitive business processes, customer inquiries, lead management, and scheduling.
            </p>

            <div className="pt-1">
              <a
                href="mailto:isaacmason928@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-purple-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>isaacmason928@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('workspace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Automation Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Automation Packages (GBP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('capabilities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  What I Automate
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  4-Step Delivery Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Isaac Mason
                </button>
              </li>
            </ul>
          </div>

          {/* Document & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Official Rate Card & Documents
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transparent, fixed one-time setup pricing with optional ongoing care.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenRateCard}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors w-fit cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Preview Rate Card (PNG)</span>
              </button>

              <a
                href="/assets/aistudio/Isaac_Mason_Automation_Packages__1__ab22a62a.pdf"
                download="Isaac_Mason_Automation_Packages.pdf"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors w-fit"
              >
                <span>Download Rate Card (PDF) →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} Isaac Mason. All rights reserved. Let’s simplify your workflow.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
