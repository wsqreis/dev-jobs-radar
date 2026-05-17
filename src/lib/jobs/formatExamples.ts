import type { JobSearchRequest } from "@/lib/jobs/types";

function quote(value: string) {
  return JSON.stringify(value);
}

export function buildSdkExample(request: JobSearchRequest) {
  const params = [
    'engine: "google_jobs"',
    `q: ${quote(request.query)}`,
    `location: ${quote(request.location)}`,
    `gl: ${quote(request.gl)}`,
    `hl: ${quote(request.hl)}`,
    request.chips ? `chips: ${quote(request.chips)}` : undefined,
    `num: ${request.num}`,
  ].filter(Boolean);

  return [
    'import { getJson } from "serpapi";',
    '',
    'const jobs = await getJson({',
    '  api_key: process.env.SERPAPI_API_KEY,',
    ...params.map((line) => `  ${line},`),
    '});',
  ].join("\n");
}

export function buildCliExample(request: JobSearchRequest) {
  const parts = [
    'npm run cli --',
    `--query ${quote(request.query)}`,
    `--location ${quote(request.location)}`,
    `--gl ${quote(request.gl)}`,
    `--hl ${quote(request.hl)}`,
    `--mode ${request.mode}`,
    `--num ${request.num}`,
  ];

  if (request.preset) {
    parts.push(`--preset ${request.preset}`);
  }

  return parts.join(" ");
}
