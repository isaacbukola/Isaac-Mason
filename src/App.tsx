import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AutomationWorkspace } from './components/AutomationWorkspace';
import { PricingSection } from './components/PricingSection';
import { Capabilities } from './components/Capabilities';
import { Process } from './components/Process';
import { AboutSection } from './components/AboutSection';
import { OutreachContactForm } from './components/OutreachContactForm';
import { Footer } from './components/Footer';
import { RateCardModal } from './components/RateCardModal';

export default function App() {
  const [rateCardOpen, setRateCardOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('business-flow');
  const [customWorkflowNote, setCustomWorkflowNote] = useState('');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    scrollTo('contact');
  };

  const handleSelectPackageForOutreach = (packageId: string, note?: string) => {
    setSelectedPackageId(packageId);
    if (note) {
      setCustomWorkflowNote(note);
    }
    scrollTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-zinc-900 selection:bg-[#432888] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenRateCard={() => setRateCardOpen(true)}
        onSelectPackage={handleSelectPackage}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToWorkspace={() => scrollTo('workspace')}
          onScrollToPackages={() => scrollTo('packages')}
          onScrollToContact={() => scrollTo('contact')}
        />

        {/* Centerpiece: Interactive Practical Workspace of Automation */}
        <AutomationWorkspace
          onSelectPackageForOutreach={handleSelectPackageForOutreach}
        />

        {/* Pricing Packages Section (Based on Attached PDF & Image) */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
          onOpenRateCard={() => setRateCardOpen(true)}
        />

        {/* What I Automate / Capabilities */}
        <Capabilities />

        {/* How It Works Delivery Process */}
        <Process />

        {/* About Isaac Mason */}
        <AboutSection
          onScrollToContact={() => scrollTo('contact')}
        />

        {/* Outreach Contact & Project Consultation Form */}
        <OutreachContactForm
          selectedPackageId={selectedPackageId}
          onPackageChange={setSelectedPackageId}
          customWorkflowNote={customWorkflowNote}
        />
      </main>

      {/* Footer */}
      <Footer onOpenRateCard={() => setRateCardOpen(true)} />

      {/* Rate Card Modal */}
      <RateCardModal
        isOpen={rateCardOpen}
        onClose={() => setRateCardOpen(false)}
      />
    </div>
  );
}
