import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  description?: string;
  kicker?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeader({ title, description, kicker, actions, className }: SectionHeaderProps) {
  return (
    <header className={cn('mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10', className)}>
      <div className="space-y-2">
        {kicker ? <p className="text-xs uppercase tracking-[0.16em] text-accent/90">{kicker}</p> : null}
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl lg:text-4xl">{title}</h2>
        {description ? <p className="max-w-3xl text-sm text-muted sm:text-base">{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}
