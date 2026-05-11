'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import GlassPanel from '@/components/ui/GlassPanel';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return NAV_SECTIONS;

    return NAV_SECTIONS.filter((section) =>
      section.label.toLowerCase().includes(normalized)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  const jumpToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed left-1/2 top-24 z-[80] w-[min(92vw,560px)] -translate-x-1/2"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <GlassPanel glow="cyan" className="overflow-hidden p-0">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Jump to a section"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close command palette"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[360px] overflow-y-auto p-2">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => jumpToSection(section.id)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm text-gray-200 hover:bg-white/10"
                  >
                    <span>{section.label}</span>
                    <span className="text-xs text-gray-500">#{section.id}</span>
                  </button>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;

