# Dev Jobs Radar

Dev Jobs Radar is an open-source search app for tracking tech jobs relevant to developers in Brazil, Portugal, and remote-first teams.

- PT-BR guide: [README.pt-BR.md](README.pt-BR.md)
- English guide: [README.en.md](README.en.md)
- Architecture notes: [docs/architecture.md](docs/architecture.md)

## What the product does today

- searches Google Jobs through a shared server-side search layer
- supports both demo mode and live mode
- falls back to demo mode with a visible warning when live mode cannot be fulfilled
- includes presets for Brazil, Portugal, backend, frontend, and data/AI searches
- supports native date filters for:
  - last 24 hours
  - last 3 days
  - last week
- supports page-size selection and token-aware next/previous pagination
- exposes the same normalized response through the UI, local API route, and CLI
- includes a technical inspector showing the normalized request, raw summary, and ready-to-use examples
- shows app-specific loading states during search and pagination instead of relying on a generic route-level loading screen

## Presets

Current preset IDs and labels:

- `backend-br` — Backend remoto Brasil
- `data-ai-br` — Dados e IA Brasil
- `frontend-remote` — Frontend remoto
- `portugal-remote` — Portugal remoto

Selecting a preset updates the query, location, `gl`, and `hl` values in the URL-driven search state.

## Search and filtering behavior

The app resolves all search state from URL parameters through a shared request parser.

Supported request state today:

- `preset`
- `q`
- `location`
- `gl`
- `hl`
- `mode`
- `datePosted`
- `pageSize`
- `page`
- `pageToken`
- `pageTokenTrail`

Supported date filters:

- `24h`
- `3d`
- `7d`

## Pagination behavior

Pagination is provider-aware:

- demo mode paginates locally from the fixture data
- live mode uses the provider pagination token returned by Google Jobs
- the app stores pagination state in the URL using:
  - `page`
  - `pageToken`
  - `pageTokenTrail`

The UI currently exposes:

- a page-size selector
- `Anterior`
- `Próxima`

## Demo mode vs live mode

### Demo mode

- works without credentials
- uses the checked-in fixture in `src/tests/fixtures/google-jobs-sample.json`
- is the safest way to explore the app structure and UI behavior locally

### Live mode

- requires `SERPAPI_API_KEY`
- uses the live Google Jobs integration
- if live mode is requested without a valid key, the app falls back to demo mode and shows a warning instead of crashing

## CLI and local API

The repo includes a CLI that reuses the same request parsing and search logic as the web app.

CLI command:

```bash
npm run cli -- --mode demo --preset backend-br
```

Example local API request:

```bash
curl "http://localhost:3000/api/jobs?mode=demo&preset=backend-br&pageSize=5&page=1&datePosted=24h"
```

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local`.

```bash
SERPAPI_API_KEY=
SERPAPI_DEMO_MODE=true
```

Notes:

- `SERPAPI_DEMO_MODE=true` keeps demo mode as the default local path.
- To validate live searches, set `SERPAPI_API_KEY` and use `mode=live`.

### 3. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Quick CLI check:

```bash
npm run cli -- --mode demo --preset backend-br
```

## Docs in this repo

- [README.pt-BR.md](README.pt-BR.md)
- [README.en.md](README.en.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/walkthrough-pt-br.md](docs/walkthrough-pt-br.md)
- [docs/blog-post-outline.md](docs/blog-post-outline.md)
