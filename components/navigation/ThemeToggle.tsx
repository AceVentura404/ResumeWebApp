'use client';

import { motion } from 'framer-motion';
import { MonitorCog, Moon, Sun } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';

const THEME_KEY = 'devops-theme-mode';

function resolveSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const resolved = mode === 'system' ? resolveSystemTheme() : mode;

  root.setAttribute('data-theme', resolved);
  root.style.colorScheme = resolved;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const initial = stored ?? 'system';
    setMode(initial);
    applyTheme(initial);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if ((localStorage.getItem(THEME_KEY) as ThemeMode | null) === 'system') {
        applyTheme('system');
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const options = useMemo(
    () => [
      { key: 'dark' as const, label: 'Dark', icon: Moon },
      { key: 'light' as const, label: 'Light', icon: Sun },
      { key: 'system' as const, label: 'System', icon: MonitorCog }
    ],
    []
  );

  const onSelect = (next: ThemeMode) => {
    setMode(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  return (
    <div
      className="inline-flex rounded-full border border-slate-700/80 bg-slate-900/70 p-1 backdrop-blur"
      role="radiogroup"
      aria-label="Theme mode"
    >
      {options.map((option) => {
        const active = option.key === mode;
        const Icon = option.icon;

        return (
          <button
            key={option.key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Set ${option.label} theme`}
            onClick={() => onSelect(option.key)}
            className="relative rounded-full px-3 py-1.5 text-xs text-slate-300 transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:text-sm"
          >
            {active ? (
              <motion.span
                layoutId="theme-active-indicator"
                className="absolute inset-0 rounded-full border border-cyan-400/40 bg-cyan-400/12"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
