'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type HeroProps = {
  projectHref?: string;
  contactHref?: string;
  cvHref?: string;
};

const commandResponses = {
  whoami: 'DevOps Engineer focused on automation, reliability and scalable infrastructure.',
  skills: 'Linux, Docker, Kubernetes, Terraform, CI/CD, Cloud, Monitoring.',
  deploy: 'Build passed. Tests passed. Deployment successful.',
  projects: 'Deployment pipelines, cloud infrastructure, monitoring systems.',
  status: 'Production ready. CI passing. Systems healthy.'
} as const;

type CommandKey = keyof typeof commandResponses;

const commands: CommandKey[] = ['whoami', 'skills', 'deploy', 'projects', 'status'];

const statusBadges = ['CI Passing', 'Uptime Mindset', 'Production Ready'] as const;

export function ProductionStatusHero({ projectHref = '#case-studies', contactHref = '#contact', cvHref = '#' }: HeroProps) {
  const [activeCommand, setActiveCommand] = useState<CommandKey>('whoami');
  const [typedResponse, setTypedResponse] = useState('');

  const response = useMemo(() => commandResponses[activeCommand], [activeCommand]);

  useEffect(() => {
    let index = 0;
    setTypedResponse('');

    const timer = window.setInterval(() => {
      index += 1;
      setTypedResponse(response.slice(0, index));

      if (index >= response.length) {
        window.clearInterval(timer);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [response]);

  return (
    <section
      aria-labelledby="production-status-title"
      className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-5 py-12 shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:px-8 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/90">Production Status</p>
            <h1 id="production-status-title" className="text-3xl font-semibold leading-tight text-slate-100 sm:text-5xl">
              Your Name
            </h1>
            <p className="text-base font-medium text-cyan-100/90 sm:text-lg">DevOps Engineer</p>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I build reliable infrastructure, automated delivery pipelines, and production-ready systems.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              I focus on resilient automation, cloud operations, observability, and stable release workflows that keep
              systems healthy under real production load.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={projectHref}
              aria-label="View projects section"
              className="rounded-xl border border-cyan-400/45 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              View Projects
            </a>
            <a
              href={contactHref}
              aria-label="Contact section"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Contact Me
            </a>
            <a
              href={cvHref}
              aria-label="Download CV"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Download CV
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {statusBadges.map((badge, index) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.18 + index * 0.14, ease: 'easeOut' }}
                className="rounded-full border border-slate-700/90 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_10px_40px_rgba(2,6,23,0.4)] sm:p-5"
          aria-label="Interactive DevOps terminal"
        >
          <div className="mb-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {commands.map((command) => {
              const isActive = command === activeCommand;
              return (
                <button
                  key={command}
                  type="button"
                  onClick={() => setActiveCommand(command)}
                  aria-pressed={isActive}
                  aria-label={`Run ${command} command`}
                  className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? 'border-cyan-400/60 bg-cyan-400/12 text-cyan-100'
                      : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:text-slate-100'
                  }`}
                >
                  {command}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-mono text-xs text-cyan-200">$ {activeCommand}</p>
            <p className="mt-2 min-h-12 font-mono text-sm leading-relaxed text-slate-300">
              {typedResponse}
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-slate-400/80 align-middle" aria-hidden="true" />
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
