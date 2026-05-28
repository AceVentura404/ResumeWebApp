import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
};

type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantMap = {
  primary: 'border-accent/60 bg-accent/12 text-accent hover:bg-accent/20',
  secondary: 'border-border bg-panel text-text hover:border-slate-500',
  ghost: 'border-transparent bg-transparent text-muted hover:border-border hover:bg-panel',
  danger: 'border-critical/50 bg-critical/10 text-critical hover:bg-critical/20'
} as const;

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs sm:text-sm',
  md: 'px-4 py-2 text-sm'
} as const;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'secondary';
  const size = props.size ?? 'md';
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60',
    variantMap[variant],
    sizeMap[size],
    props.className
  );

  if (typeof props.href === 'string') {
    const { children, className: _className, variant: _variant, size: _size, href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { children, className: _className, variant: _variant, size: _size, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
