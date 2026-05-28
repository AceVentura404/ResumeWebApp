import type { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-10">{children}</div>;
}
