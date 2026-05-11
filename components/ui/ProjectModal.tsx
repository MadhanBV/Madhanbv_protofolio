'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Play,
  X,
} from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import GlassPanel from './GlassPanel';
import type { Project } from '@/lib/constants';
import { modalBackdrop, modalPanel } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const tabs = ['Overview', 'Technical', 'Impact', 'Gallery'] as const;
type Tab = (typeof tabs)[number];

const toneClasses = {
  cyan: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  purple: 'border-purple-300/30 bg-purple-300/10 text-purple-100',
  emerald: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  amber: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
};

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-white/10 bg-black/40',
        compact ? 'h-48' : 'h-64 md:h-80'
      )}
    >
      <div className="absolute inset-0 lab-grid opacity-35" />
      <div className="absolute inset-x-6 top-6 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-300/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-7">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-white">
              {project.title}
            </span>
            <Layers3 className="h-4 w-4 text-cyan-200" />
          </div>
          <div className="grid gap-2">
            {project.architecture.slice(0, compact ? 3 : 5).map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3 py-2"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="text-xs text-gray-200">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSlider() {
  const [value, setValue] = useState(58);

  return (
    <div className="relative h-60 overflow-hidden rounded-lg border border-white/10 bg-black/45">
      <div className="absolute inset-0 lab-grid opacity-40" />
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="w-full max-w-lg space-y-3">
          <div className="h-8 rounded-md bg-white/10" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 rounded-md bg-white/10" />
            <div className="h-20 rounded-md bg-white/10" />
            <div className="h-20 rounded-md bg-white/10" />
          </div>
          <div className="h-10 rounded-md bg-white/10" />
        </div>
      </div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden border-r border-cyan-200/70 bg-cyan-400/10 backdrop-saturate-150"
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="w-[min(100vw,32rem)] space-y-3">
            <div className="h-8 rounded-md bg-cyan-300/30" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-md bg-emerald-300/25" />
              <div className="h-20 rounded-md bg-cyan-300/25" />
              <div className="h-20 rounded-md bg-purple-300/25" />
            </div>
            <div className="h-10 rounded-md bg-white/20" />
          </div>
        </div>
      </div>
      <input
        aria-label="Project before and after comparison"
        type="range"
        min="20"
        max="80"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="absolute inset-x-6 bottom-5 accent-cyan-300"
      />
    </div>
  );
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [expandedChallenge, setExpandedChallenge] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const gallery = useMemo(() => project.images ?? [], [project.images]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setActiveTab('Overview');
    setGalleryIndex(0);
    setExpandedChallenge(0);
  }, [project.id]);

  const nextGallery = () => {
    if (!gallery.length) return;
    setGalleryIndex((index) => (index + 1) % gallery.length);
  };

  const previousGallery = () => {
    if (!gallery.length) return;
    setGalleryIndex((index) => (index - 1 + gallery.length) % gallery.length);
  };

  const handleSwipeEnd = (clientX: number) => {
    if (dragStart === null) return;
    const delta = clientX - dragStart;
    if (delta > 40) previousGallery();
    if (delta < -40) nextGallery();
    setDragStart(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[65] bg-black/72 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-3 z-[75] overflow-hidden rounded-xl border border-white/10 bg-[#05070a] shadow-2xl md:inset-8 lg:inset-12"
          >
            <div className="flex h-full flex-col">
              <header className="flex items-start justify-between gap-4 border-b border-white/10 p-4 md:p-6">
                <div className="min-w-0">
                  <p className="mb-2 text-sm font-semibold text-cyan-300">
                    Featured project
                  </p>
                  <h2
                    id="project-modal-title"
                    className="font-display text-2xl font-bold text-white md:text-3xl"
                  >
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white"
                  aria-label="Close project modal"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="border-b border-white/10 px-4 md:px-6">
                <div
                  className="flex gap-2 overflow-x-auto py-3"
                  role="tablist"
                  aria-label="Project details"
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'relative rounded-lg px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white',
                        activeTab === tab && 'bg-white/10 text-white'
                      )}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.span
                          layoutId="project-tab"
                          className="absolute inset-x-3 bottom-1 h-px bg-cyan-300"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'Overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
                    >
                      <ProjectVisual project={project} />
                      <div className="space-y-5">
                        <p className="text-base leading-8 text-gray-300">
                          {project.fullDescription}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {project.metrics.map((metric) => (
                            <GlassPanel
                              key={metric.label}
                              glow={metric.tone}
                              className={cn('p-4', toneClasses[metric.tone])}
                            >
                              <p className="font-display text-2xl font-bold">
                                {metric.value}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                {metric.label}
                              </p>
                            </GlassPanel>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Technical' && (
                    <motion.div
                      key="technical"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
                    >
                      <GlassPanel glow="blue" className="p-5">
                        <h3 className="mb-4 font-display text-xl font-semibold text-white">
                          Architecture
                        </h3>
                        <div className="space-y-3">
                          {project.architecture.map((step, index) => (
                            <div key={step} className="flex items-center gap-3">
                              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/10 text-xs text-cyan-200">
                                {index + 1}
                              </span>
                              <span className="text-sm text-gray-300">{step}</span>
                            </div>
                          ))}
                        </div>
                      </GlassPanel>

                      <div className="space-y-5">
                        <GlassPanel glow="purple" className="p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <Code2 className="h-5 w-5 text-purple-200" />
                            <h3 className="font-display text-xl font-semibold text-white">
                              Code Signal
                            </h3>
                          </div>
                          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 text-sm leading-7 text-cyan-100">
                            <code>{project.codeSnippet}</code>
                          </pre>
                        </GlassPanel>

                        <div className="grid gap-4 md:grid-cols-2">
                          {project.challenges.map((challenge, index) => (
                            <button
                              key={challenge}
                              type="button"
                              onClick={() => setExpandedChallenge(index)}
                              className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-left transition-colors hover:border-purple-300/35 hover:bg-white/[0.07]"
                            >
                              <p className="font-semibold text-white">
                                {challenge}
                              </p>
                              <AnimatePresence initial={false}>
                                {expandedChallenge === index && (
                                  <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 overflow-hidden text-sm leading-6 text-gray-400"
                                  >
                                    {project.solutions[index]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Impact' && (
                    <motion.div
                      key="impact"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="grid gap-6 lg:grid-cols-[1fr_0.95fr]"
                    >
                      <div className="space-y-5">
                        <BeforeAfterSlider />
                        <GlassPanel glow="emerald" className="p-5">
                          <h3 className="mb-4 font-display text-xl font-semibold text-white">
                            Key Learnings
                          </h3>
                          <div className="grid gap-3">
                            {project.learnings.map((learning) => (
                              <div key={learning} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                                <span className="text-sm leading-6 text-gray-300">
                                  {learning}
                                </span>
                              </div>
                            ))}
                          </div>
                        </GlassPanel>
                      </div>
                      <GlassPanel glow="cyan" className="p-5">
                        <h3 className="mb-5 font-display text-xl font-semibold text-white">
                          Milestones
                        </h3>
                        <div className="relative space-y-5">
                          <div className="absolute bottom-4 left-4 top-4 w-px bg-cyan-300/25" />
                          {project.milestones.map((milestone, index) => (
                            <div key={milestone.label} className="relative flex gap-4">
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-black text-xs text-cyan-100">
                                {index + 1}
                              </span>
                              <div>
                                <p className="font-semibold text-white">
                                  {milestone.label}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                  {milestone.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  )}

                  {activeTab === 'Gallery' && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="space-y-5"
                    >
                      <div
                        className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40"
                        onPointerDown={(event) => setDragStart(event.clientX)}
                        onPointerUp={(event) => handleSwipeEnd(event.clientX)}
                      >
                        {gallery.length ? (
                          <img
                            src={gallery[galleryIndex]}
                            alt={`${project.title} gallery item ${galleryIndex + 1}`}
                            className="h-[58vh] min-h-[320px] w-full object-cover"
                          />
                        ) : (
                          <ProjectVisual project={project} />
                        )}

                        {gallery.length > 1 && (
                          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                            <button
                              type="button"
                              onClick={previousGallery}
                              className="rounded-lg border border-white/10 bg-black/55 p-3 text-white backdrop-blur hover:bg-black/75"
                              aria-label="Previous gallery image"
                            >
                              <ArrowLeft className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={nextGallery}
                              className="rounded-lg border border-white/10 bg-black/55 p-3 text-white backdrop-blur hover:bg-black/75"
                              aria-label="Next gallery image"
                            >
                              <ArrowRight className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <footer className="flex flex-wrap gap-3 border-t border-white/10 p-4 md:p-6">
                {project.liveLink && (
                  <AnimatedButton
                    href={project.liveLink}
                    variant="primary"
                    size="md"
                    icon={<ExternalLink className="h-4 w-4" />}
                  >
                    View Live
                  </AnimatedButton>
                )}
                {project.demoVideo && (
                  <AnimatedButton
                    href={project.demoVideo}
                    variant="secondary"
                    size="md"
                    icon={<Play className="h-4 w-4" />}
                  >
                    Watch Demo
                  </AnimatedButton>
                )}
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

