'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type CapabilityDetail = {
  usedFor: string[];
  problemsSolved: string[];
  productionValue: string[];
  relatedProjects: string[];
};

type SkillItem = {
  name: string;
  detail: CapabilityDetail;
};

type CapabilityCategory = {
  name: string;
  skills: SkillItem[];
};

const capabilityCategories: CapabilityCategory[] = [
  {
    name: 'Infrastructure',
    skills: [
      {
        name: 'Linux',
        detail: {
          usedFor: ['Operating system administration', 'Service process management', 'Host-level diagnostics'],
          problemsSolved: ['Unstable host behavior', 'Slow incident triage', 'Inconsistent runtime handling'],
          productionValue: ['Operational stability', 'Faster root-cause isolation', 'Reliable platform baseline'],
          relatedProjects: ['Hardened host baseline', 'Operational runbook standardization']
        }
      },
      {
        name: 'Docker',
        detail: {
          usedFor: ['Containerizing services', 'Reproducible environments', 'Consistent deployments'],
          problemsSolved: ['Environment mismatch', 'Manual deployment drift', 'Unstable releases'],
          productionValue: ['Predictable delivery', 'Easier rollback strategy', 'Better local-to-production parity'],
          relatedProjects: ['Service containerization program', 'Release pipeline standardization']
        }
      },
      {
        name: 'Kubernetes',
        detail: {
          usedFor: ['Workload orchestration', 'Health-based rollouts', 'Service scaling control'],
          problemsSolved: ['Manual scaling bottlenecks', 'Fragile deployments', 'Single-host dependency'],
          productionValue: ['Resilient service operation', 'Controlled rollout patterns', 'Higher availability posture'],
          relatedProjects: ['Cluster migration rollout', 'Zero-downtime deployment framework']
        }
      },
      {
        name: 'Terraform',
        detail: {
          usedFor: ['Infrastructure as code', 'Environment provisioning', 'Policy-driven resource definition'],
          problemsSolved: ['Configuration drift', 'Manual provisioning errors', 'Environment inconsistency'],
          productionValue: ['Repeatable infrastructure', 'Auditable changes', 'Faster environment setup'],
          relatedProjects: ['Cloud landing zone baseline', 'Multi-environment infra blueprint']
        }
      },
      {
        name: 'Nginx',
        detail: {
          usedFor: ['Traffic routing', 'Reverse proxy control', 'Edge request handling'],
          problemsSolved: ['Unbalanced traffic flow', 'Unoptimized ingress behavior', 'Manual proxy sprawl'],
          productionValue: ['Stable edge layer', 'Improved service routing', 'Safer production entry points'],
          relatedProjects: ['Ingress standardization', 'Edge routing hardening']
        }
      }
    ]
  },
  {
    name: 'CI/CD',
    skills: [
      {
        name: 'GitHub Actions',
        detail: {
          usedFor: ['Pipeline orchestration', 'Automated quality gates', 'Release automation'],
          problemsSolved: ['Manual release tasks', 'Inconsistent verification', 'Slow delivery cadence'],
          productionValue: ['Consistent release flow', 'Reduced change risk', 'Higher deployment confidence'],
          relatedProjects: ['Pipeline reliability suite', 'Automated release approvals']
        }
      },
      {
        name: 'GitLab CI',
        detail: {
          usedFor: ['Stage-based automation', 'Artifact lifecycle handling', 'Environment promotion'],
          problemsSolved: ['Fragmented pipeline logic', 'Untracked artifact movement', 'Delayed deployment handoff'],
          productionValue: ['Traceable deliveries', 'Safer stage promotion', 'Improved release throughput'],
          relatedProjects: ['Platform deployment template', 'Artifact governance pipeline']
        }
      },
      {
        name: 'Jenkins',
        detail: {
          usedFor: ['Legacy pipeline integration', 'Custom workflow execution', 'Build automation'],
          problemsSolved: ['Disconnected legacy tooling', 'Manual orchestration overhead', 'Unreliable job chaining'],
          productionValue: ['Stable automation bridge', 'Extended pipeline compatibility', 'Controlled transition path'],
          relatedProjects: ['Legacy CI modernization', 'Cross-system job orchestration']
        }
      },
      {
        name: 'Release Automation',
        detail: {
          usedFor: ['Versioned releases', 'Deployment gate control', 'Rollback-aware delivery'],
          problemsSolved: ['Human release error', 'Unclear release ownership', 'Rollback delays'],
          productionValue: ['Predictable release quality', 'Safer production changes', 'Reduced operational friction'],
          relatedProjects: ['Release governance framework', 'Automated promotion pipeline']
        }
      }
    ]
  },
  {
    name: 'Cloud',
    skills: [
      {
        name: 'AWS',
        detail: {
          usedFor: ['Compute and network architecture', 'Managed service operations', 'Scalable environment design'],
          problemsSolved: ['Single-zone fragility', 'Manual scaling response', 'Service provisioning bottlenecks'],
          productionValue: ['Resilient cloud footprint', 'Elastic operational capacity', 'Improved service continuity'],
          relatedProjects: ['Multi-account deployment model', 'Resilient service platform']
        }
      },
      {
        name: 'Azure',
        detail: {
          usedFor: ['Cloud identity integration', 'Infrastructure lifecycle control', 'Operational workload hosting'],
          problemsSolved: ['Identity sprawl', 'Inconsistent cloud controls', 'Provisioning delays'],
          productionValue: ['Governed cloud operations', 'Unified access model', 'Stable workload execution'],
          relatedProjects: ['Identity-governed cloud rollout', 'Environment policy enforcement']
        }
      },
      {
        name: 'GCP',
        detail: {
          usedFor: ['Managed platform services', 'Container operations', 'Operational observability enablement'],
          problemsSolved: ['Platform complexity drift', 'Slow service bootstrap', 'Visibility gaps'],
          productionValue: ['Faster service enablement', 'Managed reliability controls', 'Simplified operational model'],
          relatedProjects: ['Managed container operations', 'Observability baseline setup']
        }
      },
      {
        name: 'IAM',
        detail: {
          usedFor: ['Role-based access', 'Policy enforcement', 'Credential boundary definition'],
          problemsSolved: ['Over-permissioned access', 'Weak ownership controls', 'Credential misuse risk'],
          productionValue: ['Stronger access governance', 'Reduced security exposure', 'Auditable identity controls'],
          relatedProjects: ['Least-privilege policy rollout', 'Cross-account access refactor']
        }
      },
      {
        name: 'Networking',
        detail: {
          usedFor: ['Network segmentation', 'Traffic security boundaries', 'Service communication paths'],
          problemsSolved: ['Flat network risk', 'Uncontrolled east-west traffic', 'Connectivity instability'],
          productionValue: ['Safer communication layers', 'Improved fault isolation', 'Reliable service connectivity'],
          relatedProjects: ['Segmented VPC architecture', 'Service mesh network hardening']
        }
      }
    ]
  },
  {
    name: 'Monitoring',
    skills: [
      {
        name: 'Prometheus',
        detail: {
          usedFor: ['Metrics collection', 'Service performance visibility', 'Alert rule evaluation'],
          problemsSolved: ['Missing runtime insight', 'Reactive incident handling', 'Blind performance regressions'],
          productionValue: ['Early signal detection', 'Operational visibility at scale', 'Data-driven response workflows'],
          relatedProjects: ['Metrics-first observability rollout', 'SLO signal framework']
        }
      },
      {
        name: 'Grafana',
        detail: {
          usedFor: ['Dashboarding', 'Operational telemetry analysis', 'Incident context visualization'],
          problemsSolved: ['Fragmented monitoring context', 'Slow issue diagnosis', 'Manual report compilation'],
          productionValue: ['Faster operational decisions', 'Shared incident visibility', 'Continuous reliability tracking'],
          relatedProjects: ['Unified operations dashboard', 'On-call diagnostics workspace']
        }
      },
      {
        name: 'Logging',
        detail: {
          usedFor: ['Runtime event analysis', 'Failure path tracing', 'Audit trail visibility'],
          problemsSolved: ['Opaque failure behavior', 'Difficult timeline reconstruction', 'Incomplete incident evidence'],
          productionValue: ['Improved post-incident analysis', 'Faster root cause validation', 'Higher debugging precision'],
          relatedProjects: ['Centralized log pipeline', 'Incident forensics enhancement']
        }
      },
      {
        name: 'Alerts',
        detail: {
          usedFor: ['Threshold and anomaly notifications', 'Service health escalation', 'Response prioritization'],
          problemsSolved: ['Delayed incident response', 'Noisy signal fatigue', 'Missed critical degradations'],
          productionValue: ['Higher signal quality', 'Reduced alert fatigue', 'Quicker intervention timing'],
          relatedProjects: ['Alert tuning initiative', 'Actionable paging framework']
        }
      },
      {
        name: 'Uptime Checks',
        detail: {
          usedFor: ['External service reachability', 'Availability verification', 'Endpoint health assurance'],
          problemsSolved: ['Silent endpoint failures', 'Late outage detection', 'Incomplete SLA visibility'],
          productionValue: ['Early outage awareness', 'Availability accountability', 'Continuous reliability posture'],
          relatedProjects: ['Endpoint reliability monitor', 'Availability assurance baseline']
        }
      }
    ]
  },
  {
    name: 'Security Basics',
    skills: [
      {
        name: 'Secrets Management',
        detail: {
          usedFor: ['Secure credential storage', 'Secret rotation workflows', 'Runtime secret injection'],
          problemsSolved: ['Hardcoded secrets risk', 'Credential leak exposure', 'Manual key handling'],
          productionValue: ['Stronger secret hygiene', 'Lower compromise probability', 'Safer operational practices'],
          relatedProjects: ['Centralized secrets platform', 'Automated secret rotation rollout']
        }
      },
      {
        name: 'Least Privilege',
        detail: {
          usedFor: ['Permission scoping', 'Role minimization', 'Controlled execution boundaries'],
          problemsSolved: ['Excessive privilege spread', 'Wide blast radius', 'Weak access accountability'],
          productionValue: ['Reduced security impact', 'Safer operational boundaries', 'Improved governance posture'],
          relatedProjects: ['Permission minimization program', 'Privilege review automation']
        }
      },
      {
        name: 'Patch Management',
        detail: {
          usedFor: ['Vulnerability remediation', 'System update scheduling', 'Risk-driven patch prioritization'],
          problemsSolved: ['Aging dependency exposure', 'Uncoordinated updates', 'Delayed security remediation'],
          productionValue: ['Lower vulnerability window', 'Predictable maintenance cycles', 'Improved system resilience'],
          relatedProjects: ['Automated patch cadence', 'Critical host update framework']
        }
      },
      {
        name: 'Access Control',
        detail: {
          usedFor: ['Authentication boundaries', 'Authorization rules', 'Operational access workflows'],
          problemsSolved: ['Untracked privileged actions', 'Access creep', 'Inconsistent control enforcement'],
          productionValue: ['Traceable access model', 'Stronger operational trust', 'Clear ownership accountability'],
          relatedProjects: ['Operational access policy baseline', 'Privileged access review cycle']
        }
      }
    ]
  },
  {
    name: 'Databases',
    skills: [
      {
        name: 'PostgreSQL',
        detail: {
          usedFor: ['Transactional storage', 'Operational data consistency', 'Structured query workflows'],
          problemsSolved: ['Data integrity issues', 'Unoptimized query patterns', 'Operational bottlenecks'],
          productionValue: ['Reliable data layer', 'Predictable transaction behavior', 'Stronger service continuity'],
          relatedProjects: ['Operational datastore hardening', 'Query performance stabilization']
        }
      },
      {
        name: 'Redis',
        detail: {
          usedFor: ['Caching strategy', 'Transient state handling', 'Queue-backed coordination'],
          problemsSolved: ['Latency spikes', 'Repeated query pressure', 'Slow transient operations'],
          productionValue: ['Lower response time variability', 'Higher throughput stability', 'Improved runtime efficiency'],
          relatedProjects: ['Cache layer rollout', 'High-speed state coordination']
        }
      },
      {
        name: 'Backups',
        detail: {
          usedFor: ['Recovery point protection', 'Data preservation', 'Continuity planning'],
          problemsSolved: ['Data loss exposure', 'Unverified restore paths', 'Recovery uncertainty'],
          productionValue: ['Recovery confidence', 'Safer incident response', 'Continuity under failure scenarios'],
          relatedProjects: ['Backup validation pipeline', 'Recovery readiness framework']
        }
      },
      {
        name: 'Replication Basics',
        detail: {
          usedFor: ['Data redundancy', 'Read scaling support', 'Availability reinforcement'],
          problemsSolved: ['Single-node dependency', 'Read contention', 'Failover fragility'],
          productionValue: ['Improved resilience profile', 'Safer failover posture', 'More stable data access'],
          relatedProjects: ['Read replica expansion', 'Failover readiness design']
        }
      }
    ]
  },
  {
    name: 'Scripting & Automation',
    skills: [
      {
        name: 'Bash',
        detail: {
          usedFor: ['Operational scripting', 'Host automation tasks', 'Maintenance routine orchestration'],
          problemsSolved: ['Repetitive manual tasks', 'Execution inconsistency', 'Slow routine operations'],
          productionValue: ['Faster operational cycles', 'Lower manual error rate', 'Repeatable maintenance behavior'],
          relatedProjects: ['Host automation toolkit', 'Operational command library']
        }
      },
      {
        name: 'Python',
        detail: {
          usedFor: ['Automation services', 'Operational tooling', 'Workflow integration scripts'],
          problemsSolved: ['Complex repetitive processes', 'Cross-tool synchronization gaps', 'Manual data handling'],
          productionValue: ['Higher automation depth', 'More reliable orchestration', 'Reduced operational overhead'],
          relatedProjects: ['Automation utility suite', 'Operations integration tooling']
        }
      },
      {
        name: 'Infrastructure Scripts',
        detail: {
          usedFor: ['Provisioning helper logic', 'Environment bootstrapping', 'Operational guardrail scripts'],
          problemsSolved: ['Setup friction', 'Inconsistent initialization', 'Unvalidated infra changes'],
          productionValue: ['Safer rollout support', 'Faster onboarding speed', 'Standardized execution patterns'],
          relatedProjects: ['Bootstrap framework', 'Pre-deploy validation scripts']
        }
      },
      {
        name: 'Cron Jobs',
        detail: {
          usedFor: ['Scheduled maintenance', 'Periodic reliability checks', 'Recurring automation tasks'],
          problemsSolved: ['Missed routine operations', 'Manual schedule dependency', 'Untracked recurring tasks'],
          productionValue: ['Steady operational rhythm', 'Proactive maintenance execution', 'Consistent background reliability'],
          relatedProjects: ['Scheduled maintenance automation', 'Health check scheduler']
        }
      }
    ]
  }
];

export function OperationalCapabilities() {
  const [activeCategory, setActiveCategory] = useState<string>(capabilityCategories[0].name);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(capabilityCategories[0].skills[0]);

  const filteredCategory = useMemo(
    () => capabilityCategories.find((category) => category.name === activeCategory) ?? capabilityCategories[0],
    [activeCategory]
  );

  useEffect(() => {
    setSelectedSkill(filteredCategory.skills[0] ?? null);
  }, [filteredCategory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSkill(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      aria-labelledby="operational-capabilities-title"
      className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5 shadow-[0_16px_50px_rgba(2,6,23,0.35)] sm:p-8"
    >
      <header className="mb-7 space-y-3 sm:mb-9">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Operational Capabilities</p>
        <h2 id="operational-capabilities-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Capability-Based DevOps Skill Profile
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Skills are mapped to real operational outcomes across reliability, automation, cloud operations, observability,
          and production safety.
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2 sm:mb-7" role="tablist" aria-label="Capability categories">
        {capabilityCategories.map((category) => {
          const isActive = category.name === activeCategory;
          return (
            <button
              key={category.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="capability-skill-grid"
              onClick={() => setActiveCategory(category.name)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:text-sm ${
                isActive
                  ? 'border-cyan-400/60 bg-cyan-400/14 text-cyan-100'
                  : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:text-slate-100'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div layout className="min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredCategory.name}
              id="capability-skill-grid"
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid gap-2.5 sm:grid-cols-2"
            >
              {filteredCategory.skills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;

                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    aria-pressed={isSelected}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      isSelected
                        ? 'border-cyan-400/55 bg-cyan-400/12 text-cyan-100 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]'
                        : 'border-slate-800 bg-slate-900/65 text-slate-300 hover:border-cyan-400/40 hover:text-slate-100 hover:shadow-[0_0_22px_rgba(34,211,238,0.14)]'
                    }`}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.aside
                key={`${filteredCategory.name}-${selectedSkill.name}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                aria-live="polite"
                className="h-full"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">{filteredCategory.name}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{selectedSkill.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    aria-label="Close skill details"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Used for</p>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSkill.detail.usedFor.map((item) => (
                        <li key={item} className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Problems solved</p>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSkill.detail.problemsSolved.map((item) => (
                        <li key={item} className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Production value</p>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSkill.detail.productionValue.map((item) => (
                        <li key={item} className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Related projects</p>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSkill.detail.relatedProjects.map((item) => (
                        <li key={item} className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.aside>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700/90 bg-slate-950/40 p-5 text-center"
              >
                <p className="max-w-sm text-sm text-slate-400">Select a capability to inspect its operational context.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
