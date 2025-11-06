'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import ProjectCard from '../components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid3X3, ArrowDown } from 'lucide-react';
import type { ProjectTag } from '@/types/project';

export default function Projects() {
  const { content } = useContent();
  const [selectedTag, setSelectedTag] = useState<ProjectTag | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<ProjectTag>();
    for (const project of content.projects) {
      project.tags.forEach((tag: ProjectTag) => {
        tags.add(tag);
      });
    }
    return Array.from(tags);
  }, [content.projects]);

  // Filter projects

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return content.projects;  
    return content.projects.filter(p => p.tags.includes(selectedTag));
  }, [content.projects, selectedTag]);

  // Load more
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="py-20 px-4 overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Grid3X3 className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground">
            Featured Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectedTag 
              ? `Filtered by "${selectedTag}" — ${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''}`
              : `Explore ${content.projects.length} handcrafted projects built with passion and precision.`}
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Button
            variant={!selectedTag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            All
          </Button>
          {allTags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedTag === tag ? 'default' : 'secondary'}
                className={cn(
                  'cursor-pointer transition-all',
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-primary/10'
                )}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? null : tag);
                  setVisibleCount(6);
                }}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            perspective: '1200px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  rotateY: i % 2 === 0 ? 5 : -5,
                  rotateX: 5,
                  z: 50,
                  transition: { duration: 0.4 },
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                {/* Optional: 3D shadow layer */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl -z-10 blur-xl scale-95 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateZ(-50px)' }}
                />
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="group gap-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25"
            >
              Load More
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No projects found for "<strong>{selectedTag}</strong>"
            </p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setSelectedTag(null)}
            >
              Clear Filter
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Helper
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}