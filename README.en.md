# Dev Jobs Radar

Dev Jobs Radar is an open-source project built to show how SerpApi can power a useful job discovery experience for Brazilian and Portuguese-speaking developers.

## What this project demonstrates

- practical integration with SerpApi's Google Jobs API using the official JavaScript SDK
- a Next.js + TypeScript web interface
- a CLI that reuses the same search and normalization layer
- a demo mode for reviewers who want to run the project without credentials
- bilingual documentation designed for GitHub, portfolio review, and a technical article

## Why this use case works

Tracking relevant developer jobs is still a real problem in Brazil. There is too much noise, too much manual searching, and not enough transparency around turning raw search results into a usable product. This project takes that everyday problem and turns it into a technical demo with clear DevRel value.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- SerpApi JavaScript SDK
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
- a Developer Inspector panel showing the request, raw summary, and ready-to-use examples

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

### Example with the SerpApi SDK

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

Building a Developer Job Radar for Brazil with SerpApi and Next.js

**Recommended angle:**

Present the project as a Developer Advocacy artifact: a clean SerpApi integration applied to a real problem in the Brazilian developer community, with enough technical transparency that other developers can reproduce and adapt the idea.
