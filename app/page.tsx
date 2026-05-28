import { TerminalSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { Container } from '@/components/design-system';
import { DebugChallenge } from '@/components/DebugChallenge';
import { DeploySimulator } from '@/components/DeploySimulator';
import { DevOpsCaseStudies } from '@/components/DevOpsCaseStudies';
import { DevOpsContactWizard } from '@/components/DevOpsContactWizard';
import { DevOpsExperienceTimeline } from '@/components/DevOpsExperienceTimeline';
import { EngineeringJourney } from '@/components/EngineeringJourney';
import { OperationalCapabilities } from '@/components/OperationalCapabilities';
import { ProductionStatusHero } from '@/components/ProductionStatusHero';
import { SystemHealthDashboard } from '@/components/SystemHealthDashboard';
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation';
import { navigationItems, siteShell } from '@/data/siteShell';

export const metadata: Metadata = {
  title: siteShell.title,
  description: siteShell.description,
  alternates: { canonical: '/' }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: 'DevOps Engineer',
  url: 'https://example.com',
  sameAs: ['https://github.com/your-username', 'https://linkedin.com/in/your-profile'],
  knowsAbout: [
    'Infrastructure Automation',
    'CI/CD Engineering',
    'Cloud Operations',
    'Monitoring and Observability',
    'Incident Response',
    'Production Reliability'
  ]
};

export default function HomePage() {
  return (
    <>
      <HeaderNavigation items={navigationItems} cvUrl={siteShell.cvUrl} contactEmail={siteShell.contactEmail} />

      <main className="pb-20 pt-24 sm:pt-28">
        <section id="home" aria-label="Production Status">
          <Container>
            <ProductionStatusHero projectHref="#case-studies" contactHref="#contact" cvHref={siteShell.cvUrl} />
          </Container>
        </section>

        <section id="journey" aria-label="Engineering Journey">
          <Container>
            <EngineeringJourney />
          </Container>
        </section>

        <section id="capabilities" aria-label="Operational Capabilities">
          <Container>
            <OperationalCapabilities />
          </Container>
        </section>

        <section id="case-studies" aria-label="DevOps Case Studies">
          <Container>
            <DevOpsCaseStudies />
          </Container>
        </section>

        <section id="deploy-simulator" aria-label="Deploy Simulator">
          <Container>
            <DeploySimulator />
          </Container>
        </section>

        <section id="system-health" aria-label="System Health Dashboard">
          <Container>
            <SystemHealthDashboard />
          </Container>
        </section>

        <section id="debug-challenge" aria-label="Debug Challenge">
          <Container>
            <DebugChallenge />
          </Container>
        </section>

        <section id="experience" aria-label="DevOps Experience Timeline">
          <Container>
            <DevOpsExperienceTimeline />
          </Container>
        </section>

        <section id="contact" aria-label="DevOps Contact Wizard">
          <Container>
            <DevOpsContactWizard />
          </Container>
        </section>
      </main>

      <a
        href="#deploy-simulator"
        aria-label="Open Deploy Simulator"
        className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-200 backdrop-blur transition-colors hover:border-cyan-400/55 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        <TerminalSquare className="h-4 w-4" />
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
