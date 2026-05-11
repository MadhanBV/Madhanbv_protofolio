'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Blocks, Lightbulb, Rocket, Sparkles } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { ABOUT_CONTENT, PERSONAL_INFO } from '@/lib/constants';

const detailIcons = [Blocks, Rocket, Lightbulb, Sparkles];

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {ABOUT_CONTENT.badges.map((badge) => (
            <motion.span
              key={badge}
              whileHover={{ y: -3, scale: 1.03 }}
              className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-medium text-gray-200 backdrop-blur-xl hover:border-cyan-300/40 hover:text-cyan-100"
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

