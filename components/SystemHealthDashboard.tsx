'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Gauge,
  ShieldAlert,
  Siren,
  Timer,
  Zap
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart
} from 'recharts';

type RiskLevel = 'Low' | 'Medium' | 'High';
type ServiceStatus = 'Healthy' | 'Degraded' | 'Warning';

type MetricItem = {
  label: string;
  value: number;
  suffix?: string;
  precision?: number;
};

type ServiceItem = {
  name: string;
  status: ServiceStatus;
  healthValue: string;
  responseTimeMs: number;
  lastChecked: string;
  note: string;
  recentLogs: string[];
  lastDeployment: string;
  alertPolicy: string;
  riskLevel: RiskLevel;
};

const metrics: MetricItem[] = [
  { label: 'Service Health', value: 99.9, suffix: '%', precision: 1 },
  { label: 'Uptime', value: 99.98, suffix: '%', precision: 2 },
  { label: 'Last Deployment', value: 2, suffix: ' days ago' },
  { label: 'CI Status', value: 1, suffix: ' Passing' },
  { label: 'Error Rate', value: 0.12, suffix: '%', precision: 2 },
  { label: 'Response Time', value: 184, suffix: ' ms' },
  { label: 'Incident-free Days', value: 47, suffix: ' days' }
];

const services: ServiceItem[] = [
  {
    name: 'API Service',
    status: 'Healthy',
    healthValue: 'Healthy',
    responseTimeMs: 184,
    lastChecked: '45s ago',
    note: 'Stable latency and steady throughput under current load.',
    recentLogs: [
      '200 responses stable for critical routes',
      'Latency p95 remains below threshold',
      'No retry storm detected in upstream calls'
    ],
    lastDeployment: '2 days ago',
    alertPolicy: 'latency > 800ms for 5 minutes',
    riskLevel: 'Low'
  },
  {
    name: 'Worker Service',
    status: 'Healthy',
    healthValue: 'Queue healthy',
    responseTimeMs: 236,
    lastChecked: '1m ago',
    note: 'Background job queue is draining normally with no backlog growth.',
    recentLogs: [
      'Queue depth within normal range',
      'No dead-letter escalation events',
      'Job retry count stable'
    ],
    lastDeployment: '4 days ago',
    alertPolicy: 'queue delay > 90s for 10 minutes',
    riskLevel: 'Low'
  },
  {
    name: 'Database',
    status: 'Warning',
    healthValue: 'Replication lag 3s',
    responseTimeMs: 322,
    lastChecked: '35s ago',
    note: 'Minor replication lag observed during peak write windows.',
    recentLogs: [
      'Replica lag spike detected and recovering',
      'Disk I/O remains within safe envelope',
      'Connection pool utilization elevated'
    ],
    lastDeployment: '7 days ago',
    alertPolicy: 'replication lag > 5s for 3 minutes',
    riskLevel: 'Medium'
  },
  {
    name: 'CI Pipeline',
    status: 'Healthy',
    healthValue: 'Passing',
    responseTimeMs: 142,
    lastChecked: '20s ago',
    note: 'Pipeline gates remain stable with deterministic artifact flow.',
    recentLogs: [
      'Build stage completed successfully',
      'Test gate passed without retries',
      'Artifact promoted to release channel'
    ],
    lastDeployment: '8h ago',
    alertPolicy: 'pipeline failure rate > 15% in 30 minutes',
    riskLevel: 'Low'
  },
  {
    name: 'Monitoring Stack',
    status: 'Degraded',
    healthValue: 'Alert delay 40s',
    responseTimeMs: 268,
    lastChecked: '50s ago',
    note: 'Alert delivery delay detected for non-critical channels.',
    recentLogs: [
      'Alert fanout latency above baseline',
      'Metrics ingestion healthy',
      'Notification gateway retrying failed sends'
    ],
    lastDeployment: '5 days ago',
    alertPolicy: 'alert dispatch delay > 30s for 10 minutes',
    riskLevel: 'Medium'
  }
];

const responseTrend = [
  { t: '00:00', response: 210 },
  { t: '04:00', response: 195 },
  { t: '08:00', response: 178 },
  { t: '12:00', response: 202 },
  { t: '16:00', response: 188 },
  { t: '20:00', response: 184 }
];

const errorTrend = [
  { t: '00:00', error: 0.2 },
  { t: '04:00', error: 0.18 },
  { t: '08:00', error: 0.1 },
  { t: '12:00', error: 0.14 },
  { t: '16:00', error: 0.11 },
  { t: '20:00', error: 0.12 }
];

const deploymentTrend = [
  { day: 'Mon', deployments: 4 },
  { day: 'Tue', deployments: 6 },
  { day: 'Wed', deployments: 5 },
  { day: 'Thu', deployments: 7 },
  { day: 'Fri', deployments: 5 },
  { day: 'Sat', deployments: 3 },
  { day: 'Sun', deployments: 4 }
];

function AnimatedMetric({ metric }: { metric: MetricItem }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = 42;
    const step = metric.value / totalFrames;

    const id = window.setInterval(() => {
      frame += 1;
      const next = Math.min(metric.value, step * frame);
      setDisplay(next);

      if (frame >= totalFrames) {
        window.clearInterval(id);
      }
    }, 18);

    return () => window.clearInterval(id);
  }, [inView, metric.value]);

  const formatted = metric.precision != null ? display.toFixed(metric.precision) : Math.round(display).toString();

  return (
    <div ref={ref} className="rounded-2xl border border-slate-800 bg-slate-900/65 p-4 sm:p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{metric.label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
        {formatted}
        <span className="ml-1 text-sm font-medium text-slate-300 sm:text-base">{metric.suffix ?? ''}</span>
      </p>
    </div>
  );
}

function serviceStatusStyle(status: ServiceStatus) {
  if (status === 'Healthy') return 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10';
  if (status === 'Degraded') return 'text-amber-300 border-amber-400/40 bg-amber-400/10';
  return 'text-orange-300 border-orange-400/40 bg-orange-400/10';
}

function riskStyle(level: RiskLevel) {
  if (level === 'Low') return 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10';
  if (level === 'Medium') return 'text-amber-300 border-amber-400/40 bg-amber-400/10';
  return 'text-rose-300 border-rose-400/40 bg-rose-400/10';
}

export function SystemHealthDashboard() {
  const [activeServiceName, setActiveServiceName] = useState<string>(services[0].name);

  const activeService = useMemo(
    () => services.find((service) => service.name === activeServiceName) ?? services[0],
    [activeServiceName]
  );

  return (
    <section
      aria-labelledby="system-health-dashboard-title"
      className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-950/85 to-slate-950/90 p-5 shadow-[0_18px_52px_rgba(2,6,23,0.33)] sm:p-8"
    >
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">System Health Dashboard</p>
        <h2 id="system-health-dashboard-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Operational Awareness and Reliability Signals
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Monitor runtime health, latency, deployment activity, and alert posture through a unified observability view.
        </p>
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <AnimatedMetric key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const isActive = service.name === activeService.name;
              const healthyPulse = service.status === 'Healthy';

              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setActiveServiceName(service.name)}
                  aria-pressed={isActive}
                  aria-label={`Open ${service.name} details`}
                  className={`rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? 'border-cyan-400/55 bg-cyan-400/8'
                      : 'border-slate-800 bg-slate-900/65 hover:border-slate-600'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-100 sm:text-base">{service.name}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${serviceStatusStyle(service.status)}`}>
                      <span className={`inline-flex items-center gap-1 ${healthyPulse ? 'animate-pulse' : ''}`}>
                        {service.status === 'Healthy' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                        {service.status}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{service.healthValue}</p>
                  <p className="mt-1 text-xs text-slate-400">Response: {service.responseTimeMs}ms</p>
                  <p className="mt-1 text-xs text-slate-400">Last checked: {service.lastChecked}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{service.note}</p>
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/65 p-4"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-slate-400">Response Time Trend</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTrend}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="t" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
                    <Tooltip
                      contentStyle={{
                        background: '#0b1220',
                        border: '1px solid #1f2c42',
                        borderRadius: 10,
                        color: '#e2e8f0'
                      }}
                    />
                    <Line type="monotone" dataKey="response" stroke="#22d3ee" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: 0.06, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/65 p-4"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-slate-400">Error Rate Trend</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={errorTrend}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="t" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
                    <Tooltip
                      contentStyle={{
                        background: '#0b1220',
                        border: '1px solid #1f2c42',
                        borderRadius: 10,
                        color: '#e2e8f0'
                      }}
                    />
                    <Area type="monotone" dataKey="error" stroke="#34d399" fill="#34d399" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: 0.12, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/65 p-4"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-slate-400">Deployment Frequency</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deploymentTrend}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip
                      contentStyle={{
                        background: '#0b1220',
                        border: '1px solid #1f2c42',
                        borderRadius: 10,
                        color: '#e2e8f0'
                      }}
                    />
                    <Bar dataKey="deployments" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.article>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.aside
            key={activeService.name}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            aria-live="polite"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">{activeService.name}</h3>
              <span className={`rounded-full border px-2.5 py-1 text-xs ${riskStyle(activeService.riskLevel)}`}>
                Risk: {activeService.riskLevel}
              </span>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <p className="flex items-center gap-2 text-slate-300">
                <Timer className="h-4 w-4 text-cyan-300" /> Response time: {activeService.responseTimeMs}ms
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Clock3 className="h-4 w-4 text-cyan-300" /> Last deployment: {activeService.lastDeployment}
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Siren className="h-4 w-4 text-cyan-300" /> Alert policy: {activeService.alertPolicy}
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-cyan-300/90">Recent Logs</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {activeService.recentLogs.map((log) => (
                  <li key={log} className="rounded-lg border border-slate-800 bg-slate-950/55 px-3 py-2">
                    {log}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                <p className="mb-1 text-slate-400">Observability</p>
                <p className="inline-flex items-center gap-1.5 text-slate-200">
                  <Activity className="h-4 w-4 text-emerald-300" /> Telemetry Active
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                <p className="mb-1 text-slate-400">Health Policy</p>
                <p className="inline-flex items-center gap-1.5 text-slate-200">
                  <Gauge className="h-4 w-4 text-cyan-300" /> Probes Enforced
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                <p className="mb-1 text-slate-400">Reliability</p>
                <p className="inline-flex items-center gap-1.5 text-slate-200">
                  <Zap className="h-4 w-4 text-emerald-300" /> Stable Runtime
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                <p className="mb-1 text-slate-400">Alerting</p>
                <p className="inline-flex items-center gap-1.5 text-slate-200">
                  <ShieldAlert className="h-4 w-4 text-cyan-300" /> Policy Active
                </p>
              </div>
            </div>
          </motion.aside>
        </AnimatePresence>
      </div>
    </section>
  );
}
