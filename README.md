# DevOps Command Center Portfolio

A polished, production-style DevOps portfolio application built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide, and Recharts.

## Core Focus

This portfolio is structured around operational engineering themes:

- Infrastructure automation
- CI/CD delivery reliability
- Cloud operations
- Monitoring and observability
- Incident response
- Production system excellence

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts

## Sections

1. Production Status Hero
2. Engineering Journey
3. Operational Capabilities
4. DevOps Case Studies
5. Deploy Simulator
6. System Health Dashboard
7. Debug Challenge
8. DevOps Experience Timeline
9. DevOps Contact Wizard

## Global UX Components

- Floating header navigation
- Command palette (`Ctrl/Cmd + K`)
- Theme toggle (Dark / Light / System)
- Floating terminal shortcut to Deploy Simulator

## Folder Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  design-system/
    Badge.tsx
    Button.tsx
    Card.tsx
    Container.tsx
    IconButton.tsx
    MetricCard.tsx
    Section.tsx
    SectionHeader.tsx
    TerminalPanel.tsx
    index.ts
  navigation/
    CommandPalette.tsx
    HeaderNavigation.tsx
    ThemeToggle.tsx
  ProductionStatusHero.tsx
  EngineeringJourney.tsx
  OperationalCapabilities.tsx
  DevOpsCaseStudies.tsx
  DeploySimulator.tsx
  SystemHealthDashboard.tsx
  DebugChallenge.tsx
  DevOpsExperienceTimeline.tsx
  DevOpsContactWizard.tsx
data/
  siteShell.ts
  portfolioData.ts
lib/
  utils.ts
tailwind.config.ts
package.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start local development:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Start production server:

```bash
npm run start
```

## Notes

- All navigation IDs are wired for smooth scroll and active section tracking.
- Command palette actions route to operational sections and support keyboard navigation.
- Theme mode persists in local storage and supports system preference.
- Reduced motion preferences are respected globally.
// webhook test
// webhook test
