'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Download, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useMemo, useState } from 'react';

type StepKey = 'focus' | 'timeline' | 'collaboration';

type WizardState = {
  focus: string;
  timeline: string;
  collaboration: string;
};

const stepOrder: StepKey[] = ['focus', 'timeline', 'collaboration'];

const stepConfig: Record<
  StepKey,
  {
    question: string;
    options: string[];
  }
> = {
  focus: {
    question: 'What do you need help with?',
    options: ['CI/CD', 'Infrastructure Automation', 'Cloud Operations', 'Monitoring', 'Kubernetes', 'Incident Response']
  },
  timeline: {
    question: 'What is the timeline?',
    options: ['ASAP', '1 month', '3 months', 'Flexible']
  },
  collaboration: {
    question: 'What type of collaboration?',
    options: ['Full-time', 'Contract', 'Consulting', 'Infrastructure Review']
  }
};

const initialState: WizardState = {
  focus: '',
  timeline: '',
  collaboration: ''
};

export function DevOpsContactWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);
  const [copied, setCopied] = useState(false);

  const currentStepKey = stepOrder[activeStep];
  const currentStep = stepConfig[currentStepKey];

  const completed = stepOrder.every((key) => Boolean(state[key]));

  const generatedMessage = useMemo(() => {
    if (!completed) return '';

    return `Hi, I'm interested in discussing a DevOps opportunity focused on ${state.focus} with a timeline of ${state.timeline}. I’m looking for ${state.collaboration.toLowerCase()} collaboration and would like to connect and share more details.`;
  }, [completed, state]);

  const handleSelect = (value: string) => {
    const key = currentStepKey;
    setState((prev) => ({ ...prev, [key]: value }));

    if (activeStep < stepOrder.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const resetWizard = () => {
    setState(initialState);
    setActiveStep(0);
    setCopied(false);
  };

  const copyMessage = async () => {
    if (!generatedMessage) return;
    await navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent('DevOps Opportunity Discussion');
    const body = encodeURIComponent(generatedMessage || 'Hi, I would like to discuss a DevOps opportunity.');
    return `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  }, [generatedMessage]);

  return (
    <section
      aria-labelledby="devops-contact-wizard-title"
      className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950 p-5 shadow-[0_18px_55px_rgba(2,6,23,0.34)] sm:p-8"
    >
      <header className="mb-7 space-y-3 sm:mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">DevOps Contact Wizard</p>
        <h2 id="devops-contact-wizard-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Define Your DevOps Opportunity
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Use this guided flow to generate a clear outreach message based on delivery priorities, timeline, and
          collaboration type.
        </p>
      </header>

      <div className="mb-6 grid gap-2 sm:grid-cols-4">
        {stepOrder.map((key, index) => {
          const done = Boolean(state[key]);
          const current = index === activeStep;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors sm:text-sm ${
                current
                  ? 'border-cyan-400/60 bg-cyan-400/12 text-cyan-100'
                  : done
                    ? 'border-emerald-400/45 bg-emerald-400/10 text-emerald-200'
                    : 'border-slate-800 bg-slate-900/65 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
              aria-current={current ? 'step' : undefined}
              aria-label={`Go to step ${index + 1}`}
            >
              <span className="inline-flex items-center gap-1.5">
                {done ? <Check className="h-3.5 w-3.5" /> : null}
                Step {index + 1}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={currentStepKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5"
          >
            <p className="mb-4 text-sm font-medium text-slate-100 sm:text-base">{currentStep.question}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {currentStep.options.map((option) => {
                const selected = state[currentStepKey] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      selected
                        ? 'border-cyan-400/60 bg-cyan-400/14 text-cyan-100'
                        : 'border-slate-800 bg-slate-950/55 text-slate-300 hover:border-slate-600 hover:text-slate-100'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-cyan-400/35 bg-cyan-400/10 p-4 sm:p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-cyan-200">Generated Message</p>
              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">{generatedMessage}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy Message'}
              </button>

              <a
                href={emailHref}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/55 bg-cyan-400/12 px-4 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <Send className="h-4 w-4" />
                Send Email
              </a>

              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>

              <button
                type="button"
                onClick={resetWizard}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-7 grid gap-2 border-t border-slate-800 pt-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <a
          href="mailto:your.email@example.com"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/65 px-3 py-2 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          <Mail className="h-4 w-4 text-cyan-300" />
          Email Placeholder
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/65 px-3 py-2 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          <Linkedin className="h-4 w-4 text-cyan-300" />
          LinkedIn Placeholder
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/65 px-3 py-2 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          <Github className="h-4 w-4 text-cyan-300" />
          GitHub Placeholder
        </a>
        <a
          href="/cv.pdf"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/65 px-3 py-2 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
        >
          <Download className="h-4 w-4 text-cyan-300" />
          Download CV
        </a>
      </footer>
    </section>
  );
}
