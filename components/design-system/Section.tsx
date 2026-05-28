'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  containerClassName?: string;
}>;

export function Section({ id, className, containerClassName, children }: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id={id} className={cn('scroll-mt-24 py-14 sm:py-20', className)}>
      <Container className={containerClassName}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
