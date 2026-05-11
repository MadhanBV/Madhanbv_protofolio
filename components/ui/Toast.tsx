'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const toneMap = {
  success: 'border-emerald-400/30 text-emerald-200',
  error: 'border-red-400/30 text-red-200',
  info: 'border-cyan-400/30 text-cyan-200',
};

const progressMap = {
  success: 'bg-emerald-400',
  error: 'bg-red-400',
  info: 'bg-cyan-400',
};

export function Toast({
  visible,
  message,
  type = 'info',
  onClose,
  duration = 3200,
}: ToastProps) {
  const Icon = iconMap[type];

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className={cn(
            'fixed bottom-5 right-5 z-[80] w-[min(92vw,360px)] overflow-hidden rounded-lg border bg-black/75 p-4 shadow-2xl backdrop-blur-xl',
            toneMap[type]
          )}
        >
          <div className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium leading-6">{message}</p>
          </div>
          <motion.div
            className={cn('absolute bottom-0 left-0 h-0.5', progressMap[type])}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;

