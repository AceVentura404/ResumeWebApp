'use client';

import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend
} from 'recharts';

type DashboardChartDatum = {
  day: string;
  deployments: number;
  incidents: number;
};

type DashboardChartProps = {
  data: readonly DashboardChartDatum[];
};

export function DashboardChart({ data }: DashboardChartProps) {
  const mutableData = [...data];

  return (
    <div className="h-64 w-full" aria-label="Deployments and incidents chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mutableData} margin={{ top: 12, right: 10, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="rgba(170, 180, 197, 0.12)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#AAB4C5', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#AAB4C5', fontSize: 12 }} axisLine={false} tickLine={false} width={34} />
          <Tooltip
            contentStyle={{
              background: '#0B1320',
              border: '1px solid #1F2C42',
              borderRadius: 10,
              color: '#E9EDF4'
            }}
          />
          <Legend wrapperStyle={{ color: '#AAB4C5', fontSize: 12 }} />
          <Line type="monotone" dataKey="deployments" stroke="#22D3EE" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="incidents" stroke="#34D399" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
