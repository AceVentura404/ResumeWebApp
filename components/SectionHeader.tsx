import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeader({ title, description, actions }: SectionHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}
