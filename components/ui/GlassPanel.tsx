'use client';

import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlowTone = 'cyan' | 'purple' | 'blue' | 'emerald' | 'amber' | 'none';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
  glow?: GlowTone;
  interactive?: boolean;
}

const glowColor: Record<GlowTone, string> = {
  cyan: '14, 165, 233',
  purple: '147, 51, 234',
  blue: '37, 99, 235',
  emerald: '16, 185, 129',
  amber: '245, 158, 11',
  none: '255, 255, 255',
};

export function GlassPanel({
  children,
  className,
  glow = 'cyan',
  interactive = true,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassPanelProps) {
  const [glowPoint, setGlowPoint] = useState({ x: 50, y: 50, active: false });

  return (
    <motion.div
      {...props}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!interactive) return;

        const rect = event.currentTarget.getBoundingClientRect();
        setGlowPoint({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          active: true,
        });
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        setGlowPoint((point) => ({ ...point, active: false }));
      }}
      style={{
        ...style,
        background:
          interactive && glow !== 'none'
            ? `radial-gradient(420px circle at ${glowPoint.x}px ${glowPoint.y}px, rgba(${glowColor[glow]}, ${glowPoint.active ? 0.18 : 0.06}), transparent 42%), rgba(255, 255, 255, 0.055)`
            : undefined,
      }}
      className={cn(
        'relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] backdrop-blur-xl',
        'shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow,background] duration-300',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_36%,rgba(255,255,255,0.05))]',
        glow !== 'none' && 'hover:border-white/20',
        glow === 'cyan' && 'hover:shadow-[0_22px_70px_rgba(14,165,233,0.18)]',
        glow === 'purple' &&
          'hover:shadow-[0_22px_70px_rgba(147,51,234,0.16)]',
        glow === 'blue' && 'hover:shadow-[0_22px_70px_rgba(37,99,235,0.18)]',
        glow === 'emerald' &&
          'hover:shadow-[0_22px_70px_rgba(16,185,129,0.16)]',
        glow === 'amber' &&
          'hover:shadow-[0_22px_70px_rgba(245,158,11,0.14)]',
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlassPanel;
