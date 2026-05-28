'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CommandPalette } from './CommandPalette';
import { ThemeToggle } from './ThemeToggle';

export type NavItem = {
  id: string;
  label: string;
};

type HeaderNavigationProps = {
  items?: NavItem[];
  cvUrl?: string;
  contactEmail?: string;
};

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'deploy-simulator', label: 'Deploy Simulator' },
  { id: 'system-health', label: 'System Health' },
  { id: 'debug-challenge', label: 'Debug Challenge' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

export function HeaderNavigation({
  items = defaultNavItems,
  cvUrl = '/cv.pdf',
  contactEmail = 'your.email@example.com'
}: HeaderNavigationProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 140], [-20, 0]);
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const onNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const onDownloadCv = () => {
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  const onContact = () => {
    window.location.href = `mailto:${contactEmail}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.45, 0.7]
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const activeIndex = useMemo(() => items.findIndex((item) => item.id === activeId), [items, activeId]);

  return (
    <>
      <motion.header
        style={{ y: headerY, opacity: headerOpacity }}
        className="fixed left-0 right-0 top-3 z-50 px-3 sm:px-5"
      >
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 backdrop-blur-xl shadow-[0_16px_45px_rgba(2,6,23,0.32)] sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="rounded-full px-2 py-1 text-sm font-medium text-slate-100 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Go to Home"
            >
              DevOps Portfolio
            </button>

            <nav className="relative hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {items.map((item, index) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`relative rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      active ? 'text-cyan-100' : 'text-slate-300 hover:text-slate-100'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {active && activeIndex === index ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-cyan-400/35 bg-cyan-400/12"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <CommandPalette onNavigate={onNavigate} onDownloadCv={onDownloadCv} onContact={onContact} />
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-3 top-20 z-50 rounded-2xl border border-slate-700/80 bg-slate-900/95 p-3 shadow-[0_20px_55px_rgba(2,6,23,0.42)] backdrop-blur lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="mb-3 grid gap-1">
              {items.map((item) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? 'border border-cyan-400/40 bg-cyan-400/10 text-cyan-100'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-3">
              <CommandPalette onNavigate={onNavigate} onDownloadCv={onDownloadCv} onContact={onContact} />
              <ThemeToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
