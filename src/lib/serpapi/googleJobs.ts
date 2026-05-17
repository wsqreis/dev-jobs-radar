import { getSerpApiKey } from "@/lib/env";
import type { JobSearchRequest } from "@/lib/jobs/types";
import { runSerpApiSearch } from "@/lib/serpapi/client";

export function buildGoogleJobsParams(
  request: JobSearchRequest,
  apiKey = getSerpApiKey(),
) {
  if (!apiKey) {
    throw new Error("SERPAPI_API_KEY is not configured.");
  }

  return {
    engine: "google_jobs",
    api_key: apiKey,
    q: request.query,
    location: request.location,
    gl: request.gl,
    hl: request.hl,
    chips: request.chips,
    num: request.num,
  };
}

export async function searchGoogleJobs(request: JobSearchRequest) {
  return runSerpApiSearch(buildGoogleJobsParams(request));
}
