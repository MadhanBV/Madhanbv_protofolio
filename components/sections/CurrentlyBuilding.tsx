'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Blocks,
  Bot,
  Braces,
  CircuitBoard,
  Gauge,
  Palette,
  Rocket,
} from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { CURRENTLY_BUILDING } from '@/lib/constants';

const icons = {
  python: Braces,
  systems: CircuitBoard,
  blockchain: Blocks,
  design: Palette,
  product: Gauge,
  startup: Rocket,
} as const;

const tones = ['cyan', 'emerald', 'purple', 'blue', 'amber', 'cyan'] as const;

function ProgressArc({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 18;

  return (
    <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="rgba(255,255,255,0.11)"
        strokeWidth="4"
      />
      <motion.circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="url(#progress-gradient)"
        strokeLinecap="round"
        strokeWidth="4"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{
          strokeDashoffset: circumference - (value / 100) * circumference,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const CurrentlyBuilding: React.FC = () => {
  return (
    <section
      id="currently-building"
      className="relative py-20 md:py-32 surface-noise"
    >
      <div className="section-container relative">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold text-emerald-300">Live Workbench</p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              <RevealText text="Currently Building" />
            </h2>
            <p className="text-lg text-gray-400">
              Experiments, learning tracks, and product ideas moving through the lab.
            </p>
          </div>
          <GlassPanel glow="emerald" className="inline-flex items-center gap-3 px-4 py-3">
            <Bot className="h-5 w-5 text-emerald-300" />
            <span className="text-sm text-gray-200">Iteration mode active</span>
          </GlassPanel>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {CURRENTLY_BUILDING.map((item, index) => {
            const Icon = icons[item.iconKey];

            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                whileHover={{ y: -6 }}
              >
                <GlassPanel glow={tones[index]} className="h-full p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="relative">
                      <ProgressArc value={item.progress} />
                      <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-gray-200">
                        {item.progress}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;

