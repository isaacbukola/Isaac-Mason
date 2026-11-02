import React from 'react';
import { 
  Globe, 
  MessageSquare, 
  Calendar, 
  FileCheck, 
  Workflow, 
  ArrowUpRight,
  Database,
  Send,
  BellRing
} from 'lucide-react';

export const Capabilities: React.FC = () => {
  const capabilitiesList = [
    {
      num: '01',
      title: 'High-Converting Website & Enquiry Capture',
      description:
        'A website that actually gathers qualified prospect information. We build modern, lightning-fast sites or embed high-intent intake forms into your existing WordPress, Webflow, Squarespace, or custom web stack.',
      tags: ['Custom Websites', 'Enquiry Forms', 'Spam Filtering', 'Instant Webhooks'],
      outcome: 'Zero lost leads from broken contact forms',
    },
    {
      num: '02',
      title: 'Instant Customer Acknowledgment & Lead Tracker',
      description:
        'When a prospective client contacts your business, speed to lead determines who gets the deal. We set up automated email and WhatsApp replies in under 15 seconds, while pushing organized records straight into Airtable or your CRM.',
      tags: ['Airtable', 'Google Sheets', 'HubSpot', 'WhatsApp API', 'Email Auto-reply'],
      outcome: 'Lead response time cut from 4 hours to 8 seconds',
    },
    {
      num: '03',
      title: 'Appointment Booking & No-Show Elimination',
      description:
        'End the painful "what time works for you?" email ping-pong. We configure friction-free scheduling integrated with your Google or Outlook calendar, with automated 24-hour and 2-hour SMS reminders that dramatically slash no-shows.',
      tags: ['Calendly', 'Cal.com', 'Google Calendar', 'Twilio SMS', 'Timezone Sync'],
      outcome: 'Up to 80% reduction in appointment no-shows',
    },
    {
      num: '04',
      title: 'Customer Onboarding, Invoicing & Admin Flow',
      description:
        'The moment an invoice or agreement is signed, your backend immediately provisions the client folder, welcome email, Notion workspace, and task assignments—without you typing a single repetitive word.',
      tags: ['Stripe', 'Xero', 'Notion', 'Google Drive', 'Payment Chase Sequences'],
      outcome: 'Save 10–20 hours of manual admin on every new client',
    },
  ];

  const toolsList = [
    'Make.com',
    'Zapier',
    'Airtable',
    'Notion',
    'Stripe',
    'Calendly',
    'WhatsApp Business',
    'Google Workspace',
    'HubSpot',
    'WordPress',
    'Webflow',
    'Twilio',
  ];

  return (
    <section id="capabilities" className="py-16 md:py-24 border-b border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888] mb-2">
            <span>Specialist Capabilities</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>End-to-End Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            What I automate for your business.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-2">
            Every business has manual bottlenecks where inquiries wait, reminders get forgotten, and paperwork piles up. Here is how we remove them:
          </p>
        </div>

        {/* Asymmetric Bento-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {capabilitiesList.map((cap) => (
            <div
              key={cap.num}
              className="group p-7 rounded-2xl bg-zinc-50/70 border border-zinc-200/90 hover:border-purple-300 hover:bg-[#FAF9FE] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#432888] bg-purple-100/80 px-2 py-0.5 rounded border border-purple-200/60">
                    {cap.num}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {cap.outcome}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-[#432888] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              {/* Tags with clean unboxed metadata */}
              <div className="pt-4 border-t border-zinc-200/60 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-500 font-medium">
                {cap.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {i < cap.tags.length - 1 && <span aria-hidden="true" className="text-zinc-300">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Supported Tools Ecosystem Strip */}
        <div className="p-6 bg-[#FAF9FE] rounded-2xl border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                Integrated Tools & Ecosystem
              </span>
              <p className="text-xs text-zinc-600 mt-0.5">
                I connect directly into the tools your team already uses—no painful software migrations required.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {toolsList.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white rounded-lg border border-zinc-200 shadow-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
