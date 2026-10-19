// Structured data (schema.org JSON-LD) so search engines understand who you are and what you offer.
import { site } from '../data/site';
import { services } from '../data/services';
import { absoluteUrl } from './url';

const personId = () => `${absoluteUrl('/')}#person`;

export function personSchema(imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: site.name,
    // Short forms people search for, so Google ties them to this person.
    alternateName: ['Bhaumik Singh', 'Bhaumik Chauhan'],
    description: site.seo.description,
    jobTitle: 'Freelance Backend & Web Developer',
    url: absoluteUrl('/'),
    ...(imageUrl ? { image: imageUrl } : {}),
    email: `mailto:${site.email}`,
    sameAs: [site.socials.linkedin, site.socials.github],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'Node.js',
      'Express',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Docker',
      'WhatsApp Business API',
      'Meta Marketing API',
    ],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Galgotias University' },
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    url: absoluteUrl('/'),
    name: site.name,
    publisher: { '@id': personId() },
  };
}

export function serviceSchemas() {
  return services.map((service) => ({
    '@type': 'Service',
    '@id': absoluteUrl(`/services/#${service.id}`),
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/#${service.id}`),
    provider: { '@id': personId() },
    areaServed: 'Worldwide',
  }));
}

/** Marks the home page as Bhaumik's profile page (Google's ProfilePage structured data). */
export function profilePageSchema() {
  return {
    '@type': 'ProfilePage',
    '@id': `${absoluteUrl('/')}#profile`,
    url: absoluteUrl('/'),
    name: site.seo.title,
    mainEntity: { '@id': personId() },
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
