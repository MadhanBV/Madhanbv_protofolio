'use client';

import React, { useRef } from 'react';
import {
  motion,
  type HTMLMotionProps,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  disabled?: boolean;
}

type AnchorMagneticProps = BaseProps &
  Omit<HTMLMotionProps<'a'>, 'children' | 'className'> & { href: string };

type ButtonMagneticProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, 'children' | 'className' | 'disabled'> & {
    href?: undefined;
  };

type MagneticButtonProps = AnchorMagneticProps | ButtonMagneticProps;

export function MagneticButton({
  children,
  className,
  magneticStrength = 14,
  disabled,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.45 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const relativeX = event.clientX - rect.left - rect.width / 2;
    const relativeY = event.clientY - rect.top - rect.height / 2;

    x.set((relativeX / rect.width) * magneticStrength);
    y.set((relativeY / rect.height) * magneticStrength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedClassName = cn(
    'group/magnetic relative inline-flex items-center justify-center overflow-hidden rounded-lg',
    'transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400',
    disabled && 'pointer-events-none opacity-50',
    className
  );

  if ('href' in props && props.href) {
    const {
      href,
      onPointerMove: _onPointerMove,
      onPointerLeave: _onPointerLeave,
      ...anchorProps
    } = props;

    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.97 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={sharedClassName}
        {...anchorProps}
      >
        {children}
      </motion.a>
    );
  }

  const {
    onPointerMove: _onPointerMove,
    onPointerLeave: _onPointerLeave,
    ...buttonProps
  } = props as ButtonMagneticProps;

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type ?? 'button'}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={sharedClassName}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;
