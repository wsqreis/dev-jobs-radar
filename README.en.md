# Dev Jobs Radar

Dev Jobs Radar is an open-source app for tracking tech jobs relevant to developers in Brazil, Portugal, and remote-first teams.

## What this project delivers

- Google Jobs integration through a JavaScript SDK
- a Next.js + TypeScript web interface
- a CLI that reuses the same search and normalization layer
- a demo mode for people who want to run the project without credentials
- bilingual documentation designed for GitHub and a technical article

## Why this use case works

Job searching is still noisy for many developers in Brazil. Repeated searches, inconsistent filters, and too many tabs make it hard to compare patterns across roles, locations, and work formats. This project turns that manual process into something easier to inspect, reuse, and share.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- JavaScript SDK for structured search data
- Vitest
- Playwright
- tsx for the CLI

## Current features

- PT-BR dashboard with Brazil and Portugal presets
- URL-based filters for shareable searches
- normalized job cards
- demo mode backed by a local fixture
- `/api/jobs` route returning the same shape used by the UI
- terminal-friendly CLI output
- technical inspector panel showing the request, raw summary, and ready-to-use examples

## Getting started

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

- When `SERPAPI_DEMO_MODE=true`, the app uses local fixture data by default.
- To test the live API, provide `SERPAPI_API_KEY` and use `mode=live` in the UI or `--mode live` in the CLI.

### 3. Run the web app

```bash
npm run dev
```

Open `http://localhost:3000`.

### 4. Run the CLI

```bash
npm run cli -- --mode demo --preset backend-br
```

Custom query example:

```bash
npm run cli -- --mode demo --query "data engineer remote" --location Brazil --gl br --hl pt-br
```

## Usage examples

### Query the local project API

```bash
curl "http://localhost:3000/api/jobs?mode=demo&preset=backend-br"
```

### Example with the SDK used in this project

```ts
import { getJson } from "serpapi";

const jobs = await getJson({
  api_key: process.env.SERPAPI_API_KEY,
  engine: "google_jobs",
  q: "desenvolvedor backend remoto",
  location: "Brazil",
  gl: "br",
  hl: "pt-br",
  num: 10,
});
```

## Project structure

```text
src/app                     Next.js application
src/app/api/jobs            local API route
src/components              interface components
src/lib/jobs                types, presets, normalization, and insights
src/lib/serpapi             SDK integration
scripts/dev-jobs-radar.ts   project CLI
src/tests                   unit and integration tests
docs                        architecture and editorial material
```

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Quick CLI check:

```bash
npm run cli -- --mode demo --preset backend-br
```

## Suggested companion article

**Recommended title:**

What a Job Radar Reveals About Backend, Data, and AI Roles in Brazil

**Recommended angle:**

Use the radar as a reporting tool to discuss hiring signals, recurring terms, locations, and work formats. The product supports the analysis instead of acting as the main promotional angle.
