import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, Copy, Check, Sparkles, Phone, Building2 } from 'lucide-react';
import { PACKAGES_DATA } from '../data/packagesData';

interface OutreachContactFormProps {
  selectedPackageId: string;
  onPackageChange: (id: string) => void;
  customWorkflowNote?: string;
}

export const OutreachContactForm: React.FC<OutreachContactFormProps> = ({
  selectedPackageId,
  onPackageChange,
  customWorkflowNote,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>(['Google Sheets', 'Calendly']);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableToolsList = [
    'WordPress',
    'Webflow',
    'Shopify',
    'Calendly',
    'Google Sheets / Drive',
    'Airtable',
    'HubSpot',
    'Stripe / Xero',
    'WhatsApp Business',
    'Notion',
  ];

  // Sync custom workflow note if passed from workspace
  useEffect(() => {
    if (customWorkflowNote) {
      setMessage((prev) => {
        if (prev.includes(customWorkflowNote)) return prev;
        return prev ? `${prev}\n\n[Attached Pipeline]: ${customWorkflowNote}` : `[Attached Pipeline]: ${customWorkflowNote}`;
      });
    }
  }, [customWorkflowNote]);

  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'success' | 'fallback'>('idle');
  const [savedLeadsCount, setSavedLeadsCount] = useState<number>(0);
  const [showLeadsModal, setShowLeadsModal] = useState<boolean>(false);
  const [storedLeads, setStoredLeads] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('isaac_mason_leads_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        setStoredLeads(parsed);
        setSavedLeadsCount(parsed.length);
      }
    } catch {
      // ignore
    }
  }, [isSubmitted]);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const currentPkg = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[0];

  const formattedInquiryText = `Hi Isaac,\n\nI'm interested in working together on automation for ${businessName || 'my business'}.\n\nPackage: ${currentPkg.title} (${currentPkg.setupPrice})\nCurrent Tools: ${selectedTools.join(', ')}\n\nDetails: ${message || 'I want to streamline our enquiries and scheduling.'}\n\nBest regards,\n${name} (${email}, ${phone || 'no phone provided'})`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    const leadRecord = {
      id: `lead_${Date.now()}`,
      timestamp: new Date().toLocaleString('en-GB'),
      name,
      email,
      businessName: businessName || 'Not specified',
      phone: phone || 'Not provided',
      package: `${currentPkg.title} (${currentPkg.setupPrice})`,
      tools: selectedTools,
      message: message || 'Streamline enquiries & administrative workflows',
    };

    // 1. Save to local lead storage immediately so no inquiry is ever lost
    try {
      const existing = localStorage.getItem('isaac_mason_leads_db');
      const leadsArray = existing ? JSON.parse(existing) : [];
      leadsArray.unshift(leadRecord);
      localStorage.setItem('isaac_mason_leads_db', JSON.stringify(leadsArray));
      setStoredLeads(leadsArray);
      setSavedLeadsCount(leadsArray.length);
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // 2. Dispatch live HTTP email delivery to isaacmason928@gmail.com
    try {
      const response = await fetch('https://formsubmit.co/ajax/isaacmason928@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry: ${name} (${businessName || 'Business'}) - ${currentPkg.title}`,
          Client_Name: name,
          Client_Email: email,
          Business_Name: businessName || 'N/A',
          Phone_Number: phone || 'N/A',
          Selected_Package: `${currentPkg.title} (${currentPkg.setupPrice})`,
          Connected_Tools: selectedTools.join(', '),
          Project_Requirements: message || 'N/A',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setDispatchStatus('success');
      } else {
        setDispatchStatus('fallback');
      }
    } catch {
      setDispatchStatus('fallback');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedInquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Simplify Your Workflow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Ready to eliminate manual admin in your business?
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed">
              Whether you received my outreach message or found this page looking for website and automation consulting, send over your current tools and bottlenecks. I typically respond within a few hours.
            </p>

            <div className="p-5 bg-[#FAF9FE] rounded-2xl border border-purple-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#432888] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide block">
                    Direct Email
                  </span>
                  <a
                    href="mailto:isaacmason928@gmail.com"
                    className="text-sm font-bold text-zinc-950 hover:text-[#432888] font-mono transition-colors"
                  >
                    isaacmason928@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-100 text-xs text-zinc-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#432888] shrink-0" />
                  <span>Free 15-minute feasibility & workflow review</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#432888] shrink-0" />
                  <span>Fixed upfront quote with zero hidden hourly fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#432888] shrink-0" />
                  <span>50% deposit / 50% remainder after full testing & handover</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#FAF9FE] rounded-3xl border border-purple-200 shadow-sm">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active: Dispatched to isaacmason928@gmail.com</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-zinc-950">
                    Enquiry Received!
                  </h3>
                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thanks <span className="font-semibold text-zinc-900">{name}</span>. Your enquiry for{' '}
                    <span className="font-semibold text-[#432888]">{currentPkg.title} ({currentPkg.setupPrice})</span> has been submitted. I will review your tools and reply directly to{' '}
                    <span className="font-mono text-zinc-800 font-medium">{email}</span>.
                  </p>

                  <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:isaacmason928@gmail.com?subject=Project%20Inquiry%20-%20${encodeURIComponent(
                        businessName || name
                      )}&body=${encodeURIComponent(formattedInquiryText)}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#432888] hover:bg-[#382470] rounded-xl transition-all shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Your Email Client</span>
                    </a>

                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Inquiry Summary'}</span>
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                    {savedLeadsCount > 0 && (
                      <button
                        onClick={() => setShowLeadsModal(true)}
                        className="text-xs font-semibold text-[#432888] hover:underline cursor-pointer"
                      >
                        View Recorded Inquiries ({savedLeadsCount})
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                    <h3 className="text-lg font-bold text-zinc-950">
                      Start Your Project Consultation
                    </h3>
                    <span className="text-xs font-mono text-[#432888] font-bold">
                      {currentPkg.title} · {currentPkg.setupPrice}
                    </span>
                  </div>

                  {/* Package Selector Pills */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-2">
                      Selected Package:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PACKAGES_DATA.map((pkg) => {
                        const active = selectedPackageId === pkg.id;
                        return (
                          <button
                            type="button"
                            key={pkg.id}
                            onClick={() => onPackageChange(pkg.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              active
                                ? 'bg-[#432888] text-white border-[#432888] shadow-xs'
                                : 'bg-white text-zinc-700 border-zinc-200 hover:border-purple-300'
                            }`}
                          >
                            <span className="block text-xs font-bold truncate">{pkg.title}</span>
                            <span className={`block text-[11px] font-mono ${active ? 'text-purple-200' : 'text-zinc-500'}`}>
                              {pkg.setupPrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#432888]/20 focus:border-[#432888]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.co.uk"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#432888]/20 focus:border-[#432888]"
                      />
                    </div>
                  </div>

                  {/* Business Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Business Name or Website URL
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Health Clinic / apexhealth.co.uk"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#432888]/20 focus:border-[#432888]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7700 900000"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#432888]/20 focus:border-[#432888]"
                      />
                    </div>
                  </div>

                  {/* Current Tools in Use */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-2">
                      Tools your business currently uses (select all that apply):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableToolsList.map((tool) => {
                        const selected = selectedTools.includes(tool);
                        return (
                          <button
                            type="button"
                            key={tool}
                            onClick={() => toggleTool(tool)}
                            className={`px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                              selected
                                ? 'bg-purple-100 text-[#432888] border-purple-300 font-semibold'
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                            }`}
                          >
                            {selected ? `✓ ${tool}` : tool}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Details / Bottlenecks */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      What repetitive task or enquiry bottleneck would you like automated?
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g., We receive about 15 web inquiries a week, but reply times are slow. We need instant WhatsApp acknowledgments and automatic reminders for consultation calls."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#432888]/20 focus:border-[#432888] leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 text-xs font-bold text-white bg-[#432888] hover:bg-[#382470] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Enquiry...' : `Send Project Enquiry to Isaac Mason`}</span>
                    </button>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100">
                      <span>Direct email: isaacmason928@gmail.com</span>
                      {savedLeadsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowLeadsModal(true)}
                          className="text-[#432888] font-bold hover:underline cursor-pointer"
                        >
                          View Local Inquiries Vault ({savedLeadsCount})
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Local Inquiries Modal */}
        {showLeadsModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLeadsModal(false)}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-zinc-100 bg-[#FAF9FE] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950">
                    Recorded Client Inquiries ({storedLeads.length})
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Saved in browser storage & dispatched to isaacmason928@gmail.com
                  </span>
                </div>
                <button
                  onClick={() => setShowLeadsModal(false)}
                  className="px-3 py-1 text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-4">
                {storedLeads.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic text-center py-8">
                    No inquiries recorded yet. Submit a test inquiry to see it here!
                  </p>
                ) : (
                  storedLeads.map((item, idx) => (
                    <div 
                      key={item.id || idx} 
                      className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-900 text-sm">{item.name}</span>
                        <span className="text-[11px] font-mono text-zinc-400">{item.timestamp}</span>
                      </div>
                      <div className="text-zinc-600">
                        <span className="font-semibold text-zinc-800">Email:</span> {item.email}
                        {item.phone && item.phone !== 'Not provided' && (
                          <span className="ml-3"><span className="font-semibold text-zinc-800">Phone:</span> {item.phone}</span>
                        )}
                      </div>
                      <div className="text-zinc-600">
                        <span className="font-semibold text-zinc-800">Business:</span> {item.businessName} · <span className="font-semibold text-[#432888]">{item.package}</span>
                      </div>
                      {item.tools && item.tools.length > 0 && (
                        <div className="text-zinc-500 text-[11px]">
                          Tools: {Array.isArray(item.tools) ? item.tools.join(', ') : item.tools}
                        </div>
                      )}
                      <div className="text-zinc-700 bg-white p-2.5 rounded-lg border border-zinc-200/80 mt-2">
                        {item.message}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    localStorage.removeItem('isaac_mason_leads_db');
                    setStoredLeads([]);
                    setSavedLeadsCount(0);
                  }}
                  className="text-rose-600 hover:underline cursor-pointer"
                >
                  Clear History
                </button>
                <span className="text-zinc-500 font-mono">isaacmason928@gmail.com</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

