'use client';

import React from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '@/components/hooks/useMousePosition';
import { useMediaQuery } from '@/components/hooks/useMediaQuery';

export function CursorGlow() {
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mouse = useMousePosition(coarsePointer || reducedMotion);
  const x = useSpring(mouse.x - 160, { stiffness: 160, damping: 28 });
  const y = useSpring(mouse.y - 160, { stiffness: 160, damping: 28 });

  if (coarsePointer || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16),rgba(147,51,234,0.08)_36%,transparent_68%)] blur-xl"
      style={{ x, y }}
    />
  );
}

export default CursorGlow;

