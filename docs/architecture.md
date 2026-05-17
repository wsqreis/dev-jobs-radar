# Architecture

Dev Jobs Radar is structured as a single Next.js application with a shared TypeScript domain layer that will be reused by both the web UI and the CLI.

## Planned flow

1. The web app or CLI builds a search request.
2. A shared SerpApi adapter sends the request to Google Jobs.
3. Raw results are normalized into a stable internal shape.
4. The UI renders job cards and insight summaries.
5. Demo mode can serve fixture data when no API key is available.

## Why this shape

- Keeps the SerpApi key on the server side for the web app.
- Lets the CLI reuse the same normalization rules.
- Makes the repo easier to explain in a tutorial-style article.
- Supports a public demo experience without requiring secrets.
