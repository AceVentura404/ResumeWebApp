'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, CircleDot } from 'lucide-react';
import { useMemo, useState } from 'react';

type SignalStrength = 'Strong first step' | 'Supporting signal' | 'Secondary check';

type InvestigationPath = {
  id: string;
  label: string;
  explanation: string;
  signal: SignalStrength;
};

const paths: InvestigationPath[] = [
  {
    id: 'logs',
    label: 'Logs',
    explanation:
      'Inspect application and gateway logs around deployment time for latency spikes, timeout events, error bursts, and slow endpoint traces.',
    signal: 'Strong first step'
  },
  {
    id: 'metrics',
    label: 'Metrics',
    explanation:
      'Correlate p95/p99 latency, request volume, saturation, and error trend changes before and after the deployment window.',
    signal: 'Strong first step'
  },
  {
    id: 'recent-deployments',
    label: 'Recent Deployments',
    explanation:
      'Compare deployment diff, configuration changes, and release notes to identify what changed when latency regressed.',
    signal: 'Strong first step'
  },
  {
    id: 'database-queries',
    label: 'Database Queries',
    explanation:
      'Check query duration, lock contention, execution plans, and connection pool pressure introduced by the latest release behavior.',
    signal: 'Supporting signal'
  },
  {
    id: 'network-latency',
    label: 'Network Latency',
    explanation:
      'Validate service-to-service latency, DNS timing, and egress route health to rule out transport-side degradation.',
    signal: 'Secondary check'
  },
  {
    id: 'resource-usage',
    label: 'Resource Usage',
    explanation:
      'Review CPU, memory, I/O, and throttling indicators to detect saturation patterns affecting response time.',
    signal: 'Supporting signal'
  }
];

function signalStyles(signal: SignalStrength) {
  if (signal === 'Strong first step') {
    return 'border-emerald-400/45 bg-emerald-400/10 text-emerald-200';
  }

  if (signal === 'Supporting signal') {
    return 'border-cyan-400/45 bg-cyan-400/10 text-cyan-100';
  }

  return 'border-slate-600 bg-slate-800/80 text-slate-300';
}

export function DebugChallenge() {
  const [selectedId, setSelectedId] = useState<string>(paths[0].id);
  const [selectedHistory, setSelectedHistory] = useState<string[]>([paths[0].id]);

  const selectedPath = useMemo(
    () => paths.find((path) => path.id === selectedId) ?? paths[0],
    [selectedId]
  );

  const showReasoning = selectedHistory.length >= 2;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSelectedHistory((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <section
      aria-labelledby="debug-challenge-title"
      className="rounded-3xl border border-slate-800/90 bg-slate-950/85 p-5 shadow-[0_18px_50px_rgba(2,6,23,0.34)] sm:p-8"
    >
      <header className="mb-7 space-y-3 sm:mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Debug Challenge</p>
        <h2 id="debug-challenge-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Incident Analysis: Latency Regression After Deployment
        </h2>
      </header>

      <article className="mb-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5" aria-label="Incident context">
        <div className="mb-3 flex items-center gap-2 text-slate-100">
          <AlertTriangle className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <p className="text-sm font-medium sm:text-base">
            API latency increased from 200ms to 2.5s after the latest deployment.
          </p>
        </div>

        <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <p className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">Previous response time: 200ms</p>
          <p className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">Current response time: 2.5s</p>
          <p className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">
            Change detected after latest deployment
          </p>
          <p className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">Error rate: slightly increased</p>
          <p className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 sm:col-span-2">
            Infrastructure status: running
          </p>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-400">Investigation Paths</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {paths.map((path) => {
              const active = path.id === selectedId;

              return (
                <motion.button
                  key={path.id}
                  type="button"
                  whileHover={{ y: -1.5 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={() => handleSelect(path.id)}
                  aria-pressed={active}
                  aria-label={`Select investigation path ${path.label}`}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    active
                      ? 'border-cyan-400/55 bg-cyan-400/12 text-cyan-100'
                      : 'border-slate-800 bg-slate-900/65 text-slate-300 hover:border-slate-600 hover:text-slate-100'
                  }`}
                >
                  {path.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-400">Engineer Analysis</p>
          <AnimatePresence mode="wait">
            <motion.article
              key={selectedPath.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5"
              aria-live="polite"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-100">{selectedPath.label}</h3>
                <span className={`rounded-full border px-2.5 py-1 text-xs ${signalStyles(selectedPath.signal)}`}>
                  {selectedPath.signal}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{selectedPath.explanation}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showReasoning ? (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="mt-6 rounded-2xl border border-cyan-400/35 bg-cyan-400/8 p-4 sm:mt-7 sm:p-5"
            aria-label="Final reasoning"
          >
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-cyan-200">
              <CheckCircle2 className="h-4 w-4" />
              Final Reasoning
            </p>
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              I would first correlate recent deployments with latency metrics, then inspect logs and database query
              duration before checking resource saturation and network behavior.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-300">
              <CircleDot className="h-3.5 w-3.5" />
              Investigation paths selected: {selectedHistory.length}
            </p>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
