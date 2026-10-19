import type { IconName } from '../lib/icons';

export interface SkillGroup {
  title: string;
  icon: IconName;
  items: string[];
}

export const skills: SkillGroup[] = [
  { title: 'Languages', icon: 'code', items: ['Java', 'Python', 'SQL', 'JavaScript'] },
  {
    title: 'Backend & Frameworks',
    icon: 'stack',
    items: ['Spring Boot / MVC', 'Spring Security', 'Hibernate ORM', 'Node.js / Express', 'REST APIs'],
  },
  { title: 'Databases & Cloud', icon: 'database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS S3', 'Docker'] },
  { title: 'Tools', icon: 'gear', items: ['Git & GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code'] },
];
