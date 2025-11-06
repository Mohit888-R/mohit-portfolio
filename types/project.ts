export type ProjectTag = 'C++' | 'LLD' | 'TS' | 'SOLIDITY' | 'NEXT.JS' | 'TAILWIND CSS' | 'JAVASCRIPT' | 'NODE.JS';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: ProjectTag[];
  link: string;
}

export interface Skill {
  name: string;
  items: string[];
  proficiency: number[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface ContactInfo {
  email: string;
  social: SocialLinks;
}

export interface SiteData {
  name: string;
  title: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  contact: ContactInfo;
}
