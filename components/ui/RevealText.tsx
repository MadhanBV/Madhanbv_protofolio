'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  className?: string;
  by?: 'word' | 'letter';
  delay?: number;
  once?: boolean;
}

export function RevealText({
  text,
  className,
  by = 'word',
  delay = 0,
  once = true,
}: RevealTextProps) {
  const parts = by === 'letter' ? Array.from(text) : text.split(' ');

  return (
    <motion.span
      aria-label={text}
      className={cn('inline-flex flex-wrap', by === 'letter' ? '' : 'gap-x-2', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: by === 'letter' ? 0.018 : 0.055,
            delayChildren: delay,
          },
        },
      }}
    >
      {parts.map((part, index) => (
        <motion.span
          aria-hidden="true"
          key={`${part}-${index}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { type: 'spring', stiffness: 460, damping: 32 },
            },
          }}
        >
          {part === ' ' ? '\u00A0' : part}
          {by === 'letter' ? null : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default RevealText;

