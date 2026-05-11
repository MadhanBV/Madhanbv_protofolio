'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import { NAV_SECTIONS, PERSONAL_INFO } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import { useScrollPosition } from '@/components/hooks/useScrollPosition';
import { useTheme } from '@/components/hooks/useTheme';
import CommandPalette from './CommandPalette';
import MobileMenu from './MobileMenu';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { scrollY, direction } = useScrollPosition();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((section) => {
      const node = document.getElementById(section.id);
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: '-42% 0px -48% 0px', threshold: 0 }
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (!isEditable && (event.key === '/' || (event.ctrlKey && event.key.toLowerCase() === 'k'))) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: direction === 'down' && scrollY > 360 ? -86 : 0,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-black/60 px-3 py-2 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-left"
            aria-label="Go to hero section"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-100">
              MB
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-semibold text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="block text-xs text-gray-400">Digital Innovation Lab</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_SECTIONS.slice(1).map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="relative rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:text-white"
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute inset-x-3 bottom-1 h-px rounded-full bg-cyan-300"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

export default Navbar;

