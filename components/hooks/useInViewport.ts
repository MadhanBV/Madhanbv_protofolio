'use client';

import { useEffect, useRef, useState } from 'react';

export function useInViewport<T extends Element>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry ?? null);
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);

  return {
    ref,
    entry,
    isInViewport: Boolean(entry?.isIntersecting),
  };
}

