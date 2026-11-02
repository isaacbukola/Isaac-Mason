import React, { useEffect } from 'react';
import { X, FileDown, ExternalLink } from 'lucide-react';

interface RateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateCardModal: React.FC<RateCardModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-[#FAF9FE]">
          <div>
            <h3 className="text-sm font-extrabold text-zinc-950">
              Official Automation Packages & Scope Document
            </h3>
            <span className="text-[11px] text-zinc-500 font-mono">
              Isaac Mason | Websites & Automation (GBP)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/aistudio/Isaac_Mason_Automation_Packages__1__ab22a62a.pdf"
              download="Isaac_Mason_Automation_Packages.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#432888] hover:bg-[#382470] rounded-lg transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body with Scroll */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-zinc-100/60 flex justify-center">
          <div className="bg-white rounded-xl shadow-md p-2 border border-zinc-200 max-w-lg">
            <img
              src="/assets/aistudio/Isaac_Mason_Automation_Packages__1__a528b2a7.png"
              alt="Isaac Mason Official Automation Packages and Rate Card"
              className="w-full h-auto rounded-lg object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-100 bg-white flex items-center justify-between text-xs text-zinc-500">
          <span>Let's simplify your workflow.</span>
          <a
            href="mailto:isaacmason928@gmail.com"
            className="text-[#432888] font-bold hover:underline font-mono"
          >
            isaacmason928@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
