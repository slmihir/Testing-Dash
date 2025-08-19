# PlayReport — Playwright Testing Dashboard

A lightweight dashboard to visualize Playwright test runs with a clean, minimal, human-crafted UI. It serves a React client and an Express API from a single server.

## Features

- Minimal, professional UI (Vercel/Cursor-inspired)
- Light/Dark theme toggle
- Summary cards (passed/failed/skipped/duration)
- Analytics: donut, performance bars, browser coverage
- Trend view with time range controls (7D/30D/90D)
- Powerful filtering (search, status, browser)
- Detailed test cards with steps, attachments, performance and error details
- Export current report as JSON (Download in header)
- Refresh data (floating Play button)

## Tech Stack

- Client: React 18, Vite, Tailwind CSS, shadcn/ui, Radix UI, lucide-react
- Data: TanStack Query
- Server: Express (Node)
- Shared types: TypeScript (`shared/schema.ts`)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node) or pnpm/yarn

### Install

```bash
npm install
```

### Run (Development)

```bash
# Default
npm run dev

# Or specify a port
PORT=5001 npm run dev
```

Open the app in your browser at `http://localhost:<PORT>`.

### Build (Production)

```bash
npm run build
npm start
```

The server will serve both the API and the built client. Configure the port via `PORT` env var.

## API Endpoints

- `GET /api/test-suite` — suite-level summary metrics
- `GET /api/test-results` — list of test results

Data is sourced from an in-memory store on server start (see `server/storage.ts`). Hook this up to your real data source as needed.

## UI Interactions

- Header search: filters tests by title/description
- Status and browser filters: narrow results
- Download button (header): exports `{ suite, results }` to `playwright-report.json`
- Floating Play button (bottom-right): refreshes data (invalidates queries)

## Troubleshooting

### ENOTSUP: operation not supported on socket 0.0.0.0:<port>

If you see an error like:

```
Error: listen ENOTSUP: operation not supported on socket 0.0.0.0:5000
```

- Ensure you’re on Node 18+ (LTS preferred)
- Try a different port: `PORT=5001 npm run dev`
- The server listen options are minimal and compatible (we avoid `reusePort`)

If the issue persists, check local firewall/VPN constraints.

## Project Structure

```
PlayReport/
  client/      # React app (Vite)
  server/      # Express server (serves API + client in dev/prod)
  shared/      # Shared schema/types
```

## Customization

- Tailwind tokens and Vercel-inspired grays are defined in `client/src/index.css` and `tailwind.config.ts`.
- UI components live in `client/src/components`. Page entry: `client/src/pages/playwright-report.tsx`.

## Deployment Notes

- Build with `npm run build`
- Start with `npm start` (Node ESM)
- Set `PORT` for your environment

## License

MIT


