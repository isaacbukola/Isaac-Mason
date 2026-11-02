import React, { useState } from 'react';
import { FileText, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenRateCard: () => void;
  onSelectPackage: (packageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRateCard, onSelectPackage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFB]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with logo) */}
        <a 
          href="#" 
          className="group flex items-center gap-3 text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
        >
          <img 
            src="/assets/aistudio/unnamed_49b198f5.jpg" 
            alt="Isaac Mason - I Logic AI" 
            className="w-9 h-9 rounded-xl object-contain bg-white p-0.5 border border-zinc-200/90 shadow-xs group-hover:scale-105 transition-transform"
          />
          <span className="flex flex-col">
            <span className="leading-tight font-extrabold text-zinc-950">Isaac Mason</span>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">I Logic AI · Websites & Automation</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line links with hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <button 
            onClick={() => scrollTo('workspace')} 
            className="hover:text-[#432888] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Automation Studio</span>
            <span className="text-[10px] bg-purple-100 text-[#432888] px-1.5 py-0.5 rounded font-semibold">Interactive</span>
          </button>
          <button 
            onClick={() => scrollTo('packages')} 
            className="hover:text-[#432888] transition-colors whitespace-nowrap cursor-pointer"
          >
            Packages & Pricing
          </button>
          <button 
            onClick={() => scrollTo('capabilities')} 
            className="hover:text-[#432888] transition-colors whitespace-nowrap cursor-pointer"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollTo('process')} 
            className="hover:text-[#432888] transition-colors whitespace-nowrap cursor-pointer"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('about')} 
            className="hover:text-[#432888] transition-colors whitespace-nowrap cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Rate Card */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRateCard}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-zinc-200"
            title="Inspect Official Rate Card PDF"
          >
            <FileText className="w-3.5 h-3.5 text-[#432888]" />
            <span>Rate Card (PDF)</span>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#432888] hover:bg-[#382470] rounded-lg transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenRateCard}
            className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-lg"
            aria-label="View rate card"
          >
            <FileText className="w-4 h-4 text-[#432888]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <button
            onClick={() => scrollTo('workspace')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 hover:text-[#432888]"
          >
            Interactive Automation Studio
          </button>
          <button
            onClick={() => scrollTo('packages')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 hover:text-[#432888]"
          >
            Packages & Pricing (GBP)
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 hover:text-[#432888]"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 hover:text-[#432888]"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 hover:text-[#432888]"
          >
            About Isaac Mason
          </button>
          <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRateCard();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-zinc-700 bg-zinc-100 rounded-lg"
            >
              <FileText className="w-4 h-4 text-[#432888]" />
              View Official Rate Card (PDF)
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-[#432888] rounded-lg"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
