export interface PricingPackage {
  id: string;
  number: string;
  title: string;
  setupPrice: string;
  setupPriceNum: number;
  setupNote: string;
  isPopular?: boolean;
  features: string[];
  connectedApps: string;
  supportDays: string;
  optionalCare: string;
  carePriceNum: number;
  recommendedFor: string;
}

export const PACKAGES_DATA: PricingPackage[] = [
  {
    id: 'essential',
    number: '01',
    title: 'Essential',
    setupPrice: '£199',
    setupPriceNum: 199,
    setupNote: 'One-time setup',
    features: [
      'Enquiry form connected to a lead tracker',
      'Instant customer acknowledgment',
      'New-enquiry notification to the owner',
      'Up to 2 connected apps',
      '7 days of setup support',
    ],
    connectedApps: 'Up to 2 connected apps',
    supportDays: '7 days of setup support',
    optionalCare: '£39/month',
    carePriceNum: 39,
    recommendedFor: 'Solopreneurs & micro-businesses wanting to stop losing contact form enquiries.',
  },
  {
    id: 'booking-boost',
    number: '02',
    title: 'Booking Boost',
    setupPrice: '£349',
    setupPriceNum: 349,
    setupNote: 'One-time setup',
    features: [
      'Everything in Essential',
      'Unanswered-enquiry follow-up',
      'Confirmed appointment reminders',
      'Up to 3 connected apps',
      '14 days of setup support',
    ],
    connectedApps: 'Up to 3 connected apps',
    supportDays: '14 days of setup support',
    optionalCare: '£69/month',
    carePriceNum: 69,
    recommendedFor: 'Clinics, consultants & service businesses losing leads to slow response or no-shows.',
  },
  {
    id: 'business-flow',
    number: '03',
    title: 'Business Flow',
    setupPrice: '£599',
    setupPriceNum: 599,
    setupNote: 'One-time setup',
    isPopular: true,
    features: [
      'Everything in Booking Boost',
      'Customer onboarding',
      'Quote or invoice reminders',
      'Simple lead-status report',
      'Up to 4 apps and 4 agreed workflows',
      '21 days of setup support',
    ],
    connectedApps: 'Up to 4 apps & 4 agreed workflows',
    supportDays: '21 days of setup support',
    optionalCare: '£99/month',
    carePriceNum: 99,
    recommendedFor: 'Growing SMBs needing end-to-end enquiry, client onboarding, and invoice tracking.',
  },
  {
    id: 'connected-business',
    number: '04',
    title: 'Connected Business',
    setupPrice: 'FROM £999',
    setupPriceNum: 999,
    setupNote: 'One-time setup',
    features: [
      'Tailored CRM and booking connections',
      'Payment-status updates',
      'Reporting and team training',
      'Up to 5 apps and 6 agreed workflows',
      '30 days of setup support',
    ],
    connectedApps: 'Up to 5 apps & 6 agreed workflows',
    supportDays: '30 days of setup support',
    optionalCare: 'From £149/month',
    carePriceNum: 149,
    recommendedFor: 'Multi-member teams requiring bespoke CRM architecture and team-wide automation.',
  },
];

export const INCLUDED_WITH_EVERY_SETUP = [
  'Full process planning & architecture review',
  'Live end-to-end edge-case testing',
  'Personalised Loom handover video walkthrough',
  'One full round of in-scope adjustments after testing',
];

export const SCOPE_AND_PAYMENT_TERMS = [
  'Final scope confirmed after reviewing your existing tools & logins.',
  '50% deposit upfront; 50% remainder after testing, verification and handover.',
  'Software subscriptions (e.g., Zapier, Make, CRM) and SMS/WhatsApp usage are paid directly by the client.',
  'Custom APIs, AI agents, large data migration and unsupported integrations are quoted separately.',
  'Optional care covers scheduled health checks, fault fixes, and an agreed monthly allowance for small updates.',
  'New workflows cost extra. A workflow is defined as one agreed process from its trigger through its actions.',
];
