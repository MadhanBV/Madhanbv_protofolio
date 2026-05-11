'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InteractiveLinkProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children: React.ReactNode;
}

export function InteractiveLink({
  children,
  className,
  ...props
}: InteractiveLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group/link relative inline-flex items-center gap-2 text-cyan-300',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400',
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover/link:scale-x-100" />
    </motion.a>
  );
}

export default InteractiveLink;
