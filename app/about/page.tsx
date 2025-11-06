'use client';

import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Briefcase, Calendar, MapPin, ArrowRight, Star } from 'lucide-react';

interface Experience {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly location: string;
  readonly description: string;
  readonly achievements: readonly string[];
}

export default function About() {
  const { content } = useContent();

  // Extend your ContentContext with this structure
  const experiences:readonly Experience[] = content.experience || [
    {
      role: 'Senior Frontend Engineer',
      company: 'TechCorp',
      period: '2023 — Present',
      location: 'San Francisco, CA',
      description: 'Leading UI architecture for AI-powered SaaS platform.',
      achievements: [
        'Reduced load time by 60%',
        'Built design system used by 50+ devs',
        'Mentored 5 junior engineers',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2021 — 2023',
      location: 'Remote',
      description: 'Developed real-time collaboration tools with React & Node.js.',
      achievements: [
        'Scaled to 100K MAU',
        'Implemented WebSocket architecture',
        'Achieved 99.9% uptime',
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const} },
  };

  return (
    <>
      <Hero type="about" />

      {/* Experience Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Professional Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From code to leadership — building the future, one pixel at a time.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={item}
                className={cn(
                  'relative flex items-center mb-12',
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary rounded-full blur-md"
                  />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    'ml-16 md:ml-0 md:w-1/2',
                    i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  )}
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/50 p-1 shadow-xl"
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className="relative bg-background/90 backdrop-blur-xl rounded-[22px] p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.role}
                        </span>
                        <span className="text-foreground/40">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {exp.company}
                      </h3>

                      <p className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </p>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Star className="w-4 h-4 text-primary" />
                            <span className="text-foreground/80">{ach}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Spacer */}
                <div className="md:hidden w-8" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Want to work together?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all"
            >
              Let’s Build Something
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Helper for conditional classNames
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}