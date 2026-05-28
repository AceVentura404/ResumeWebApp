import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  className?: string;
};

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = LinkProps | NativeProps;

const styles = {
  solid: 'border-accent/60 bg-accent/15 text-accent hover:bg-accent/20',
  ghost: 'border-border bg-panel text-text hover:border-accent/50 hover:text-accent'
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'ghost';
  const className = cn(
    'inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    styles[variant],
    props.className
  );

  if (typeof props.href === 'string') {
    const { children, variant: _variant, className: _className, href, ...linkProps } = props;
    return (
      <a href={href} className={className} {...linkProps}>
        {children}
      </a>
    );
  }

  const { children, variant: _variant, className: _className, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={className} {...buttonProps}>
      {children}
    </button>
  );
}
