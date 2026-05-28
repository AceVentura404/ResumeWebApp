'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Command, Download, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type CommandAction = {
  id: string;
  label: string;
  keywords: string[];
  run: () => void;
};

type CommandPaletteProps = {
  onNavigate: (sectionId: string) => void;
  onDownloadCv: () => void;
  onContact: () => void;
};

export function CommandPalette({ onNavigate, onDownloadCv, onContact }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<CommandAction[]>(
    () => [
      { id: 'go-production-status', label: 'Go to Production Status', keywords: ['home', 'hero'], run: () => onNavigate('home') },
      { id: 'go-engineering-journey', label: 'Go to Engineering Journey', keywords: ['journey'], run: () => onNavigate('journey') },
      { id: 'view-operational-capabilities', label: 'View Operational Capabilities', keywords: ['capabilities', 'skills'], run: () => onNavigate('capabilities') },
      { id: 'open-devops-case-studies', label: 'Open DevOps Case Studies', keywords: ['case studies', 'projects'], run: () => onNavigate('case-studies') },
      { id: 'run-deploy-simulator', label: 'Run Deploy Simulator', keywords: ['deploy', 'pipeline', 'simulator'], run: () => onNavigate('deploy-simulator') },
      { id: 'view-system-health', label: 'View System Health', keywords: ['health', 'monitoring'], run: () => onNavigate('system-health') },
      { id: 'open-debug-challenge', label: 'Open Debug Challenge', keywords: ['incident', 'debug'], run: () => onNavigate('debug-challenge') },
      { id: 'download-cv', label: 'Download CV', keywords: ['cv', 'resume'], run: onDownloadCv },
      { id: 'contact-me', label: 'Contact Me', keywords: ['email', 'contact'], run: onContact }
    ],
    [onContact, onDownloadCv, onNavigate]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;

    return actions.filter((action) => {
      const haystack = `${action.label} ${action.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [actions, query]);

  useEffect(() => {
    const onGlobalKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (filtered.length === 0 ? 0 : (prev + 1) % filtered.length));
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (filtered.length === 0 ? 0 : (prev - 1 + filtered.length) % filtered.length));
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const action = filtered[activeIndex];
        if (!action) return;
        action.run();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, filtered, open]);

  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, filtered.length]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:text-sm"
      >
        <Command className="h-3.5 w-3.5" />
        Command
        <span className="rounded border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400">⌘K</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/60 px-4 pt-[12vh] backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-[0_24px_70px_rgba(2,6,23,0.45)]"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search DevOps actions..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  aria-label="Search commands"
                />
              </div>

              <ul role="listbox" aria-label="Available actions" className="max-h-[50vh] overflow-auto p-2">
                {filtered.length === 0 ? (
                  <li className="rounded-xl px-3 py-2 text-sm text-slate-400">No matching actions.</li>
                ) : (
                  filtered.map((action, index) => {
                    const selected = index === activeIndex;
                    return (
                      <li key={action.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => {
                            action.run();
                            setOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                            selected ? 'bg-cyan-400/12 text-cyan-100' : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                          }`}
                        >
                          <span>{action.label}</span>
                          {action.id === 'download-cv' ? <Download className="h-4 w-4" /> : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
