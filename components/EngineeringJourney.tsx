'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Activity,
  Cloud,
  Cog,
  HardDrive,
  HeartPulse,
  GitBranch,
  type LucideIcon
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type JourneyStage = {
  id: string;
  label: string;
  icon: LucideIcon;
  learned: string;
  solved: string;
  value: string;
};

const stages: JourneyStage[] = [
  {
    id: 'linux-systems',
    label: 'Linux & Systems',
    icon: HardDrive,
    learned:
      'Built strong operational foundations in Linux internals, process management, networking, and secure system configuration.',
    solved:
      'Reduced instability caused by inconsistent host setup and manual server interventions during incidents.',
    value:
      'I bring disciplined system-level thinking that improves baseline reliability and operational predictability.'
  },
  {
    id: 'infra-automation',
    label: 'Infrastructure Automation',
    icon: Cog,
    learned:
      'Learned to codify infrastructure workflows with repeatable provisioning patterns and environment consistency controls.',
    solved:
      'Eliminated configuration drift and slow manual provisioning across staging and production environments.',
    value:
      'I help teams ship infrastructure changes faster with fewer errors through automation-first practices.'
  },
  {
    id: 'cicd-engineering',
    label: 'CI/CD Engineering',
    icon: GitBranch,
    learned:
      'Designed reliable pipeline stages with quality gates, artifact traceability, and rollback-aware release flow.',
    solved:
      'Addressed fragile release processes that caused deployment delays and increased production risk.',
    value:
      'I deliver dependable delivery pipelines that keep releases frequent, controlled, and auditable.'
  },
  {
    id: 'cloud-operations',
    label: 'Cloud Operations',
    icon: Cloud,
    learned:
      'Developed practical cloud operating models focused on resilient architecture, identity boundaries, and cost visibility.',
    solved:
      'Resolved scaling and availability bottlenecks in cloud environments under variable workload pressure.',
    value:
      'I align cloud operations with uptime targets, governance needs, and sustainable infrastructure growth.'
  },
  {
    id: 'monitoring-observability',
    label: 'Monitoring & Observability',
    icon: Activity,
    learned:
      'Built observability layers around metrics, logs, and service health signals with actionable alert strategies.',
    solved:
      'Reduced slow incident detection and noisy paging patterns that distracted teams from real failures.',
    value:
      'I improve response quality by turning telemetry into clear operational decisions and faster recovery.'
  },
  {
    id: 'production-reliability',
    label: 'Production Reliability',
    icon: HeartPulse,
    learned:
      'Applied reliability engineering principles around failure domains, recovery planning, and operational readiness.',
    solved:
      'Lowered incident impact through resilient rollout techniques, safer change management, and defined runbooks.',
    value:
      'I help teams protect production confidence with systems designed for stability, continuity, and trust.'
  }
];

export function EngineeringJourney() {
  const [activeId, setActiveId] = useState<string>(stages[0].id);
  const activeStage = useMemo(() => stages.find((stage) => stage.id === activeId) ?? stages[0], [activeId]);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 30%']
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      aria-labelledby="engineering-journey-title"
      className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5 shadow-[0_16px_50px_rgba(2,6,23,0.35)] sm:p-8"
    >
      <header className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Engineering Journey</p>
        <h2 id="engineering-journey-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          A DevOps Evolution Through Reliability and Operations
        </h2>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          Each stage represents practical growth in automation, delivery, cloud operations, observability, and production
          resilience.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div ref={timelineRef} className="relative pl-8 sm:pl-10">
          <span className="absolute left-2 top-1 h-[calc(100%-0.5rem)] w-px bg-slate-800 sm:left-3" aria-hidden="true" />
          <motion.span
            style={{ scaleY: lineScaleY }}
            className="absolute left-2 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-cyan-300/90 sm:left-3"
            aria-hidden="true"
          />

          <ul className="space-y-4" role="list" aria-label="Engineering journey timeline stages">
            {stages.map((stage, index) => {
              const isActive = stage.id === activeId;
              const Icon = stage.icon;

              return (
                <motion.li
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                  className="relative"
                >
                  <span
                    className={`absolute -left-[1.7rem] top-5 h-2.5 w-2.5 rounded-full border ${
                      isActive ? 'border-cyan-300/90 bg-cyan-300/70' : 'border-slate-600 bg-slate-800'
                    } sm:-left-[2.15rem]`}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={() => setActiveId(stage.id)}
                    aria-pressed={isActive}
                    aria-controls="engineering-journey-details"
                    className={`group w-full rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      isActive
                        ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-600 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{ y: -1.5, scale: 1.05 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border ${
                          isActive ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-slate-700 bg-slate-900/70'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                      <span className="text-sm font-medium sm:text-base">{stage.label}</span>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeStage.id}
              id="engineering-journey-details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_10px_35px_rgba(2,6,23,0.32)] sm:p-6"
              aria-live="polite"
            >
              <h3 className="mb-5 text-lg font-semibold text-slate-100 sm:text-xl">{activeStage.label}</h3>

              <div className="space-y-4 text-sm leading-relaxed sm:text-base">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.14em] text-cyan-300/90">What I learned</p>
                  <p className="text-slate-300">{activeStage.learned}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.14em] text-cyan-300/90">Problems I solved</p>
                  <p className="text-slate-300">{activeStage.solved}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.14em] text-cyan-300/90">Value I bring</p>
                  <p className="text-slate-300">{activeStage.value}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
