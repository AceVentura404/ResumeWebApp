import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border border-border bg-bg/60 px-2.5 py-1 text-xs font-medium text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}
