'use client';

import { useCallback, useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const storageKey = 'madhan-theme';

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light';
  }

  return 'dark';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

function applyTheme(preference: ThemePreference) {
  if (typeof document === 'undefined') return;

  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePreference>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as
      | ThemePreference
      | null;
    const initial =
      stored === 'light' || stored === 'dark' || stored === 'system'
        ? stored
        : 'dark';

    setThemeState(initial);
    setResolvedTheme(resolveTheme(initial));
    applyTheme(initial);
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: light)');

    const handleSystemChange = () => {
      if (theme === 'system') {
        const nextResolved = resolveTheme('system');
        setResolvedTheme(nextResolved);
        applyTheme('system');
      }
    };

    mediaQueryList.addEventListener('change', handleSystemChange);
    return () =>
      mediaQueryList.removeEventListener('change', handleSystemChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem(storageKey, nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme));
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
