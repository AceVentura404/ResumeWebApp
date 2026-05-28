'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type AnimatedRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function AnimatedReveal({ children, className, delay = 0 }: AnimatedRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
