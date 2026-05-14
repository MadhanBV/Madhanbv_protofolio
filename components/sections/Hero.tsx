'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Camera, Code2, Download } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlassPanel from '@/components/ui/GlassPanel';
import RevealText from '@/components/ui/RevealText';
import { useMousePosition } from '@/components/hooks/useMousePosition';
import {
  LAB_STATS,
  PERSONAL_INFO,
  ROTATING_ROLES,
} from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

const HeroBackground = dynamic(
  () => import('@/components/3d/HeroBackground'),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0 lab-grid opacity-50"
      />
    ),
  }
);

const INSPIRATIONS = [
  {
    name: 'Elon Musk',
    org: 'Tesla / SpaceX',
    achievement: 'Reusable rockets, EV scale',
    image: '/images/inspirations/elon.jpg',
  },
  {
    name: 'Deepinder Goyal',
    org: 'Zomato',
    achievement: 'Food-tech growth in India',
    image: '/images/inspirations/goyal.jpg',
  },
  {
    name: 'A. P. J. Abdul Kalam',
    org: 'ISRO / DRDO',
    achievement: 'Missile Man of India',
    image: '/images/inspirations/kalam.jpg',
  },
  {
    name: 'Mark Zuckerberg',
    org: 'Meta (Facebook)',
    achievement: 'Social platforms at scale',
    image: '/images/inspirations/zuck.jpg',
  },
  {
    name: 'Sundar Pichai',
    org: 'Google',
    achievement: 'Product leadership at Alphabet',
    image: '/images/inspirations/pichai.jpg',
  },
] as const;

const INSPIRATION_LOOP = [...INSPIRATIONS, ...INSPIRATIONS];

export const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const mouse = useMousePosition();
  const springX = useSpring(mouse.normalizedX, { stiffness: 80, damping: 24 });
  const springY = useSpring(mouse.normalizedY, { stiffness: 80, damping: 24 });
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      icon: Code2,
      href: PERSONAL_INFO.socials.github,
      label: 'GitHub',
    },
    {
      icon: BriefcaseBusiness,
      href: PERSONAL_INFO.socials.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Camera,
      href: PERSONAL_INFO.socials.instagram,
      label: 'Instagram',
    },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <HeroBackground />
      <div className="absolute inset-0 lab-grid opacity-35" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 section-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.76fr_0.6fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <GlassPanel
              glow="cyan"
              className="inline-flex items-center gap-3 px-3 py-2 text-sm text-cyan-100"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
              Digital Innovation Lab
            </GlassPanel>

            <div className="space-y-5">
              <h1 className="font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                <RevealText text={PERSONAL_INFO.name} by="letter" />
              </h1>
              <div className="h-12 overflow-hidden sm:h-14">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={ROTATING_ROLES[currentRole]}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-2xl font-semibold text-gradient sm:text-4xl"
                  >
                    {ROTATING_ROLES[currentRole]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <ul className="max-w-2xl space-y-2 text-lg leading-8 text-gray-300 sm:text-xl">
              {PERSONAL_INFO.tagline.split('\n').map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-cyan-300/80" />
                  <span className="text-balance">{line}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={<Download className="h-5 w-5" />}
                href={PERSONAL_INFO.resume}
              >
                MY RESUME
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => scrollToSection('projects')}
              >
                Explore Projects
              </AnimatedButton>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              {LAB_STATS.map((stat) => (
                <GlassPanel
                  key={stat.label}
                  glow="emerald"
                  className="px-4 py-3"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
                </GlassPanel>
              ))}
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.055] text-gray-300 backdrop-blur-xl transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[410px] lg:mx-0 lg:max-w-[460px] lg:-ml-6"
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 24, delay: 0.16 }}
          >
            <div className="relative aspect-square rounded-full border border-cyan-300/25 bg-white/[0.04] p-3 shadow-[0_0_70px_rgba(14,165,233,0.18)] backdrop-blur-xl">
              <div className="scanline absolute inset-4 rounded-full border border-white/10" />
              <motion.div
                className="absolute inset-0 rounded-full border border-emerald-300/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-dashed border-purple-300/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-slate-950">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt="Portrait of MADHAN BV"
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 768px) 82vw, 500px"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.42))]"
                  aria-hidden="true"
                />
              </div>
            </div>

            <GlassPanel
              glow="purple"
              className="absolute -bottom-3 left-1/2 w-[min(88%,360px)] -translate-x-1/2 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400">Current focus</p>
                  <p className="font-display text-sm font-semibold text-white">
                    Exploring The All Domains Available 
                  </p>
                </div>
                <span className="h-9 w-9 rounded-lg border border-cyan-300/30 bg-cyan-300/10" />
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative hidden w-full max-w-[320px] justify-self-end lg:block"
          >
            <div className="relative h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur-xl">
              <div className="absolute inset-y-6 left-4 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
              <div className="absolute inset-y-6 right-4 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />

              <div className="relative z-10 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">
                  My Inspiration
                </p>
              </div>

              <div className="mt-6 h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                <div className="inspiration-track flex flex-col gap-4" aria-hidden="true">
                  {INSPIRATION_LOOP.map((person, index) => (
                    <div
                      key={`${person.name}-${index}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/30 px-3 py-2"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={72}
                          height={72}
                          sizes="48px"
                          className="h-full w-full object-cover grayscale brightness-90 contrast-110"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-400">{person.org}</p>
                        <p className="text-[11px] text-gray-500">
                          {person.achievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
