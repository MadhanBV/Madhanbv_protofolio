'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Blocks, Lightbulb, Rocket, Sparkles, Target, Trophy } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { ABOUT_CONTENT, PERSONAL_INFO } from '@/lib/constants';

const detailIcons = [Blocks, Rocket, Lightbulb, Sparkles];
const hackathonStats = [
  { label: 'Participated', value: 12, tone: 'text-cyan-200' },
  { label: 'Wins', value: 2, tone: 'text-emerald-200' },
  { label: 'Semifinalist', value: 1, tone: 'text-purple-200' },
  { label: 'Not Yet Won', value: 9, tone: 'text-amber-200' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold text-cyan-300">About</p>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                <RevealText text="Builder With Product Instincts" />
              </h2>
              <p className="text-lg leading-8 text-gray-300">
                {ABOUT_CONTENT.description}
              </p>
            </div>

            <GlassPanel glow="emerald" className="p-5">
              <p className="text-sm text-gray-400">Academic base</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">
                {PERSONAL_INFO.university}
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Computer Science foundations paired with real product experiments,
                venture thinking, and hands-on interface engineering.
              </p>
            </GlassPanel>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ABOUT_CONTENT.details.map((detail, index) => {
              const Icon = detailIcons[index % detailIcons.length];

              return (
                <AnimatedCard
                  key={detail}
                  entrance={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.06}
                >
                  <GlassPanel glow={index % 2 === 0 ? 'cyan' : 'purple'} className="h-full p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/10 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-sm leading-7 text-gray-300">{detail}</p>
                  </GlassPanel>
                </AnimatedCard>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <GlassPanel glow="cyan" className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-200">Hackathon Momentum</p>
                <p className="mt-2 text-sm text-gray-300">
                  Every sprint builds confidence, clarity, and sharper execution.
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                <Trophy className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {hackathonStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/3 px-3 py-3"
                >
                  <p className={`font-display text-2xl font-semibold ${stat.tone}`}>
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel glow="purple" className="relative overflow-hidden p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">Next target</p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  Smart India Hackathon (SIH) 2026
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  Preparing steadily with sharper ideas and stronger execution.
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-purple-300/30 bg-purple-300/10 text-purple-200">
                <Target className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '72%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-2 rounded-full bg-linear-to-r from-cyan-300 via-emerald-300 to-purple-300"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <span>Preparation runway</span>
                <span className="flex items-center gap-2">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-emerald-300"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                  Targeting 2026
                </span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {ABOUT_CONTENT.badges.map((badge) => (
            <motion.span
              key={badge}
              whileHover={{ y: -3, scale: 1.03 }}
              className="rounded-lg border border-white/10 bg-white/5.5 px-3 py-2 text-sm font-medium text-gray-200 backdrop-blur-xl hover:border-cyan-300/40 hover:text-cyan-100"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

