'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2, Play, Sparkles } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import ProjectModal from '@/components/ui/ProjectModal';
import RevealText from '@/components/ui/RevealText';
import { PROJECTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const accentClass = {
  cyan: 'from-cyan-400/20 to-cyan-400/0 text-cyan-100 border-cyan-300/25',
  purple: 'from-purple-400/20 to-purple-400/0 text-purple-100 border-purple-300/25',
  blue: 'from-blue-400/20 to-blue-400/0 text-blue-100 border-blue-300/25',
  emerald: 'from-emerald-400/20 to-emerald-400/0 text-emerald-100 border-emerald-300/25',
  amber: 'from-amber-400/20 to-amber-400/0 text-amber-100 border-amber-300/25',
};

function ProjectPreview({ title, architecture }: { title: string; architecture: string[] }) {
  return (
    <div className="relative h-52 overflow-hidden rounded-lg border border-white/10 bg-black/40">
      <div className="absolute inset-0 lab-grid opacity-45" />
      <div className="absolute inset-x-4 top-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-300/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="truncate font-display text-sm font-semibold text-white">
            {title}
          </span>
          <Sparkles className="h-4 w-4 text-cyan-200" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {architecture.slice(0, 4).map((item) => (
            <div
              key={item}
              className="truncate rounded-md border border-white/10 bg-black/35 px-2 py-2 text-xs text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const project = PROJECTS.find((item) => item.id === selectedProject);

  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="section-container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold text-cyan-300">Selected Work</p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              <RevealText text="Featured Projects" />
            </h2>
            <p className="text-lg text-gray-400">
              Product experiments spanning Web3, campus systems, and group planning.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {PROJECTS.map((proj) => (
            <motion.article
              key={proj.id}
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 170, damping: 24 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassPanel
                glow={proj.accent}
                className="h-full p-4"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(proj.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedProject(proj.id);
                  }
                }}
              >
                <div className="flex h-full flex-col gap-5">
                  <ProjectPreview
                    title={proj.title}
                    architecture={proj.architecture}
                  />

                  <div className="flex flex-1 flex-col">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-cyan-100">
                        {proj.title}
                      </h3>
                      <span
                        className={cn(
                          'shrink-0 rounded-lg border bg-gradient-to-br p-2',
                          accentClass[proj.accent]
                        )}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </div>

                    <p className="mb-5 flex-1 text-sm leading-6 text-gray-400">
                      {proj.shortDescription}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {proj.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-300/15"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live
                        </a>
                      )}
                      {proj.demoVideo && (
                        <a
                          href={proj.demoVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg border border-purple-300/25 bg-purple-300/10 px-3 py-2 text-sm text-purple-100 transition-colors hover:bg-purple-300/15"
                        >
                          <Play className="h-4 w-4" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {project && (
        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={project}
        />
      )}
    </section>
  );
};

export default Projects;

