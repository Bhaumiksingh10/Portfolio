// Your Giving Back page. Individual drives (with photos) live in src/content/drives/.
// Lines marked PLACEHOLDER are suggestions — rewrite them in your own words.
import type { IconName } from '../lib/icons';

export const FOCUS_IDS = ['food-clothes', 'animals-environment'] as const;
export type FocusId = (typeof FOCUS_IDS)[number];

export const giving = {
  name: 'Giving Back with Bhaumik', // PLACEHOLDER: change this once you pick a name
  intro:
    'A small, personal effort to help people and animals around me, one drive at a time. There is no organisation and no donations: just my time, my own money, and friends who want to join.',
  story: [
    'In college I led 39 students on social work initiatives. Seeing how much a few hours could change for someone has stayed with me.',
    'Now that I work full-time, I want to keep that habit alive: small drives at regular intervals, starting in my own city, with friends who want to help.',
  ], // PLACEHOLDER: tell it in your own words
  focus: [
    {
      id: 'food-clothes',
      title: 'Food & clothes',
      icon: 'shirt',
      text: 'Meals and warm clothes for people who need them.',
      ideas: [
        'Winter clothes and blanket drives',
        'Food packets for daily-wage workers and people living on the street',
        'Collecting outgrown clothes from friends, then washing and sorting them before giving',
      ],
    },
    {
      id: 'animals-environment',
      title: 'Animals & environment',
      icon: 'paw',
      text: 'Care for street animals, and greener, cleaner streets.',
      ideas: [
        'Clean water bowls for street animals through the summer',
        'Feeding street dogs together with local animal lovers',
        'Planting saplings in the monsoon, and looking after them',
        'Clean-up drives in parks and around water bodies',
      ],
    },
  ] satisfies { id: FocusId; title: string; icon: IconName; text: string; ideas: string[] }[],
  promises: [
    { title: 'No donations', text: "I don't collect money. Every drive is paid for by me and the friends who join." },
    { title: 'Dignity first', text: 'Photos only with permission. No pity shots, and never photos of children from shelters.' },
    { title: 'Small and regular', text: 'One small drive done regularly beats one big event a year.' },
    { title: 'Open record', text: 'Every drive is written down on this page: what we did, where, and who joined.' },
  ],
  join: {
    title: 'Want to join a drive?',
    text: "Bring a friend, a bag of warm clothes, or just a free Sunday morning. Message me and I'll tell you about the next one.",
  },
  // Established groups people can join wherever they live.
  elsewhere: [
    { name: 'Goonj', url: 'https://goonj.org', text: 'Clothes and material drives across India' },
    { name: 'Robin Hood Army', url: 'https://robinhoodarmy.com', text: 'Volunteers who share surplus food in many cities' },
  ],
  disclaimer:
    'Giving Back with Bhaumik is a personal volunteer effort. It is not a registered NGO or charity, and it does not accept donations.',
};
