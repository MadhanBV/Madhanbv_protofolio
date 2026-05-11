'use client';

import { RefreshCcw } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="section-container flex min-h-screen items-center justify-center">
        <div className="max-w-xl rounded-lg border border-white/10 bg-white/[0.055] p-8 text-center backdrop-blur-xl">
          <p className="mb-3 text-sm font-semibold text-cyan-300">Portfolio recovery</p>
          <h1 className="mb-4 font-display text-3xl font-bold">
            Something interrupted the interface.
          </h1>
          <p className="mb-6 text-gray-400">
            The page can be retried without leaving the portfolio.
          </p>
          <AnimatedButton
            variant="primary"
            icon={<RefreshCcw className="h-4 w-4" />}
            onClick={reset}
          >
            Retry
          </AnimatedButton>
        </div>
      </div>
    </main>
  );
}

