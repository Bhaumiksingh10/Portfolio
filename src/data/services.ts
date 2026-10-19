// What you offer to clients. The ids are used for page anchors (/services/#web-apps),
// the contact form's "What do you need?" field, and case-study links.
import type { IconName } from '../lib/icons';

export const SERVICE_IDS = ['backend-apis', 'integrations', 'web-apps'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export interface Service {
  id: ServiceId;
  title: string;
  icon: IconName;
  /** A few handwritten words on the card's corner. */
  scribble: string;
  summary: string;
  forWho: string[];
  deliverables: string[];
  timeline: string;
  /** Optional "starting from" price. Leave both empty to hide pricing. */
  startingFrom?: { inr?: string; usd?: string };
  /** Case-study ids (file names in src/content/work) that prove this service. */
  proof: string[];
  proofNote?: string;
}

export const services: Service[] = [
  {
    id: 'backend-apis',
    title: 'Backend & REST APIs',
    icon: 'server',
    scribble: 'most asked!',
    summary:
      'The server side of your web or mobile app: clean, documented REST APIs in Spring Boot or Node.js, with secure login, user roles and a database designed to stay fast as you grow.',
    forWho: [
      'Startups that need a backend for a web or mobile app',
      'Teams with a frontend ready but no backend developer',
      'Products that have outgrown a quick prototype',
    ],
    deliverables: [
      'REST API in Spring Boot or Node.js / Express',
      'Login and user roles with JWT and role-based access',
      'Database schema and indexing (PostgreSQL, MySQL or MongoDB)',
      'API documentation (OpenAPI / Swagger) and a Postman collection',
      'Docker setup and deployment to your server or cloud',
    ],
    timeline: 'Typically 2–6 weeks for an MVP backend', // PLACEHOLDER
    startingFrom: { inr: '', usd: '' },
    proof: ['hireflow', 'interview-scheduling-platform'],
  },
  {
    id: 'integrations',
    title: 'Integrations & automation',
    icon: 'plug',
    scribble: 'WhatsApp, payments...',
    summary:
      'Connect your product to the services your business runs on: WhatsApp Business and Meta APIs, payment gateways, Google sign-in, webhooks and automated workflows.',
    forWho: [
      'Businesses that want to reach customers on WhatsApp',
      'Apps that need payments, social login or third-party data',
      'Teams copying data between tools by hand',
    ],
    deliverables: [
      'WhatsApp Business and Meta (Marketing / Graph) API integration',
      'Payment gateways such as Razorpay or Stripe',
      'OAuth logins (Google, Meta) with secure token handling',
      'Webhooks, scheduled jobs and workflow automation',
      'Retries, error handling and logs so failures never go unnoticed',
    ],
    timeline: 'Typically 1–3 weeks per integration', // PLACEHOLDER
    startingFrom: { inr: '', usd: '' },
    proof: ['whatsapp-campaign-platform'],
  },
  {
    id: 'web-apps',
    title: 'Complete websites & web apps',
    icon: 'layers',
    scribble: 'start to finish',
    summary:
      'From idea to launched product: backend, a clean responsive frontend and deployment, handled end to end by one developer who owns the whole thing.',
    forWho: [
      'Founders who want an MVP built end to end',
      'Small businesses that need a fast website or an internal tool',
      'Anyone ready to replace spreadsheets with a proper app',
    ],
    deliverables: [
      'A lean first-version scope and plan',
      'Responsive, fast frontend, with an admin area where needed',
      'Backend, database and authentication',
      'Deployment, domain and analytics set up',
      'Handover docs, so you are never locked in',
    ],
    timeline: 'Typically 3–8 weeks, depending on scope', // PLACEHOLDER
    startingFrom: { inr: '', usd: '' },
    proof: ['hireflow', 'intellilib'],
    proofNote: 'This website too: built with Astro and deployed automatically on every change.',
  },
];

export const supportAddOn = {
  title: 'Maintenance & support',
  summary:
    'After launch I can stay on for bug fixes, small features, dependency updates and monitoring, on a simple monthly plan or as needed.', // PLACEHOLDER
};

export const engagementModels = [
  {
    title: 'Fixed-scope project',
    icon: 'clipboard',
    bestFor: 'Well-defined builds: an MVP, an API or an integration.',
    howItWorks: 'We agree on scope, milestones and a fixed price before any work starts.',
    billing: 'Paid per milestone',
  },
  {
    title: 'Hourly',
    icon: 'clock',
    bestFor: 'Small tasks, fixes, or work on an existing codebase.',
    howItWorks: 'You pay only for the time spent, with a short summary of what was done.',
    billing: 'Billed weekly or monthly',
  },
  {
    title: 'Monthly support',
    icon: 'refresh',
    bestFor: 'Ongoing improvements and maintenance after launch.',
    howItWorks: 'A set number of hours each month for fixes, updates and small features.',
    billing: 'Monthly retainer',
  },
] satisfies { title: string; icon: IconName; bestFor: string; howItWorks: string; billing: string }[]; // PLACEHOLDER

export const principles = [
  { title: 'Clear communication', icon: 'message', text: 'Regular progress updates and quick replies. You always know where the project stands.' },
  { title: 'Your code, your repo', icon: 'shield', text: 'Work is committed to your repository from day one, and the code is fully yours once the project is paid for.' },
  { title: 'Built to last', icon: 'zap', text: 'Readable code, sensible tests and documentation the next developer can follow.' },
  { title: 'Honest estimates', icon: 'check-circle', text: 'If something will take longer or cost more, you hear about it early, not at the deadline.' },
] satisfies { title: string; icon: IconName; text: string }[]; // PLACEHOLDER

export function getService(id: ServiceId): Service {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

export function formatStartingFrom(price: Service['startingFrom']): string {
  if (!price) return '';
  return [price.inr, price.usd].filter(Boolean).join(' / ');
}
