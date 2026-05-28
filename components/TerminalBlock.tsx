import { Card } from './Card';

type TerminalBlockProps = {
  lines: string[];
};

export function TerminalBlock({ lines }: TerminalBlockProps) {
  return (
    <Card className="font-mono text-xs sm:text-sm" aria-label="Terminal output">
      <div className="mb-3 flex items-center gap-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="space-y-1 text-muted">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Card>
  );
}
