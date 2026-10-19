// Site-wide settings: who you are, how to reach you, and your availability.
// Lines marked PLACEHOLDER are suggestions — rewrite them in your own words.

export type AvailabilityStatus = 'open' | 'limited' | 'booked';

interface SiteConfig {
  name: string;
  firstName: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  email: string;
  socials: { linkedin: string; github: string };
  /** WhatsApp number in international format, digits only (e.g. '919876543210'). Empty = hidden. */
  whatsapp: string;
  /** Booking link for a free intro call (Cal.com / Calendly). Empty = hidden. */
  calUrl: string;
  /** Resume PDF. After adding public/resume.pdf, change this to '/resume.pdf'. */
  resumeUrl: string;
  /** Contact form delivery via web3forms.com. The access key is public by design. Empty = email links instead of the form. */
  web3forms: { accessKey: string; hcaptcha: boolean };
  /** Optional, cookie-free analytics. */
  analytics: { provider: null | 'goatcounter' | 'cloudflare'; id: string };
  /** googleVerification: the code from Google Search Console's "HTML tag" method (only the content="..." part). */
  seo: { title: string; description: string; ogImage: string; googleVerification: string };
  /** Words between *asterisks* get the yellow highlighter. */
  hero: { headline: string; note: string; intro: string };
  bio: string[];
  resumeSummary: string;
  availability: {
    status: AvailabilityStatus;
    labels: Record<AvailabilityStatus, string>;
    hours: string;
    responseTime: string;
    /** Shown when status is 'booked', e.g. 'New projects from December'. */
    nextOpening: string;
  };
}

export const site: SiteConfig = {
  name: 'Bhaumik Singh Chauhan',
  firstName: 'Bhaumik',
  role: 'Backend Developer',
  tagline: 'Backend & web developer · Java · Spring Boot · Node.js',
  location: 'India',
  timezone: 'IST (UTC+5:30)',
  email: 'bhaumiksingh10@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/bhaumik-singh-chauhan-84148a271/',
    github: 'https://github.com/Bhaumiksingh10',
  },
  whatsapp: '',
  calUrl: '',
  resumeUrl: 'https://drive.google.com/file/d/1dnt5dabo-zCwvQWLEEqogzEvORej5jip/view?usp=drive_link',
  web3forms: { accessKey: '', hcaptcha: false },
  analytics: { provider: null, id: '' },
  seo: {
    title: 'Bhaumik Singh Chauhan — Freelance Backend & Web Developer',
    description:
      'Freelance backend & web developer (Java, Spring Boot, Node.js). I build REST APIs, WhatsApp, payment and third-party integrations, and complete web apps for startups and businesses.',
    ogImage: '/og/default.png',
    googleVerification: '',
  },
  // PLACEHOLDER: the home page headline and intro — make them sound like you.
  hero: {
    headline: 'I build *backends*, integrations & web apps.',
    note: 'the parts of an app nobody sees, but everyone relies on',
    intro:
      "I'm Bhaumik, a backend developer from India. I work full-time at a SaaS product company and take on a small number of freelance projects, built carefully with Java, Spring Boot and Node.js, and explained in plain words.",
  },
  bio: [
    "I'm drawn to the parts of a product most people never see: the APIs that hold everything together, the schemas that make data fast to query, the auth layer that quietly keeps things safe. Across every role and project, I've built systems meant to be trusted in production, not just to work in a demo.",
    "My work has taught me that good backend engineering is invisible when it's right: clean contracts, predictable failures, and code the next engineer can actually read.",
    'Today I work full-time as a software developer and take on a small number of freelance projects, so every client gets focused, careful work.', // PLACEHOLDER
  ],
  resumeSummary:
    'Backend developer with production experience building REST APIs, third-party integrations and data-heavy systems in Java / Spring Boot and Node.js. Currently a full-time Software Developer at a SaaS product company, and available for freelance projects.',
  availability: {
    status: 'limited',
    labels: {
      open: 'Available for new projects',
      limited: 'Taking on a small number of projects',
      booked: 'Fully booked right now',
    },
    hours: 'Weekday evenings & weekends (IST)', // PLACEHOLDER
    responseTime: 'within 24 hours', // PLACEHOLDER
    nextOpening: '',
  },
};

/** Click-to-chat link, or '' when no WhatsApp number is set. */
export function whatsappUrl(text = `Hi ${site.firstName}, I found your portfolio and have a project in mind.`): string {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : '';
}
