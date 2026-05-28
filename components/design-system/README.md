# DevOps Command Center Design System

Foundation primitives for a technical, calm, production-ready portfolio UI.

## Structure

- `Container` layout wrapper with max-width options
- `Section` semantic section wrapper with subtle reveal motion
- `SectionHeader` title + description + actions pattern
- `Card` elevated surface container
- `Button` primary/secondary/ghost/danger actions
- `IconButton` compact icon action
- `Badge` semantic status labels (`healthy`, `warning`, `critical`, `info`, `neutral`)
- `MetricCard` animated metric display
- `TerminalPanel` technical log panel
- `index.ts` barrel exports

## Usage

```tsx
import {
  Section,
  SectionHeader,
  Card,
  Button,
  Badge,
  MetricCard,
  TerminalPanel,
  Container,
  IconButton
} from '@/components/design-system';
```

## Theme Tokens

Global tokens are defined in `app/globals.css` and mapped in `tailwind.config.ts`:

- `--color-bg`
- `--color-panel`
- `--color-panel-alt`
- `--color-border`
- `--color-text`
- `--color-muted`
- `--color-accent`
- `--color-healthy`
- `--color-warning`
- `--color-critical`

Use Tailwind aliases (`bg-bg`, `text-muted`, `border-border`, `text-healthy`, etc.) for consistency.
