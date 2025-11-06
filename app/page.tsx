'use client';

import { motion } from 'framer-motion';
import { useContent } from './context/ContentContext';
import Hero from './components/Hero';
import SkillGrid from './components/SkillGrid';
import ProjectCard from './components/ProjectCard';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { content } = useContent();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const} },
  };

  return (
    <>
      {/* HERO */}
      <Hero type="home" />

      {/* SKILLS */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-120px' }}
        variants={container}
        className="py-28 bg-gradient-to-b from-transparent via-white/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={item}
            className="text-center text-4xl md:text-5xl font-semibold mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>
          <SkillGrid />
        </div>
      </motion.section>

      {/* FEATURED PROJECTS */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-120px' }}
        variants={container}
        className="py-28"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={item}
            className="text-center text-4xl md:text-5xl font-semibold mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {content.projects.slice(0, 3).map((project, i) => (
              <motion.div key={i} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* CTA – View All */}
          <motion.div
            variants={item}
            className="mt-20 text-center"
          >
            <Button asChild variant="ghost" size="lg">
              <Link href="/projects" className="inline-flex items-center gap-2">
                View All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}