'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  velocityX: number;
  velocityY: number;
}

const initialPosition: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  velocityX: 0,
  velocityY: 0,
};

export function useMousePosition(disabled = false): MousePosition {
  const [position, setPosition] = useState<MousePosition>(initialPosition);
  const previousRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const update = () => {
      const { x, y } = latestRef.current;
      const previous = previousRef.current;
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      setPosition({
        x,
        y,
        normalizedX: (x / width) * 2 - 1,
        normalizedY: (y / height) * 2 - 1,
        velocityX: x - previous.x,
        velocityY: y - previous.y,
      });

      previousRef.current = { x, y };
      frameRef.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [disabled]);

  return position;
}

