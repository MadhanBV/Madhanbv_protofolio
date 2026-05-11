'use client';

import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = 'up' | 'down' | 'idle';

export interface ScrollPosition {
  scrollX: number;
  scrollY: number;
  progress: number;
  direction: ScrollDirection;
}

export function useScrollPosition(): ScrollPosition {
  const [scroll, setScroll] = useState<ScrollPosition>({
    scrollX: 0,
    scrollY: 0,
    progress: 0,
    direction: 'idle',
  });
  const previousYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measure = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const delta = scrollY - previousYRef.current;

      setScroll({
        scrollX,
        scrollY,
        progress,
        direction: Math.abs(delta) < 2 ? 'idle' : delta > 0 ? 'down' : 'up',
      });

      previousYRef.current = scrollY;
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return scroll;
}

