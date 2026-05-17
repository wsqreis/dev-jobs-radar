# Architecture

Dev Jobs Radar is organized as a single Next.js application with a shared TypeScript domain layer reused by both the web UI and the CLI.

## Request flow

1. The user triggers a search from the web form or the CLI.
2. The request is normalized by `resolveJobSearchRequest`.
3. `searchJobs` decides whether to use demo or live mode.
4. In live mode, the search adapter sends a `google_jobs` request through the configured SDK.
5. Raw results are normalized into a stable internal shape.
6. Insights and copyable examples are generated from the normalized response.
7. The web UI and the CLI render the same data model.

## Main modules

### `src/lib/jobs/presets.ts`

Defines the default search presets and converts URL/CLI input into a typed request object.

### `src/lib/jobs/searchJobs.ts`

Acts as the shared orchestration layer for the app. It decides the runtime mode, fetches the data source, normalizes results, computes insights, and prepares examples for documentation.

### `src/lib/serpapi/googleJobs.ts`

Builds the `google_jobs` request and keeps SDK details out of the page and CLI layers.

### `src/app/api/jobs/route.ts`

Exposes the normalized result through a local API route so the repo can demonstrate both server-rendered UI and API usage.

### `scripts/dev-jobs-radar.ts`

Provides a terminal interface that reuses the same search logic as the UI.

## Demo mode vs live mode

### Demo mode

- uses `src/tests/fixtures/google-jobs-sample.json`
- works without credentials
- ideal for screenshots, quick reviews, and local onboarding

### Live mode

- requires `SERPAPI_API_KEY`
- calls the `google_jobs` engine
- useful when validating the real integration and producing updated examples

## Why this shape works well in practice

- keeps secrets server-side in the web app
- avoids duplicate data-mapping logic between interfaces
- makes the project easier to test and extend
- gives anyone a working demo path even without API access
- keeps the technical documentation close to the product behavior
