// Work history, newest first. The current employer is intentionally not named.
export interface Experience {
  role: string;
  org: string;
  type: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
}

export const experience: Experience[] = [
  {
    role: 'Software Developer',
    org: 'SaaS product company',
    type: 'Full-time',
    period: '2026 – Present', // PLACEHOLDER: add your start month
    current: true,
    summary:
      'Building and maintaining backend services and third-party integrations for a SaaS product used by businesses.', // PLACEHOLDER
  },
  {
    role: 'Software Development Engineer Intern',
    org: 'SaaS product company',
    type: 'Internship',
    period: 'Apr 2026 – Aug 2026',
    summary:
      'Built the Node.js/Express backend for a WhatsApp Business platform, including Meta Marketing API integration for campaign management and Ad Account mapping.',
  },
  {
    role: 'Backend Development Intern',
    org: 'CodeSoft',
    type: 'Internship',
    period: 'Jul 2025 – Sep 2025',
    location: 'Remote',
    summary:
      'Built a Smart Interview Scheduling Platform in Spring Boot: 15+ REST APIs, JWT auth, and MySQL query tuning for 100+ active users.',
  },
];
