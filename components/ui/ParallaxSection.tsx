'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}

export function ParallaxSection({
  children,
  className,
  speed = 32,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <section ref={ref} id={id} className={cn('relative', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
}

export default ParallaxSection;

