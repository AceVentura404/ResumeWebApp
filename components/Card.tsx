import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <article className={cn('rounded-2xl border border-border bg-panel/90 p-5 shadow-soft', className)}>
      {children}
    </article>
  );
}
