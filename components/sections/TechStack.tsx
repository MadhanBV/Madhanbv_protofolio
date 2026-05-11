'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Boxes,
  Code2,
  Database,
  Filter,
  Globe2,
  Palette,
  Server,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { TECH_STACK, type TechCategory, type TechItem } from '@/lib/constants';
import { cn } from '@/lib/utils';

const categories = ['All', ...Array.from(new Set(TECH_STACK.map((tech) => tech.category)))] as const;

const categoryIcons: Record<TechCategory, LucideIcon> = {
  Frontend: Globe2,
  Language: Code2,
  Backend: Server,
  Database: Database,
  Blockchain: Boxes,
  Design: Palette,
  Tools: Wrench,
};

function TechOrb({ tech, active }: { tech: TechItem; active: boolean }) {
  const circumference = 2 * Math.PI * 36;
  const Icon = categoryIcons[tech.category];

  return (
    <div className="relative mx-auto grid h-28 w-28 place-items-center">
      <motion.div
        className="absolute inset-3 rounded-full border border-cyan-300/20 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.26),rgba(14,165,233,0.16)_32%,rgba(0,0,0,0.28)_68%)] shadow-[inset_-18px_-22px_40px_rgba(0,0,0,0.36)]"
        animate={{ rotate: active ? 360 : 180 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-white/15"
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <motion.circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="url(#tech-progress)"
          strokeLinecap="round"
          strokeWidth="5"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{
            strokeDashoffset: circumference - (tech.proficiency / 100) * circumference,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="tech-progress" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#38bdf8" />
            <stop offset="0.55" stopColor="#22c55e" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <Icon className="relative z-10 h-7 w-7 text-cyan-100" />
    </div>
  );
}

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_STACK[0]);

  const visibleTech = useMemo(() => {
    if (activeCategory === 'All') return TECH_STACK;
    return TECH_STACK.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  const selectedRelated = useMemo(() => {
    return TECH_STACK.filter((tech) => selectedTech.related.includes(tech.name));
  }, [selectedTech]);

  return (
    <section id="tech-stack" className="relative py-20 md:py-32 surface-noise">
      <div className="section-container relative">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-cyan-300">Tech Stack</p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              <RevealText text="Skill System" />
            </h2>
            <p className="text-lg text-gray-400">
              A categorized map of tools, proficiency, and the technologies that work well together.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                  activeCategory === category
                    ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100'
                    : 'border-white/10 bg-white/[0.055] text-gray-300 hover:bg-white/10'
                )}
              >
                <Filter className="h-4 w-4" />
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleTech.map((tech) => (
                <motion.button
                  layout
                  key={tech.name}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  whileHover={{ y: -6 }}
                  className="text-left"
                >
                  <GlassPanel
                    glow={selectedTech.name === tech.name ? 'cyan' : 'blue'}
                    className={cn(
                      'h-full p-5 transition-colors',
                      selectedTech.name === tech.name && 'border-cyan-300/35'
                    )}
                  >
                    <TechOrb tech={tech} active={selectedTech.name === tech.name} />
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {tech.name}
                        </h3>
                        <span className="text-sm font-semibold text-cyan-200">
                          {tech.proficiency}%
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {tech.description}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          <GlassPanel glow="emerald" className="h-fit p-6 xl:sticky xl:top-28">
            <p className="text-sm text-gray-400">Selected technology</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              {selectedTech.name}
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              {selectedTech.experience}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-200">
                Correlation Network
              </p>
              <div className="relative min-h-56 rounded-lg border border-white/10 bg-black/35 p-4">
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {selectedRelated.map((_, index) => (
                    <motion.line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${26 + (index % 2) * 48}%`}
                      y2={`${24 + index * 22}%`}
                      stroke="rgba(103,232,249,0.35)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                  ))}
                </svg>
                <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  {selectedTech.name}
                </div>
                {selectedRelated.map((tech, index) => (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => setSelectedTech(tech)}
                    className="absolute grid h-16 w-24 place-items-center rounded-lg border border-white/10 bg-white/[0.055] px-2 text-center text-xs text-gray-200 backdrop-blur-xl hover:border-cyan-300/35"
                    style={{
                      left: `${14 + (index % 2) * 56}%`,
                      top: `${12 + index * 22}%`,
                    }}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
