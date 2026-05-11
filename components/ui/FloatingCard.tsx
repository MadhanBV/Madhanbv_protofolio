'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import GlassPanel from './GlassPanel';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: 'cyan' | 'purple' | 'blue' | 'none';
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  delay = 0,
  hover = true,
  glow = 'cyan',
}) => {
  return (
    <GlassPanel
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay }}
      whileHover={hover ? { y: -6, rotateX: 1.2, rotateY: -1.2 } : {}}
      glow={glow}
      className={cn(
        'p-5 md:p-6',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </GlassPanel>
  );
};

export default FloatingCard;
