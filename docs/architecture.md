# Architecture

Dev Jobs Radar is organized as a single Next.js application with a shared TypeScript search layer reused by the web UI, the local API route, and the CLI.

## Request flow

1. The user changes filters from the web UI or the CLI.
2. URL or CLI arguments are normalized by `resolveJobSearchRequest`.
3. `searchJobs` decides whether the request will run in demo mode or live mode.
4. In live mode, the provider adapter builds a Google Jobs request and sends it through the configured SDK.
5. Raw results are normalized into a stable internal job shape.
6. The app computes insights, page metadata, and ready-to-use examples.
7. The web UI, CLI, and `/api/jobs` route expose the same normalized result shape.

## Main modules

### `src/lib/jobs/presets.ts`

Defines the preset catalog and normalizes URL or CLI input into a `JobSearchRequest`.

Current request state includes:

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

### `src/lib/jobs/searchJobs.ts`

Acts as the shared orchestration layer.

It is responsible for:

- runtime mode selection
- demo/live fallback behavior
- fixture or provider fetch selection
- normalized job output
- insight calculation
- pagination metadata
- example generation for SDK and CLI usage

### `src/lib/serpapi/googleJobs.ts`

Builds the provider request for Google Jobs.

Important behavior:

- maps `datePosted` to the current query-building strategy used by the app
- passes `pageSize` as the requested result count
- passes `pageToken` when navigating live pages

### `src/app/api/jobs/route.ts`

Exposes the normalized result through a local API route that mirrors the same request parsing and search layer used by the UI.

### `scripts/dev-jobs-radar.ts`

Provides a CLI that reuses the same request resolution and search execution path as the app.

## Demo mode vs live mode

### Demo mode

- uses `src/tests/fixtures/google-jobs-sample.json`
- works without credentials
- paginates locally from fixture data
- is ideal for screenshots, onboarding, and deterministic local tests

### Live mode

- requires `SERPAPI_API_KEY`
- uses the live Google Jobs integration
- reads provider pagination via `next_page_token`
- if live mode cannot be fulfilled, the app falls back to demo mode with a warning instead of crashing the page

## Pagination model

The app uses provider-aware pagination.

### Demo mode

- pagination is simulated locally
- `page` and `pageSize` determine the slice rendered from the fixture

### Live mode

- pagination is token-based
- the app tracks:
  - `page`
  - `pageToken`
  - `pageTokenTrail`
- `Próxima` uses the `next_page_token` returned by the provider
- `Anterior` uses the stored token trail to reconstruct previous navigation

## UI behavior

### Search form

`src/components/filters/SearchForm.tsx` is the main interaction surface.

It currently supports:

- free-text query
- location
- `gl`
- `hl`
- mode selection
- page-size selection
- native date filters (`24h`, `3d`, `7d`)
- preset navigation
- app-specific pending feedback during search and preset transitions

### Results list

`src/components/jobs/JobsList.tsx` renders normalized job cards and pager controls.

It currently provides:

- page-level result count
- previous/next navigation
- app-specific loading feedback during page transitions

### Technical inspector

`src/components/developer-inspector/DeveloperInspector.tsx` exposes:

- normalized request
- raw response summary
- SDK example
- CLI example

## Verification commands

The current verification commands are:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

CLI verification example:

```bash
npm run cli -- --mode demo --preset backend-br
```
