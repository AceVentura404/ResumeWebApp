export const siteConfig = {
  title: 'DevOps Command Center Portfolio',
  subtitle: 'DevOps Engineer',
  description: 'Minimalist premium portfolio base built for production-ready engineering stories.',
  accent: 'cyan'
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Playground', href: '#playground' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Debug Challenge', href: '#debug-challenge' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
] as const;

export const hero = {
  name: 'Your Name',
  title: 'DevOps Engineer',
  statement: 'Building resilient infrastructure, stable delivery pipelines, and production-ready systems.',
  terminalLines: ['$ initializing command-center...', 'mode: production-ready', 'status: green']
};

export const aboutParagraphs = [
  'I design systems with reliability first, then optimize for speed and developer ergonomics.',
  'My workflow combines infrastructure automation with practical product delivery.',
  'I prefer clean architecture, typed contracts, and observable deployments that are easy to operate.'
];

export const skillGroups = [
  {
    label: 'Infrastructure',
    items: ['Docker', 'Kubernetes', 'Linux', 'Terraform']
  },
  {
    label: 'CI/CD',
    items: ['GitHub Actions', 'GitLab CI', 'Jenkins']
  },
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'GCP']
  },
  {
    label: 'Automation',
    items: ['TypeScript', 'Node.js', 'Python', 'Bash']
  }
] as const;

export const projects = [
  {
    name: 'Pipeline Reliability Suite',
    problem: 'Manual deployments increased rollback risk.',
    solution: 'Implemented a gated CI/CD pipeline with automated checks and release controls.',
    stack: ['GitHub Actions', 'Docker', 'Kubernetes']
  },
  {
    name: 'Cloud Landing Zone Blueprint',
    problem: 'Infrastructure drift across environments.',
    solution: 'Introduced Terraform modules for consistent provisioning and policy guardrails.',
    stack: ['Terraform', 'AWS', 'OIDC']
  },
  {
    name: 'Service Observability Hub',
    problem: 'Fragmented monitoring slowed incident response.',
    solution: 'Unified logs, metrics, and health insights in one operational view.',
    stack: ['Prometheus', 'Grafana', 'PostgreSQL']
  }
] as const;

export const playgroundItems = [
  'Canary deploy simulation',
  'API latency budget tracker',
  'Infrastructure drift detector'
] as const;

export const dashboardStats = [
  { label: 'Deploy Success', value: '99.7%' },
  { label: 'MTTR', value: '14 min' },
  { label: 'Lead Time', value: '2.1 hrs' }
] as const;

export const dashboardChartData = [
  { day: 'Mon', deployments: 6, incidents: 1 },
  { day: 'Tue', deployments: 8, incidents: 0 },
  { day: 'Wed', deployments: 5, incidents: 1 },
  { day: 'Thu', deployments: 9, incidents: 0 },
  { day: 'Fri', deployments: 7, incidents: 0 },
  { day: 'Sat', deployments: 4, incidents: 0 },
  { day: 'Sun', deployments: 6, incidents: 1 }
] as const;

export const debugChallenge = {
  title: 'Race Condition in Deployment Queue',
  summary: 'A sporadic ordering issue appears when parallel jobs promote the same service.',
  prompts: [
    'Reproduce under controlled load',
    'Capture queue timestamps and lock ownership',
    'Apply idempotency key strategy'
  ]
};

export const experience = [
  {
    role: 'DevOps Engineer',
    company: 'Company Name',
    period: '2023 - Present',
    outcomes: ['Reduced deployment failures by 38%', 'Standardized CI/CD templates across teams']
  },
  {
    role: 'Infrastructure Engineer',
    company: 'Company Name',
    period: '2021 - 2023',
    outcomes: ['Standardized infrastructure modules', 'Improved deployment stability and runtime consistency']
  },
  {
    role: 'System Administrator',
    company: 'Company Name',
    period: '2019 - 2021',
    outcomes: ['Maintained high-availability Linux hosts', 'Automated patching and operational runbooks']
  }
] as const;

export const contact = {
  email: 'your.email@example.com',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile'
};
