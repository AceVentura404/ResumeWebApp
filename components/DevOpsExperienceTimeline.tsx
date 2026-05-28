'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, FolderKanban, Server, ShieldCheck, Workflow } from 'lucide-react';
import type { ComponentType } from 'react';
import { useState } from 'react';

type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  period: string;
  achievements: string[];
  responsibilities: string[];
  technologies: string[];
  measurableOutcomes: string[];
  relatedProjects: string[];
  icon: ComponentType<{ className?: string }>;
};

const roles: ExperienceRole[] = [
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    company: 'Company Name',
    period: '2023–Present',
    achievements: [
      'Automated deployment workflows with gated pipeline controls to reduce manual release handling.',
      'Containerized production services for stable, reproducible runtime behavior across environments.',
      'Improved deployment reliability through release validation and rollback-aware operational checks.'
    ],
    responsibilities: [
      'Design and maintain CI/CD workflows with quality gates and promotion controls.',
      'Implement infrastructure automation standards for repeatable environment provisioning.',
      'Drive production readiness practices across release operations and incident prevention.'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Linux'],
    measurableOutcomes: [
      'Reduced manual deployment effort across release cycles.',
      'Increased release consistency with fewer rollout regressions.',
      'Shortened time from code integration to production deployment.'
    ],
    relatedProjects: ['Production Deployment Pipeline', 'Containerized Service Platform'],
    icon: Workflow
  },
  {
    id: 'infrastructure-engineer',
    title: 'Infrastructure Engineer',
    company: 'Company Name',
    period: '2021–2023',
    achievements: [
      'Built infrastructure templates to standardize cloud resource provisioning and reduce configuration drift.',
      'Established environment baseline controls for networking, identity boundaries, and service operations.',
      'Improved operational stability with infrastructure-as-code and policy-oriented change validation.'
    ],
    responsibilities: [
      'Architect cloud environments with repeatable infrastructure modules.',
      'Define operational guardrails for identity, network segmentation, and access governance.',
      'Collaborate on reliability planning for resilient production infrastructure.'
    ],
    technologies: ['Terraform', 'AWS', 'Azure', 'IAM', 'Networking'],
    measurableOutcomes: [
      'Reduced environment provisioning time through codified infrastructure workflows.',
      'Improved infrastructure consistency across staging and production.',
      'Lowered operational risk associated with manual provisioning changes.'
    ],
    relatedProjects: ['Cloud Infrastructure Blueprint', 'Environment Baseline Framework'],
    icon: Server
  },
  {
    id: 'system-administrator',
    title: 'System Administrator',
    company: 'Company Name',
    period: '2019–2021',
    achievements: [
      'Maintained Linux-based systems with uptime-focused operational practices and proactive maintenance.',
      'Automated recurring system tasks to reduce manual overhead and improve execution consistency.',
      'Strengthened incident response readiness through monitoring, runbooks, and operational checklists.'
    ],
    responsibilities: [
      'Operate and maintain critical systems with reliability-centered maintenance procedures.',
      'Automate routine tasks for patching, validation, and service health checks.',
      'Support incident triage and recovery with practical diagnostic workflows.'
    ],
    technologies: ['Linux', 'Bash', 'Monitoring Stack', 'Patch Management', 'Access Control'],
    measurableOutcomes: [
      'Improved service uptime through preventive maintenance execution.',
      'Reduced repetitive operational workload with automation scripts.',
      'Faster issue resolution through clearer operational runbooks.'
    ],
    relatedProjects: ['Operational Runbook Initiative', 'System Reliability Baseline'],
    icon: ShieldCheck
  }
];

export function DevOpsExperienceTimeline() {
  const [activeRoleId, setActiveRoleId] = useState<string>(roles[0].id);

  return (
    <section
      aria-labelledby="devops-experience-timeline-title"
      className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-950/88 to-slate-950/92 p-5 shadow-[0_18px_55px_rgba(2,6,23,0.33)] sm:p-8"
    >
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">DevOps Experience Timeline</p>
        <h2 id="devops-experience-timeline-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Operational Growth Through Reliability and Automation
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Professional journey focused on infrastructure stability, delivery automation, and measurable production outcomes.
        </p>
      </header>

      <div className="relative pl-8 sm:pl-10">
        <span className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-slate-800 sm:left-3" aria-hidden="true" />

        <div className="space-y-4">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const active = role.id === activeRoleId;

            return (
              <motion.article
                key={role.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.32, delay: index * 0.06, ease: 'easeOut' }}
                className="relative"
              >
                <span
                  className={`absolute -left-[1.65rem] top-7 h-2.5 w-2.5 rounded-full border sm:-left-[2.15rem] ${
                    active ? 'border-cyan-300/80 bg-cyan-300/70' : 'border-slate-600 bg-slate-800'
                  }`}
                  aria-hidden="true"
                />

                <div
                  className={`rounded-2xl border transition-colors ${
                    active ? 'border-cyan-400/55 bg-cyan-400/8' : 'border-slate-800 bg-slate-900/65'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveRoleId((prev) => (prev === role.id ? '' : role.id))}
                    aria-expanded={active}
                    aria-controls={`role-panel-${role.id}`}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <div className="flex items-start gap-3">
                      <motion.span
                        whileHover={{ y: -1.5, scale: 1.05 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border ${
                          active ? 'border-cyan-400/55 bg-cyan-400/12 text-cyan-100' : 'border-slate-700 text-slate-300'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>

                      <div>
                        <h3 className="text-base font-semibold text-slate-100 sm:text-lg">{role.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">
                          {role.company} — {role.period}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                          {role.achievements.map((achievement) => (
                            <li key={achievement}>• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        active ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        id={`role-panel-${role.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        className="overflow-hidden border-t border-slate-800"
                      >
                        <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5">
                          <section>
                            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-cyan-300/90">Responsibilities</p>
                            <ul className="space-y-1.5 text-sm text-slate-300">
                              {role.responsibilities.map((item) => (
                                <li key={item} className="rounded-lg border border-slate-800 bg-slate-950/45 px-3 py-2">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </section>

                          <section>
                            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-cyan-300/90">Technologies Used</p>
                            <div className="flex flex-wrap gap-2">
                              {role.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </section>

                          <section>
                            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-cyan-300/90">Measurable Outcomes</p>
                            <ul className="space-y-1.5 text-sm text-slate-300">
                              {role.measurableOutcomes.map((outcome) => (
                                <li key={outcome} className="rounded-lg border border-slate-800 bg-slate-950/45 px-3 py-2">
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </section>

                          <section>
                            <p className="mb-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                              <FolderKanban className="h-3.5 w-3.5" />
                              Related DevOps Projects
                            </p>
                            <ul className="space-y-1.5 text-sm text-slate-300">
                              {role.relatedProjects.map((project) => (
                                <li key={project} className="rounded-lg border border-slate-800 bg-slate-950/45 px-3 py-2">
                                  {project}
                                </li>
                              ))}
                            </ul>
                          </section>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
