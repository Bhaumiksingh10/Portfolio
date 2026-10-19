// Questions clients ask. `show` controls which pages list each one.
// PLACEHOLDER: every answer here is a suggestion — make sure it matches how you actually work.
export interface Faq {
  q: string;
  a: string;
  show: ('home' | 'services')[];
}

export const faqs: Faq[] = [
  {
    q: 'You work full-time. How much time can you give my project?',
    a: 'I take on a small number of freelance projects at a time, so each one gets proper attention. I work on client projects on weekday evenings and weekends (IST), and I will give you a realistic timeline before we start.',
    show: ['home', 'services'],
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. I work remotely with clients anywhere. I am on IST (UTC+5:30) and can schedule calls that overlap with European and US hours; everything else happens asynchronously over email, chat and shared docs.',
    show: ['home', 'services'],
  },
  {
    q: 'I only have an idea. Can you help me plan it?',
    a: 'Yes. On an intro call we can turn your idea into a lean first version: the must-have features, a sensible tech stack, and a realistic timeline and budget.',
    show: ['home', 'services'],
  },
  {
    q: 'How do payments work?',
    a: 'For fixed-scope projects, part of the price is paid upfront and the rest across milestones as work is delivered. Clients in India can pay by UPI or bank transfer; international clients by bank transfer or an online service such as Wise or PayPal.',
    show: ['home', 'services'],
  },
  {
    q: 'Who owns the code?',
    a: 'You do. The code lives in your repository from the start, and full ownership is yours once the project is paid for.',
    show: ['services'],
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes, I am happy to sign an NDA before you share the details of your idea.',
    show: ['services'],
  },
  {
    q: 'Can you work on an existing codebase?',
    a: 'Yes. I can fix bugs, add features or improve the performance of an existing Java / Spring Boot or Node.js backend. I start with a short review so the estimate is realistic.',
    show: ['services'],
  },
  {
    q: 'What about hosting and other running costs?',
    a: 'Hosting, domains and paid third-party services are set up on your own accounts, so you stay in control. I will recommend options that fit your budget; many small projects run on free or low-cost plans.',
    show: ['services'],
  },
  {
    q: 'What if I need changes later?',
    a: 'Small adjustments within a milestone are part of the work. Bigger changes in scope are estimated separately before I start them, so the price never surprises you.',
    show: ['services'],
  },
];
