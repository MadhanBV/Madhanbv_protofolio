'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, Filter, Network } from 'lucide-react';
import { useMousePosition } from '@/components/hooks/useMousePosition';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { RESEARCH_TOPICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const areas = ['All', ...Array.from(new Set(RESEARCH_TOPICS.map((topic) => topic.area)))] as const;

export const Research: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<(typeof areas)[number]>('All');
  const [selectedTopic, setSelectedTopic] = useState<(typeof RESEARCH_TOPICS)[number]>(
    RESEARCH_TOPICS[0]
  );
  const mouse = useMousePosition();

  const visibleTopics = useMemo(() => {
    if (selectedArea === 'All') return RESEARCH_TOPICS;
    return RESEARCH_TOPICS.filter((topic) => topic.area === selectedArea);
  }, [selectedArea]);

  const lines = useMemo(() => {
    return visibleTopics.flatMap((topic) =>
      topic.links
        .map((label) => {
          const target = visibleTopics.find((item) => item.label === label);
          if (!target) return null;

          return {
            id: `${topic.id}-${target.id}`,
            x1: topic.x,
            y1: topic.y,
            x2: target.x,
            y2: target.y,
          };
        })
        .filter(Boolean)
    ) as { id: string; x1: number; y1: number; x2: number; y2: number }[];
  }, [visibleTopics]);

  return (
    <section id="research" className="relative py-20 md:py-32">
      <div className="section-container">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-emerald-300">Research</p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              <RevealText text="Interactive Research Map" />
            </h2>
            <p className="text-lg text-gray-400">
              Topic clusters across decentralized systems, scalable platforms, and human-centered products.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setSelectedArea(area)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                  selectedArea === area
                    ? 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100'
                    : 'border-white/10 bg-white/[0.055] text-gray-300 hover:bg-white/10'
                )}
              >
                <Filter className="h-4 w-4" />
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <GlassPanel glow="emerald" className="min-h-[520px] p-0">
            <div
              className="relative h-[520px] overflow-hidden rounded-lg"
              style={{
                backgroundPosition: `${50 + mouse.normalizedX * 6}% ${50 + mouse.normalizedY * 6}%`,
              }}
            >
              <div className="absolute inset-0 lab-grid opacity-40" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {lines.map((line) => (
                  <motion.line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="rgba(103,232,249,0.34)"
                    strokeWidth="0.22"
                    strokeDasharray="1.2 1.2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                ))}
              </svg>

              {visibleTopics.map((topic) => {
                const active = selectedTopic.id === topic.id;

                return (
                  <motion.button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={cn(
                      'absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-2 text-left shadow-2xl backdrop-blur-xl',
                      active
                        ? 'border-cyan-200/60 bg-cyan-300/16 text-white'
                        : 'border-white/10 bg-black/45 text-gray-200 hover:border-cyan-200/35'
                    )}
                    style={{ left: `${topic.x}%`, top: `${topic.y}%` }}
                    initial={{ opacity: 0, scale: 0.82 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <span className="mb-1 flex items-center gap-2 text-xs text-cyan-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      {topic.area}
                    </span>
                    <span className="block max-w-[150px] text-sm font-semibold leading-5">
                      {topic.label}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="absolute -inset-1 rounded-lg border border-cyan-300/20"
                      animate={{ opacity: active ? [0.2, 0.7, 0.2] : 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </GlassPanel>

          <GlassPanel glow="cyan" className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-gray-400">Selected topic</p>
                <h3 className="font-display text-xl font-semibold text-white">
                  {selectedTopic.label}
                </h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-sm leading-7 text-gray-300">
                  {selectedTopic.description}
                </p>
                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">
                    <Network className="h-4 w-4 text-emerald-300" />
                    Connected topics
                  </p>
                  <div className="grid gap-2">
                    {selectedTopic.links.map((link) => (
                      <button
                        key={link}
                        type="button"
                        onClick={() => {
                          const next = RESEARCH_TOPICS.find((topic) => topic.label === link);
                          if (next) {
                            setSelectedTopic(next);
                            setSelectedArea('All');
                          }
                        }}
                        className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default Research;
