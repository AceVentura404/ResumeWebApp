import type { NavItem } from '@/components/navigation/HeaderNavigation';

export const siteShell = {
  title: 'DevOps Command Center Portfolio',
  description:
    'Production-focused DevOps portfolio covering infrastructure automation, CI/CD reliability, observability, incident response, and operational excellence.',
  contactEmail: 'your.email@example.com',
  cvUrl: '/cv.pdf'
} as const;

export const navigationItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'deploy-simulator', label: 'Deploy Simulator' },
  { id: 'system-health', label: 'System Health' },
  { id: 'debug-challenge', label: 'Debug Challenge' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];
