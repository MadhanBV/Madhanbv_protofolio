'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  activeSection: string;
  onClose: () => void;
}

export function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            className="fixed right-3 top-3 z-[60] w-[min(88vw,340px)] rounded-lg border border-white/10 bg-black/85 p-4 shadow-2xl backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            aria-label="Mobile navigation"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-sm font-semibold uppercase text-cyan-200">
                MADHAN BV
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="grid gap-1">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(section.id);
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-left text-sm text-gray-200 hover:bg-white/10"
                >
                  <span>{section.label}</span>
                  {activeSection === section.id && (
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  )}
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
