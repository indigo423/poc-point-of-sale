# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # start dev server (localhost:3000)
pnpm build     # production build
pnpm lint      # run ESLint
```

No test framework is configured.

## Architecture

This is a **Next.js App Router** product configurator for "Meridian", a network monitoring platform.

### Layout

`app/page.tsx` renders a two-panel layout:
- **Left panel** — `ProductConfigurator`: four selectable products (Core, Minion, Sentinel, Software Support) rendered as `ProductCard` components.
- **Right panel** — switches between `ArchitectureDiagram` and `QuoteForm` based on `viewMode` state.

A `StickyBottomBar` and `HorizonBanner` sit outside the panels.

### State (`lib/configurator-store.ts`)

Zustand store with product selection and UI state. Key business rules encoded here:
- `minionSelected` and `sentinelSelected` can only be true when `coreSelected` is true. Deselecting Core auto-deselects both.
- `supportSelected` requires at least one subscription component. Support price varies by selection ($12k Core only, $10k Minion only, $16k Sentinel-inclusive combos).
- `viewMode: "configurator" | "review"` controls the right panel.

### UI

- **shadcn/ui** (new-york style) with Radix UI primitives — add components via `pnpm dlx shadcn@latest add <component>`.
- `cn()` from `lib/utils.ts` for merging Tailwind classes.
- Path alias `@/*` maps to the project root.

### Notable config

- `next.config.mjs` sets `ignoreBuildErrors: true` — TypeScript errors do not fail production builds.
- Package manager is **pnpm** (pnpm-lock.yaml is the source of truth).
