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
    request.datePosted ? `q: ${quote(`${request.query} ${request.datePosted === "24h" ? "since yesterday" : request.datePosted === "3d" ? "in the last 3 days" : "in the last week"}`)}` : undefined,
    !request.datePosted ? `num: ${request.pageSize}` : `num: ${request.pageSize}`,
    request.pageToken ? `next_page_token: ${quote(request.pageToken)}` : undefined,
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
    request.datePosted ? `--datePosted ${request.datePosted}` : undefined,
    `--pageSize ${request.pageSize}`,
    `--page ${request.page}`,
  ].filter(Boolean) as string[];

  if (request.preset) {
    parts.push(`--preset ${request.preset}`);
  }

  if (request.pageToken) {
    parts.push(`--pageToken ${quote(request.pageToken)}`);
  }

  return parts.join(" ");
}
