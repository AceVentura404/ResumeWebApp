'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';

type MetricCardProps = {
  label: string;
  value: number;
  suffix?: string;
  precision?: number;
  trend?: string;
  icon?: ReactNode;
};

export function MetricCard({ label, value, suffix = '', precision = 0, trend, icon }: MetricCardProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const totalFrames = 36;
    const increment = value / totalFrames;

    const timer = window.setInterval(() => {
      frame += 1;
      const next = Math.min(value, increment * frame);
      setDisplay(next);
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, [inView, prefersReducedMotion, value]);

  return (
    <Card className="p-4 sm:p-5">
      <div ref={ref} className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
          {icon ? <span className="text-muted">{icon}</span> : null}
        </div>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-text sm:text-3xl"
        >
          {display.toFixed(precision)}
          <span className="ml-1 text-sm font-medium text-muted sm:text-base">{suffix}</span>
        </motion.p>
        {trend ? <p className="text-xs text-muted">{trend}</p> : null}
      </div>
    </Card>
  );
}
