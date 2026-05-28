'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Card } from './Card';

type TerminalPanelProps = {
  title?: string;
  lines: string[];
  footer?: ReactNode;
};

export function TerminalPanel({ title = 'Runtime Logs', lines, footer }: TerminalPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card className="font-mono text-xs sm:text-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-critical/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-healthy/85" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{title}</p>
      </div>

      <div className="space-y-1 text-slate-300">
        {lines.map((line, index) => (
          <motion.p
            key={`${index}-${line}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.04, duration: 0.2, ease: 'easeOut' }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {footer ? <div className="mt-3 border-t border-border pt-3 text-muted">{footer}</div> : null}
    </Card>
  );
}
