'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  entrance?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}

const entranceVariants = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, scale: 0.94 },
};

export function AnimatedCard({
  children,
  className,
  entrance = 'up',
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={entranceVariants[entrance]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;

