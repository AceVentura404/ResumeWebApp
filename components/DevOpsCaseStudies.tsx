'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ChevronDown,
  ExternalLink,
  GitBranch,
  GraduationCap,
  LayoutTemplate,
  Server
} from 'lucide-react';
import { useState } from 'react';

type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  githubUrl: string;
  demoUrl: string;
  architectureExplanations: string[];
  lessons: {
    reliability: string;
    automation: string;
    monitoring: string;
  };
};

type TabKey = 'overview' | 'architecture' | 'lessons';

const architectureSteps = ['Code', 'CI', 'Docker Build', 'Registry', 'Deploy', 'Health Check', 'Monitoring'] as const;

const caseStudies: CaseStudy[] = [
  {
    title: 'Production Deployment Pipeline',
    problem: 'Release operations relied on manual sequencing, creating deployment inconsistency and elevated production risk.',
    solution:
      'Built a gated CI/CD pipeline with deterministic artifact flow, environment promotion checks, and rollback-aware deployment control.',
    impact:
      'Cut release lead time and reduced failed deployment events by enforcing repeatable automation across the delivery path.',
    stack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
    githubUrl: 'https://github.com/your-username/production-deployment-pipeline',
    demoUrl: 'https://demo.example.com/production-deployment-pipeline',
    architectureExplanations: [
      'Source changes are committed with traceable revision history.',
      'Pipeline validates build quality and execution rules before artifact generation.',
      'Service image is built with immutable dependencies and tagged for promotion.',
      'Versioned image is stored in a trusted container registry.',
      'Deployment strategy rolls out changes with health-aware safeguards.',
      'Runtime checks verify readiness and service stability after release.',
      'Operational telemetry confirms performance and reliability state.'
    ],
    lessons: {
      reliability: 'Reliability improves when deployment gates are strict and rollback paths are tested before incidents happen.',
      automation: 'Automation should remove manual handoffs and enforce consistent promotion behavior across environments.',
      monitoring: 'Monitoring must confirm release quality quickly so remediation can begin before user impact grows.'
    }
  },
  {
    title: 'Cloud Infrastructure Blueprint',
    problem:
      'Environment provisioning was inconsistent, causing drift, delayed onboarding, and weak operational standardization.',
    solution:
      'Designed infrastructure modules with policy guardrails, identity boundaries, and repeatable network topology definitions.',
    impact:
      'Enabled faster environment provisioning with predictable infrastructure patterns and stronger governance across teams.',
    stack: ['Terraform', 'AWS', 'IAM', 'VPC Networking'],
    githubUrl: 'https://github.com/your-username/cloud-infrastructure-blueprint',
    demoUrl: 'https://demo.example.com/cloud-infrastructure-blueprint',
    architectureExplanations: [
      'Infrastructure definitions are maintained as reviewed code.',
      'Automated checks validate policy compliance and module integrity.',
      'Execution artifacts package validated provisioning changes.',
      'Approved infrastructure plans are stored for controlled rollout.',
      'Changes deploy through staged environments with drift detection.',
      'Post-apply checks confirm service reachability and network posture.',
      'Monitoring captures infrastructure health and policy conformance signals.'
    ],
    lessons: {
      reliability: 'Reliability in cloud operations starts with standard foundations and clear failure boundaries.',
      automation: 'Automation must include policy checks, not only provisioning speed, to keep environments dependable.',
      monitoring: 'Monitoring infrastructure drift is essential for protecting long-term production consistency.'
    }
  },
  {
    title: 'Observability and Monitoring System',
    problem:
      'Operational insight was fragmented across tools, slowing incident detection and increasing diagnosis time during outages.',
    solution:
      'Implemented a centralized observability layer combining metrics, alerts, and service health dashboards with tuned escalation rules.',
    impact:
      'Improved response speed and reduced alert fatigue by prioritizing actionable telemetry over noisy signal volume.',
    stack: ['Prometheus', 'Grafana', 'Alertmanager', 'Logging Pipeline'],
    githubUrl: 'https://github.com/your-username/observability-monitoring-system',
    demoUrl: 'https://demo.example.com/observability-monitoring-system',
    architectureExplanations: [
      'Service changes include observability instrumentation at source.',
      'Pipeline validates telemetry contracts and alert rule quality.',
      'Container images include consistent runtime metrics exporters.',
      'Images are promoted to runtime environments with monitored baseline.',
      'Deployments register health probes and alert dependencies automatically.',
      'Health checks validate service recovery and runtime saturation behavior.',
      'Monitoring correlates metrics and alerts for fast incident triage.'
    ],
    lessons: {
      reliability: 'Reliability depends on clear, actionable signals rather than broad dashboards without ownership.',
      automation: 'Automation should provision observability defaults so every deployment is production-aware from day one.',
      monitoring: 'Monitoring strategy is strongest when alerting is tuned for response quality, not alert volume.'
    }
  },
  {
    title: 'Containerized Service Platform',
    problem:
      'Service runtime behavior varied by environment, creating rollout friction and unpredictable production performance.',
    solution:
      'Standardized container build strategy, deployment templates, and runtime health policies for consistent operations.',
    impact:
      'Increased deployment confidence and reduced runtime variance across staging and production clusters.',
    stack: ['Docker', 'Kubernetes', 'Helm', 'Container Registry'],
    githubUrl: 'https://github.com/your-username/containerized-service-platform',
    demoUrl: 'https://demo.example.com/containerized-service-platform',
    architectureExplanations: [
      'Service code and runtime policy live in version-controlled repositories.',
      'CI verifies image security checks and orchestration manifest validity.',
      'Docker build creates reproducible images with deterministic base layers.',
      'Registry stores signed images for controlled rollout approval.',
      'Deploy applies release manifests with progressive rollout safeguards.',
      'Health checks enforce readiness and liveness contract correctness.',
      'Monitoring tracks runtime behavior, saturation, and deployment impact.'
    ],
    lessons: {
      reliability: 'Reliability improves when runtime policies are standardized and validated before production promotion.',
      automation: 'Automation should unify image build, release control, and deployment guardrails in one flow.',
      monitoring: 'Monitoring container health must include startup behavior and resource saturation trends.'
    }
  }
];

function TabButton({
  tab,
  current,
  onClick,
  icon: Icon,
  label
}: {
  tab: TabKey;
  current: TabKey;
  onClick: (tab: TabKey) => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const active = tab === current;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`panel-${tab}`}
      id={`tab-${tab}`}
      onClick={() => onClick(tab)}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
        active
          ? 'border-cyan-400/60 bg-cyan-400/14 text-cyan-100'
          : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-slate-100'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function ArchitectureFlow({ explanations }: { explanations: string[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2" aria-label="Architecture flow">
        {architectureSteps.map((step, index) => {
          const active = hoverIndex === index;

          return (
            <div key={step} className="flex items-center gap-2">
              <button
                type="button"
                onMouseEnter={() => setHoverIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onBlur={() => setHoverIndex(null)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs transition-colors sm:text-sm ${
                  active
                    ? 'border-cyan-400/60 bg-cyan-400/14 text-cyan-100'
                    : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-cyan-400/40 hover:text-slate-100'
                }`}
                aria-label={`${step} architecture step`}
              >
                {step}
              </button>
              {index < architectureSteps.length - 1 ? <span className="text-slate-500">→</span> : null}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={String(hoverIndex)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-300"
        >
          {hoverIndex === null
            ? 'Hover a step to inspect the operational role in the delivery architecture.'
            : explanations[hoverIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function StudyPanel({ study, tab }: { study: CaseStudy; tab: TabKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="space-y-4"
      >
        {tab === 'overview' ? (
          <>
            <div className="space-y-2 text-sm leading-relaxed text-slate-300">
              <p>
                <span className="font-medium text-slate-100">Problem:</span> {study.problem}
              </p>
              <p>
                <span className="font-medium text-slate-100">Solution:</span> {study.solution}
              </p>
              <p>
                <span className="font-medium text-slate-100">Impact:</span> {study.impact}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span key={item} className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </>
        ) : null}

        {tab === 'architecture' ? <ArchitectureFlow explanations={study.architectureExplanations} /> : null}

        {tab === 'lessons' ? (
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-900/55 px-3 py-2">
              <span className="font-medium text-slate-100">Reliability lesson:</span> {study.lessons.reliability}
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/55 px-3 py-2">
              <span className="font-medium text-slate-100">Automation lesson:</span> {study.lessons.automation}
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/55 px-3 py-2">
              <span className="font-medium text-slate-100">Monitoring lesson:</span> {study.lessons.monitoring}
            </li>
          </ul>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-800 bg-slate-950/78 shadow-[0_14px_40px_rgba(2,6,23,0.32)]"
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-5 text-left sm:p-6"
      >
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">DevOps Case Study</p>
          <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">{study.title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-800 px-5 py-4 sm:px-6 sm:py-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div role="tablist" aria-label={`${study.title} tabs`} className="flex flex-wrap gap-2">
                  <TabButton tab="overview" current={activeTab} onClick={setActiveTab} icon={LayoutTemplate} label="Overview" />
                  <TabButton tab="architecture" current={activeTab} onClick={setActiveTab} icon={Server} label="Architecture View" />
                  <TabButton tab="lessons" current={activeTab} onClick={setActiveTab} icon={GraduationCap} label="Lessons Learned" />
                </div>

                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-2.5 py-1.5 text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href={study.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-2.5 py-1.5 text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Demo
                  </a>
                </div>
              </div>

              <StudyPanel study={study} tab={activeTab} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function DevOpsCaseStudies() {
  return (
    <section
      aria-labelledby="devops-case-studies-title"
      className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-950/85 to-slate-950/90 p-5 sm:p-8"
    >
      <header className="mb-8 max-w-3xl space-y-3">
        <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-cyan-300/90">
          <Activity className="h-3.5 w-3.5" />
          DevOps Case Studies
        </p>
        <h2 id="devops-case-studies-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Operational Projects Presented as Engineering Decisions
        </h2>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          Each case study captures the operational problem, implementation approach, and measurable reliability impact.
        </p>
      </header>

      <div className="space-y-4 sm:space-y-5">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.title} study={study} />
        ))}
      </div>
    </section>
  );
}
