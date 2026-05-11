'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import MagneticButton from './MagneticButton';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-[0_12px_36px_rgba(14,165,233,0.22)] before:absolute before:inset-0 before:bg-white/20 before:opacity-0 hover:before:opacity-100',
  secondary:
    'bg-white/10 text-white border border-white/15 hover:border-purple-300/50 hover:bg-purple-400/15',
  outline:
    'border border-cyan-400/45 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/10',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled = false,
}) => {
  return (
    <MagneticButton
      {...(href ? { href } : { type: 'button' as const })}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-semibold',
        'transition-all duration-300',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'cursor-not-allowed',
        className
      )}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </span>
    </MagneticButton>
  );
};

export default AnimatedButton;
