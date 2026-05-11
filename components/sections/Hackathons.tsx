'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Trophy, X, Zap } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { HACKATHONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const statusIcon = {
  Participant: Zap,
  'Semi Finalist': Trophy,
  Winner: Award,
} as const;

const toneClass = {
  cyan: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  emerald: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  purple: 'border-purple-300/30 bg-purple-300/10 text-purple-100',
};

export const Hackathons: React.FC = () => {
  const [selected, setSelected] = useState<(typeof HACKATHONS)[number] | null>(null);

  return (
    <section id="hackathons" className="relative py-20 md:py-32">
      <div className="section-container">
        <div className="mb-12 max-w-3xl space-y-4">
          <p className="text-sm font-semibold text-purple-300">Hackathons</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            <RevealText text="Achievement Console" />
          </h2>
          <p className="text-lg text-gray-400">
            Competitive builds, certification milestones, and security learning.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-5 md:grid-cols-3"
        >
          {HACKATHONS.map((hackathon, index) => {
            const Icon = statusIcon[hackathon.status as keyof typeof statusIcon] ?? ShieldCheck;

            return (
              <motion.div
                key={hackathon.id}
                variants={{
                  hidden: { opacity: 0, rotateX: -12, y: 28 },
                  visible: { opacity: 1, rotateX: 0, y: 0 },
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                whileHover={{ rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4, y: -8 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="[perspective:1000px]"
              >
                <GlassPanel glow={hackathon.rankTone} className="h-full p-5 holographic">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-black/30 text-yellow-200">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        'rounded-lg border px-3 py-1 text-xs font-semibold',
                        toneClass[hackathon.rankTone]
                      )}
                    >
                      {hackathon.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-7 text-white">
                    {hackathon.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">{hackathon.date}</p>

                  <div className="mt-5 grid gap-2">
                    {hackathon.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm text-gray-300"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelected(hackathon)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Verify
                    </button>
                    <a
                      href={hackathon.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-gray-200 hover:bg-black/35"
                      aria-label={`Open ${hackathon.title} certificate`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <motion.span
                        key={dot}
                        className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200/70"
                        style={{
                          left: `${18 + dot * 16}%`,
                          top: `${14 + (dot % 2) * 68}%`,
                        }}
                        animate={{ y: [0, -12, 0], opacity: [0.2, 0.85, 0.2] }}
                        transition={{
                          duration: 2.8 + dot * 0.25,
                          repeat: Infinity,
                          delay: dot * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed left-1/2 top-1/2 z-[80] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
            >
              <GlassPanel glow={selected.rankTone} className="p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-cyan-300">Credential</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">
                      {selected.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white"
                    aria-label="Close credential preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-200" />
                    <div>
                      <p className="font-semibold text-white">{selected.status}</p>
                      <p className="text-sm text-gray-400">{selected.date}</p>
                    </div>
                  </div>
                </div>
                <a
                  href={selected.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/15"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Certificate
                </a>
              </GlassPanel>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hackathons;
