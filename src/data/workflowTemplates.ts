export interface WorkflowBlock {
  id: string;
  type: 'trigger' | 'action';
  title: string;
  category: string;
  app: string;
  appColor: string;
  description: string;
  details: string;
  samplePayload?: Record<string, string | number>;
}

export interface CanvasStep extends WorkflowBlock {
  instanceId: string;
  customConfig?: {
    channel?: string;
    delay?: string;
    notes?: string;
  };
}

export const AVAILABLE_TRIGGERS: WorkflowBlock[] = [
  {
    id: 'trig-form',
    type: 'trigger',
    title: 'Website Enquiry Form',
    category: 'Lead Capture',
    app: 'Webform',
    appColor: '#382470',
    description: 'Fires instantly when a visitor submits any quote or enquiry form on your site.',
    details: 'Captures full name, email, phone, requested service, and message payload.',
    samplePayload: {
      leadName: 'James Whitfield',
      company: 'Apex Logistics Ltd',
      serviceRequested: 'Operations Workflow Automation',
      estimatedValue: '£3,500',
      source: 'Contact Form (isaacmason.co)',
    },
  },
  {
    id: 'trig-booking',
    type: 'trigger',
    title: 'Appointment Scheduled',
    category: 'Calendar',
    app: 'Calendly',
    appColor: '#006BFF',
    description: 'Triggers when a prospect selects an available slot on your booking link.',
    details: 'Extracts booking date, attendee timezone, answers to intake questions, and Google Meet URL.',
    samplePayload: {
      client: 'Dr. Elena Rostova',
      callType: '30-Min Discovery Strategy',
      bookingSlot: 'Tomorrow at 14:00 GMT',
      calendarEventId: 'cal_event_88291',
    },
  },
  {
    id: 'trig-payment',
    type: 'trigger',
    title: 'Stripe Invoice Paid',
    category: 'Billing',
    app: 'Stripe',
    appColor: '#635BFF',
    description: 'Fires when a client completes deposit or retainer payment.',
    details: 'Detects amount paid, currency, invoice ID, and customer billing address.',
    samplePayload: {
      invoiceId: 'inv_2026_089',
      amountPaid: '£599.00 GBP',
      customerEmail: 'finance@peakdental.co.uk',
      status: 'succeeded',
    },
  },
  {
    id: 'trig-unanswered',
    type: 'trigger',
    title: 'Unanswered Lead (48h)',
    category: 'Follow-up',
    app: 'Lead Tracker',
    appColor: '#D97706',
    description: 'Checks for sent quotes or proposals with no client response after 48 hours.',
    details: 'Filters leads by status = "Awaiting Reply" and daysInactive >= 2.',
    samplePayload: {
      lead: 'Marcus Vance',
      quoteSent: '48h ago',
      lastStatus: 'Proposal Viewed',
      followUpAttempt: 1,
    },
  },
];

export const AVAILABLE_ACTIONS: WorkflowBlock[] = [
  {
    id: 'act-ack',
    type: 'action',
    title: 'Instant Customer Acknowledgment',
    category: 'Client Comms',
    app: 'Email / WhatsApp',
    appColor: '#10B981',
    description: 'Sends an immediate, personalized reply to confirm receipt within 8 seconds.',
    details: 'Includes customer name, estimated turnaround, and next steps link.',
  },
  {
    id: 'act-crm',
    type: 'action',
    title: 'Sync to Lead Tracker / CRM',
    category: 'Database',
    app: 'Airtable / HubSpot',
    appColor: '#EC4899',
    description: 'Creates a clean, categorized record with automatic lead scoring and timestamps.',
    details: 'Stores contact info, budget range, and assigns pipeline stage to "New Lead".',
  },
  {
    id: 'act-notify',
    type: 'action',
    title: 'Owner Instant Notification',
    category: 'Alerts',
    app: 'Slack / Mobile SMS',
    appColor: '#8B5CF6',
    description: 'Pushes priority lead details to your phone so you can respond in minutes.',
    details: 'Sends a formatted rich notification with 1-tap call or reply buttons.',
  },
  {
    id: 'act-reminders',
    type: 'action',
    title: 'Confirmed Appointment Reminders',
    category: 'Scheduling',
    app: 'SMS / Calendar',
    appColor: '#0284C7',
    description: 'Dispatches automated 24-hour and 2-hour SMS/email reminders to eliminate no-shows.',
    details: 'Includes reschedule link, meeting details, and calendar invite attachments.',
  },
  {
    id: 'act-followup',
    type: 'action',
    title: 'Unanswered-Enquiry Follow-Up',
    category: 'Retention',
    app: 'Smart Email',
    appColor: '#F59E0B',
    description: 'Sends an authentic, non-pushy check-in to re-engage cold prospect inquiries.',
    details: 'Pulls dynamic quote reference and prompts if they have any remaining questions.',
  },
  {
    id: 'act-onboarding',
    type: 'action',
    title: 'Customer Onboarding Pack',
    category: 'Operations',
    app: 'Google Drive / Notion',
    appColor: '#059669',
    description: 'Automatically provisions a dedicated client folder, kickoff checklist, and welcome guide.',
    details: 'Shares permissions with the client and creates intake action items.',
  },
  {
    id: 'act-invoicing',
    type: 'action',
    title: 'Quote or Invoice Reminders',
    category: 'Finance',
    app: 'Xero / Stripe',
    appColor: '#6366F1',
    description: 'Monitors unpaid invoices and sends friendly automated payment reminders.',
    details: 'Triggers 3 days before due date and on the morning of payment deadline.',
  },
];

export interface PresetWorkflow {
  id: string;
  name: string;
  packageId: string;
  packagePrice: string;
  badge: string;
  description: string;
  estimatedHoursSaved: number;
  responseSpeed: string;
  blocks: WorkflowBlock[];
}

export const PRESET_WORKFLOWS: PresetWorkflow[] = [
  {
    id: 'preset-essential',
    name: '01. Essential Pipeline',
    packageId: 'essential',
    packagePrice: '£199',
    badge: 'Essential Package',
    description: 'Connects your website enquiry form to an automated lead tracker with instant customer replies and owner alerts.',
    estimatedHoursSaved: 8,
    responseSpeed: '8 seconds',
    blocks: [
      AVAILABLE_TRIGGERS[0], // Website Enquiry Form
      AVAILABLE_ACTIONS[1],  // Sync to Lead Tracker / CRM
      AVAILABLE_ACTIONS[0],  // Instant Customer Acknowledgment
      AVAILABLE_ACTIONS[2],  // Owner Instant Notification
    ],
  },
  {
    id: 'preset-booking-boost',
    name: '02. Booking Boost Engine',
    packageId: 'booking-boost',
    packagePrice: '£349',
    badge: 'Booking Boost Package',
    description: 'Eliminates no-shows with multi-channel reminders and automatically revives unanswered enquiries after 48 hours.',
    estimatedHoursSaved: 14,
    responseSpeed: 'Immediate',
    blocks: [
      AVAILABLE_TRIGGERS[1], // Appointment Scheduled
      AVAILABLE_ACTIONS[1],  // Sync to Lead Tracker / CRM
      AVAILABLE_ACTIONS[3],  // Confirmed Appointment Reminders
      AVAILABLE_ACTIONS[4],  // Unanswered-Enquiry Follow-Up
    ],
  },
  {
    id: 'preset-business-flow',
    name: '03. Business Flow & Onboarding',
    packageId: 'business-flow',
    packagePrice: '£599',
    badge: 'Business Flow Package',
    description: 'End-to-end client conversion: inquiry capture, automated onboarding pack generation, and automated invoice reminders.',
    estimatedHoursSaved: 22,
    responseSpeed: 'Real-time',
    blocks: [
      AVAILABLE_TRIGGERS[0], // Website Enquiry Form
      AVAILABLE_ACTIONS[1],  // Sync to Lead Tracker / CRM
      AVAILABLE_ACTIONS[5],  // Customer Onboarding Pack
      AVAILABLE_ACTIONS[6],  // Quote or Invoice Reminders
    ],
  },
];
