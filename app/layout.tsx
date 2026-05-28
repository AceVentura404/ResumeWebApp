import type { Metadata } from 'next';
import './globals.css';
import { siteShell } from '@/data/siteShell';

export const metadata: Metadata = {
  title: siteShell.title,
  description: siteShell.description,
  applicationName: siteShell.title,
  keywords: [
    'DevOps',
    'CI/CD',
    'Infrastructure Automation',
    'Observability',
    'Cloud Operations',
    'Production Reliability'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
