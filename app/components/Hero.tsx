'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero({ type = 'home' }: { type?: 'home' | 'about' }) {
  const { content } = useContent();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);

  const [typedText, setTypedText] = useState('');
  const fullText = type === 'home' ? `Hello, I'm ${content.name}` : content.name;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(var(--primary), 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(var(--primary), 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(var(--primary), 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <motion.div
        style={type === 'home' ? { rotateX, rotateY } : {}}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Name / Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
        >
          {type === 'home' && (
            <span className="block text-4xl md:text-5xl font-medium text-muted-foreground mb-4">
              Hello, I'm
            </span>
          )}
          <span className="block relative">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 pb-4 to-muted-foreground">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-1 h-12 md:h-16 bg-primary ml-1 align-middle"
              />
            </span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-full blur-3xl -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {content.bio}
        </motion.p>

        {/* CTA Buttons */}
        {type === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 px-8"
            >
              <Link href="/projects">
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="group backdrop-blur-xl border-border/50 hover:bg-primary/5 transition-all duration-300 px-8"
            >
              <Link href="/contact">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {type === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-10 right-2 -translate-x-1/2 z-20"
          >
            <div
              className="group cursor-pointer"
              onClick={() => {
                window.scrollBy({
                  top: 800, // Scroll down by 100px
                  behavior: 'smooth'
                });
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  {/* Outer Ring */}
                  <div className="w-12 h-12 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-xl shadow-lg flex items-center justify-center">
                    {/* Inner Dot */}
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full"
                    />
                  </div>

                  {/* Pulse Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full border border-primary/30"
                  />
                </div>

                {/* Tooltip on hover (desktop) */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-background/80 backdrop-blur-xl px-2 py-1 rounded-full border border-border/50">
                    Scroll down
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Cursor Glow (Desktop Only) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 hidden lg:block"
        style={{
          background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(var(--primary), 0.08), transparent 80%)`,
        }}
      />
    </section>
  );
}