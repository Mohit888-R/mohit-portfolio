import type { SiteData, ProjectTag } from '@/types/project';

// Helper function to ensure tags are of type ProjectTag[]
const createProject = <T extends { tags: ProjectTag[] }>(project: T): T => project;

export const siteData: SiteData = {
  name: 'Mohit Singh',
  title: 'FullStack Developer',
  bio: 'Crafting elegant, user-centered digital products where minimalism meets meaningful interaction.',
  skills: [
    { name: 'Languages', items: ['C++', 'Javascript', 'TypeScript'],proficiency: [60, 90, 85]  },
    { name: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],proficiency: [90, 90, 85, 85]  },
    { name: 'Backend', items: ['Node.js', 'Express'],proficiency: [90, 85]  },
    { name: 'Database', items: ['MongoDB', 'MySQL'],proficiency: [90, 85]  },
    { name: 'Tools', items: ['Git', 'Notion', 'POSTMAN'],proficiency: [90, 85, 85]  },
    
  ],
  experience: [
  {
    role: "FullStack Developer",
    company: "ORUPHONES",
    period: "July 2024 — Aug 2025",
    location: "Remote",
    description: "Developed and deployed the Price engine, which helps to get good deals for buying and selling phones to new users.",
    achievements: [
      "Improved performance and reduced their loading time, reusable components, and user experience.",
      "Used monolith architecture and scale system with Redis cache and improved scalability.",
      "Working in a Scrum environment, we worked with cross-functional teams to integrate RESTful APIs and optimize data flows for seamless front-end and back-end integration.",
      " Led backend initiatives, designed secure APIs and managed MongoDB for efficient data storage and retrieval."
    ]
  },
  {
    role: "FullStack Developer Intern",
    company: "ORUPHONES",
    period: "Aug 2023 — June 2024",
    location: "Remote",
    description: "Developed a platform where you can buy and sell old, used, verified phones without any middleware and extra commission.",
    achievements: [
      "Enhanced SEO and user engagement, MongoDB performance with indexing to reduce response time.",
      "Implemented a negotiation system using sockets to resolve the issue of sellers so they can negotiate and proceed without leaving the platform.",
      "Improved user experience with optimized response queries and added rate limiting."
    ]
  },
  {
    role: "Frontend Developer Intern",
    company: "ORUPHONES",
    period: "OCT 2022 - MAR 2023",
    location: "Onsite",
    description: "Developed a platform where users can buy and sell second hand phones.",
    achievements: [
      "Enhanced SEO and user engagement by 20%",
      "Implemented a mobile-friendly and user experience platform using reusable components.",
      "Used tech stack: Next.js, Tailwind CSS, MongoDB, Node.js, Express, Git, Notion, POSTMAN"
    ]
  },
],
  projects: [
    createProject({
      title: 'Notion Template Marketplace Web App',
      description: 'A modern web platform enabling users to browse, purchase, and manage customizable Notion templates for varied productivity and workspace needs.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcz4Rz60xaIa9ebTTrnQOqJ_h1l5uehJkcA&s',
      tags: ['JAVASCRIPT', 'NODE.JS', 'NEXT.JS', 'TAILWIND CSS'],
      link: 'https://github.com/Mohit888-R/notionwaffle.io',
    }),
    createProject({
      title: 'Decentralized Crowdfunding Platform with Blockchain Smart Contracts',
      description: 'A decentralized crowdfunding web application that leverages blockchain and smart contracts to enable secure, transparent fundraising and project management for campaign creators and donors.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCoiR8cyX-2t2a_ElFnL7kcSNb7Rg6axiHnw&s',
      tags: ['TS', 'SOLIDITY', 'NEXT.JS', 'TAILWIND CSS'],
      link: 'https://github.com/Mohit888-R/crowdfunding',
    }),
    createProject({
      title: 'Near By Car Rental System in C++',
      description: 'A minimalist sharing car rental system.',
      image: 'https://d2xqcz296oofyv.cloudfront.net/wp-content/uploads/2020/01/car-sharing-scaled.jpg',
      tags: ['C++', 'LLD'],
      link: 'https://github.com/Mohit888-R/nearbycabcarbooking',
    }),
  ],
  contact: {
    email: 'naruka.mohit88@gmail.com',
    social: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
} as const;
