'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import type { Project } from '@/types/project';

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-0.5  rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
      
      <Card
        className="relative overflow-hidden rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 p-1 shadow-xl transition-all duration-500 hover:shadow-2xl"
        style={{
          transform: isHovered ? 'translateY(-12px) rotateX(6deg) rotateY(-6deg)' : 'translateY(0) rotateX(0) rotateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
        }}
      >
        {/* Image Container with Shimmer */}
        <div className="relative overflow-hidden rounded-t-3xl h-56 bg-muted/20">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shine Sweep */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transition-transform duration-1000 group-hover:translate-x-full" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-xs font-medium px-3 py-1"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              variant="ghost"
              className="group/btn w-full justify-between bg-muted/50 backdrop-blur-sm hover:bg-primary/10 border border-border/50"
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <span>View Project</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating External Link Icon */}
        {/* <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        </div> */}
      </Card>
    </motion.div>
  );
}