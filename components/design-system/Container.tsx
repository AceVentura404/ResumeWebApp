import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = PropsWithChildren<{
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}>;

const sizeMap = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl'
} as const;

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-5 sm:px-7 lg:px-10', sizeMap[size], className)}>{children}</div>;
}
