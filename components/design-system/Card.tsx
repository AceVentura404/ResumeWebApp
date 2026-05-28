import type { ElementType, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type CardProps = PropsWithChildren<{
  as?: ElementType;
  className?: string;
}>;

export function Card({ as: Comp = 'article', className, children }: CardProps) {
  return (
    <Comp className={cn('rounded-2xl border border-border bg-panel/90 p-5 shadow-soft backdrop-blur-sm', className)}>
      {children}
    </Comp>
  );
}
