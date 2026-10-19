// Real testimonials only, added with the person's permission.
// The Testimonials section stays hidden while this list is empty.
export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
  /** Link to the source, e.g. a LinkedIn recommendation. */
  url?: string;
  /** Must be true: confirms the person agreed to be quoted. */
  permission: true;
}

export const testimonials: Testimonial[] = [];
