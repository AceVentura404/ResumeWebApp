import type { PropsWithChildren } from 'react';
import { Container } from './Container';
import { cn } from '@/lib/utils';

type SectionProps = PropsWithChildren<{
  id: string;
  className?: string;
}>;

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-14 sm:py-20', className)}>
      <Container>{children}</Container>
    </section>
  );
}
