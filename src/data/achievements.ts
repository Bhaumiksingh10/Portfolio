import type { IconName } from '../lib/icons';

export interface Achievement {
  title: string;
  icon: IconName;
  text: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Best Paper Award',
    icon: 'trophy',
    text: 'International Symposium on AI Frontiers 2.0, for research on an ANN-based recommendation system reaching 88.6% accuracy and a P@10 of 0.77.',
  },
  {
    title: '350+ Problems Solved',
    icon: 'code',
    text: 'Competitive programming across Java and Python, strengthening algorithmic thinking and problem-solving under pressure.',
  },
  {
    title: 'Campus Leadership',
    icon: 'users',
    text: 'Led 39 students on social work initiatives, mentored 10 freshmen, and captained a 30+ team Valorant tournament win as In-Game Leader.',
  },
];

export const publication = {
  // PLACEHOLDER: replace with the exact paper title, and add a DOI / PDF link to `url` to show the button.
  title: 'ANN-based recommendation engine for a digital library system (IntelliLib)',
  venue: 'International Symposium on AI Frontiers 2.0',
  award: 'Best Paper Award',
  url: '',
};

/** Headline numbers for the home page. Each one links to the case study it comes from. */
export const highlights = [
  { value: '40%', label: 'less manual coordination', work: 'interview-scheduling-platform' },
  { value: '30%', label: 'faster backend responses', work: 'interview-scheduling-platform' },
  { value: '20+', label: 'REST APIs in one platform', work: 'hireflow' },
  { value: 'Best Paper', label: 'AI Frontiers 2.0', work: 'intellilib' },
];
