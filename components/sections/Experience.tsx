'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Award, ExternalLink, Maximize2, X } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { EXPERIENCE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(EXPERIENCE[0]?.id ?? 1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 45%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="section-container">
        <div className="mb-14 max-w-3xl space-y-4">
          <p className="text-sm font-semibold text-blue-300">Experience</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            <RevealText text="Professional Timeline" />
          </h2>
          <p className="text-lg text-gray-400">
            Internships, leadership roles, and proof points connected to practical skill growth.
          </p>
        </div>

        <div ref={timelineRef} className="relative space-y-8 md:space-y-12">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-white/10 md:block md:left-1/2" />
          <motion.div
            className="absolute left-4 top-0 hidden w-px origin-top bg-gradient-to-b from-cyan-300 via-emerald-300 to-purple-300 md:block md:left-1/2"
            style={{ scaleY: lineScale }}
          />

          {EXPERIENCE.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expanded === exp.id;

            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -36 : 36, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                className={cn(
                  'relative grid gap-5 md:grid-cols-2 md:gap-12',
                  !isLeft && 'md:[&>*:first-child]:col-start-2'
                )}
              >
                <span className="absolute left-4 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-cyan-200 bg-black shadow-[0_0_24px_rgba(14,165,233,0.65)] md:left-1/2 md:block" />

                <GlassPanel glow={isLeft ? 'cyan' : 'purple'} className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">{exp.duration}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                        {exp.position}
                      </h3>
                      <p className="mt-1 font-medium text-cyan-200">
                        {exp.company}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? 0 : exp.id)}
                      className="rounded-lg border border-white/10 bg-white/10 p-2 text-gray-300 hover:text-white"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${exp.position}`}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm leading-6 text-gray-300">
                    {exp.description}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {exp.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg border border-white/10 bg-black/25 p-3"
                      >
                        <p className="text-xs text-gray-500">{metric.label}</p>
                        <p className="mt-1 truncate text-sm font-semibold text-white">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-blue-300/25 bg-blue-300/10 px-2.5 py-1 text-xs text-blue-100"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="grid gap-2">
                            {exp.achievements.map((achievement) => (
                              <div
                                key={achievement}
                                className="flex items-start gap-3 text-sm text-gray-300"
                              >
                                <Award className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {'certificateLink' in exp && exp.certificateLink && (
                              <a
                                href={exp.certificateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-300/15"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Certificate
                              </a>
                            )}
                            {'offerLetterImage' in exp && exp.offerLetterImage && (
                              <button
                                type="button"
                                onClick={() => setPreviewImage(exp.offerLetterImage)}
                                className="inline-flex items-center gap-2 rounded-lg border border-purple-300/25 bg-purple-300/10 px-3 py-2 text-sm text-purple-100 hover:bg-purple-300/15"
                              >
                                <Maximize2 className="h-4 w-4" />
                                Preview
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassPanel>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {previewImage && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed inset-4 z-[80] grid place-items-center md:inset-10"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <div className="relative max-h-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-black">
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="absolute right-3 top-3 z-10 rounded-lg bg-black/60 p-2 text-white backdrop-blur"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
                <img
                  src={previewImage}
                  alt="Experience credential preview"
                  className="max-h-[82vh] w-full object-contain"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;

