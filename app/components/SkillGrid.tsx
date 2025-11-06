'use client';

import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Zap, Code2, Palette, Rocket, Database, Globe, ServerCog } from 'lucide-react';
import { useId } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-6 h-6" />,
  Backend: <ServerCog className="w-6 h-6" />,
  Design: <Palette className="w-6 h-6" />,
  DevOps: <Rocket className="w-6 h-6" />,
  Languages: <Globe className="w-6 h-6" />,
  Tools: <Zap className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
};

export default function SkillGrid() {
  const { content } = useContent();
  const gradientId = useId();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delay_CHILDREN: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const, 
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-20 px-4"
    >
      {content.skills.map((skill, i) => {
        const Icon = iconMap[skill.name] ? (
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            {iconMap[skill.name]}
          </div>
        ) : (
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Zap className="w-6 h-6" />
          </div>
        );

        return (
          <motion.div
            key={skill.name}
            variants={item}
            whileHover={{
              y: -8,
              rotateX: 6,
              rotateY: -6,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/80 via-background to-background/60 backdrop-blur-xl border border-border/50 p-1 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `conic-gradient(from ${i * 60}deg at 50% 50%, var(--primary), var(--primary)/20, transparent)`,
                  filter: 'blur(20px)',
                }}
              />
            </div>

            {/* Card Content */}
            <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-[22px] p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                {Icon}
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  {skill.name}
                </h3>
              </div>

              <div className="space-y-3 flex-1">
                {skill.items.map((item, idx) => {
                  const proficiency = skill?.proficiency?.[idx] ?? Math.floor(Math.random() * 40) + 60; // fallback

                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="space-y-1.5"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground/80">{item}</span>
                        <span className="text-muted-foreground">{proficiency}%</span>
                      </div>

                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proficiency}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}