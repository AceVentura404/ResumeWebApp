import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'healthy' | 'warning' | 'critical' | 'info';

type BadgeProps = PropsWithChildren<{
  className?: string;
  tone?: BadgeTone;
}>;

const toneMap = {
  neutral: 'border-border bg-bg/50 text-muted',
  healthy: 'border-healthy/40 bg-healthy/10 text-healthy',
  warning: 'border-warning/45 bg-warning/10 text-warning',
  critical: 'border-critical/45 bg-critical/10 text-critical',
  info: 'border-accent/45 bg-accent/10 text-accent'
} as const;

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', toneMap[tone], className)}>
      {children}
    </span>
  );
}
