'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CircleDot, LoaderCircle, Play, RotateCcw } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type StepStatus = 'pending' | 'running' | 'passed';

type PipelineStep = {
  id: string;
  name: string;
  tool: string;
  whyItMatters: string;
  productionConsideration: string;
  resultLabel: string;
};

const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    name: 'Source Code',
    tool: 'Git',
    whyItMatters: 'Versioned source enables traceable deployment changes and rollback confidence.',
    productionConsideration: 'Protect main branch with required checks before merge.',
    resultLabel: 'Ready'
  },
  {
    id: 'build',
    name: 'Build',
    tool: 'Build Runner',
    whyItMatters: 'Compiles deterministic artifacts for consistent runtime behavior.',
    productionConsideration: 'Fail fast on dependency or compile issues before artifact promotion.',
    resultLabel: 'Passed'
  },
  {
    id: 'test',
    name: 'Test',
    tool: 'Automated Test Suite',
    whyItMatters: 'Prevents unstable changes from reaching deployment stages.',
    productionConsideration: 'Enforce quality gates as mandatory release criteria.',
    resultLabel: 'Passed'
  },
  {
    id: 'docker',
    name: 'Docker Image',
    tool: 'Docker',
    whyItMatters: 'Packages service runtime consistently across environments.',
    productionConsideration: 'Use immutable tags and scanned base images.',
    resultLabel: 'Created'
  },
  {
    id: 'deploy',
    name: 'Deploy',
    tool: 'Deployment Orchestrator',
    whyItMatters: 'Rolls out changes to runtime environments in controlled sequence.',
    productionConsideration: 'Use progressive rollout with rollback safeguards.',
    resultLabel: 'Successful'
  },
  {
    id: 'health',
    name: 'Health Check',
    tool: 'Service Probes',
    whyItMatters: 'Verifies service readiness and runtime stability after rollout.',
    productionConsideration: 'Validate readiness before routing live traffic.',
    resultLabel: 'Healthy'
  },
  {
    id: 'monitor',
    name: 'Monitor',
    tool: 'Metrics & Alerting Stack',
    whyItMatters: 'Ensures ongoing visibility and rapid detection of regressions.',
    productionConsideration: 'Alert for actionable signals tied to service objectives.',
    resultLabel: 'Active'
  }
];

const staticLogLines = [
  '[build] Installing dependencies...',
  '[build] Creating production artifact...',
  '[test] Running automated checks...',
  '[docker] Building container image...',
  '[registry] Pushing image to registry...',
  '[deploy] Rolling out service...',
  '[healthcheck] Service is healthy.',
  '[monitoring] Metrics and alerts are active.'
] as const;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function DeploySimulator() {
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>(
    Object.fromEntries(pipelineSteps.map((step) => [step.id, 'pending']))
  );
  const [activeStepId, setActiveStepId] = useState<string>(pipelineSteps[0].id);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const abortRef = useRef(false);

  const activeStep = useMemo(
    () => pipelineSteps.find((step) => step.id === activeStepId) ?? pipelineSteps[0],
    [activeStepId]
  );

  const progress = useMemo(() => {
    const passedCount = pipelineSteps.filter((step) => statuses[step.id] === 'passed').length;
    const runningCount = pipelineSteps.filter((step) => statuses[step.id] === 'running').length;
    return Math.round(((passedCount + runningCount * 0.45) / pipelineSteps.length) * 100);
  }, [statuses]);

  const resetDeployment = () => {
    abortRef.current = true;
    setRunning(false);
    setStatuses(Object.fromEntries(pipelineSteps.map((step) => [step.id, 'pending'])));
    setTerminalLines([]);
    setActiveStepId(pipelineSteps[0].id);
  };

  const typeLogLine = async (line: string) => {
    let current = '';
    setTerminalLines((prev) => [...prev, '']);

    for (const char of line) {
      if (abortRef.current) return;
      current += char;
      setTerminalLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = current;
        return updated;
      });
      await sleep(14);
    }

    await sleep(110);
  };

  const runPipeline = async () => {
    if (running) return;

    abortRef.current = false;
    setRunning(true);
    setTerminalLines([]);
    setStatuses(Object.fromEntries(pipelineSteps.map((step) => [step.id, 'pending'])));

    for (const step of pipelineSteps) {
      if (abortRef.current) return;

      setActiveStepId(step.id);
      setStatuses((prev) => ({ ...prev, [step.id]: 'running' }));

      if (step.id === 'source') {
        await sleep(420);
      }

      if (step.id === 'build') {
        await typeLogLine(staticLogLines[0]);
        await typeLogLine(staticLogLines[1]);
      }

      if (step.id === 'test') {
        await typeLogLine(staticLogLines[2]);
      }

      if (step.id === 'docker') {
        await typeLogLine(staticLogLines[3]);
        await typeLogLine(staticLogLines[4]);
      }

      if (step.id === 'deploy') {
        await typeLogLine(staticLogLines[5]);
      }

      if (step.id === 'health') {
        await typeLogLine(staticLogLines[6]);
      }

      if (step.id === 'monitor') {
        await typeLogLine(staticLogLines[7]);
      }

      if (abortRef.current) return;
      setStatuses((prev) => ({ ...prev, [step.id]: 'passed' }));
      await sleep(320);
    }

    setRunning(false);
  };

  const statusLabel = (status: StepStatus, resultLabel: string) => {
    if (status === 'passed') return resultLabel;
    if (status === 'running') return 'Running';
    return 'Pending';
  };

  return (
    <section
      aria-labelledby="deploy-simulator-title"
      className="rounded-3xl border border-slate-800/90 bg-slate-950/85 p-5 shadow-[0_16px_50px_rgba(2,6,23,0.35)] sm:p-8"
    >
      <header className="mb-7 space-y-3 sm:mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Deploy Simulator</p>
        <h2 id="deploy-simulator-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Interactive CI/CD Deployment Flow
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Simulate a production deployment pipeline from source change to health validation and ongoing monitoring.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runPipeline}
          disabled={running}
          aria-label="Deploy demo service"
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/55 bg-cyan-400/12 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Deploy Demo Service
        </button>

        <button
          type="button"
          onClick={resetDeployment}
          aria-label="Reset deployment simulation"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset Deployment
        </button>
      </div>

      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400 sm:text-sm">
          <span>Pipeline Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full border border-slate-800 bg-slate-900/70">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400/85 to-cyan-300/90"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-2.5">
          {pipelineSteps.map((step, index) => {
            const status = statuses[step.id];
            const isActive = activeStepId === step.id;

            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.25, delay: index * 0.04, ease: 'easeOut' }}
                aria-pressed={isActive}
                aria-label={`Inspect ${step.name} step details`}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                  isActive
                    ? 'border-cyan-400/55 bg-cyan-400/10'
                    : 'border-slate-800 bg-slate-900/65 hover:border-slate-600'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-slate-100 sm:text-base">{step.name}</p>
                  <p className="text-xs text-slate-400 sm:text-sm">{statusLabel(status, step.resultLabel)}</p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 sm:text-sm">
                  {status === 'pending' ? <CircleDot className="h-4 w-4 text-slate-500" aria-hidden="true" /> : null}
                  {status === 'running' ? (
                    <LoaderCircle className="h-4 w-4 animate-spin text-cyan-300" aria-hidden="true" />
                  ) : null}
                  {status === 'passed' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  ) : null}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5"
              aria-live="polite"
            >
              <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">{activeStep.name}</h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Tool used</p>
                  <p className="text-slate-300">{activeStep.tool}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Why it matters</p>
                  <p className="text-slate-300">{activeStep.whyItMatters}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Production consideration</p>
                  <p className="text-slate-300">{activeStep.productionConsideration}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs sm:p-5 sm:text-sm" aria-label="Deployment terminal logs">
            <div className="mb-3 flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            </div>

            <div className="max-h-56 space-y-1 overflow-auto pr-1 text-slate-300">
              {terminalLines.length === 0 ? (
                <p className="text-slate-500">$ Awaiting deployment command...</p>
              ) : (
                terminalLines.map((line, idx) => <p key={`${idx}-${line}`}>{line}</p>)
              )}
              {running ? <p className="inline-block animate-pulse text-cyan-200">▋</p> : null}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
