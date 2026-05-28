import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  icon: ReactNode;
  label: string;
  className?: string;
};

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type IconButtonProps = LinkProps | NativeProps;

const baseClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-panel text-muted transition-colors hover:border-slate-500 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export function IconButton(props: IconButtonProps) {
  if (typeof props.href === 'string') {
    const { icon, label, className, href, ...anchorProps } = props;
    return (
      <a href={href} aria-label={label} className={cn(baseClass, className)} {...anchorProps}>
        {icon}
      </a>
    );
  }

  const { icon, label, className, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} aria-label={label} className={cn(baseClass, className)} {...buttonProps}>
      {icon}
    </button>
  );
}
