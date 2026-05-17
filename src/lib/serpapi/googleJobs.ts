import { getSerpApiKey } from "@/lib/env";
import type { DatePostedFilter, JobSearchRequest } from "@/lib/jobs/types";
import { runSerpApiSearch } from "@/lib/serpapi/client";

function buildDatePostedSuffix(datePosted?: DatePostedFilter) {
  if (datePosted === "24h") {
    return "since yesterday";
  }

  if (datePosted === "3d") {
    return "in the last 3 days";
  }

  if (datePosted === "7d") {
    return "in the last week";
  }

  return undefined;
}

export function buildGoogleJobsQuery(request: JobSearchRequest) {
  const datePostedSuffix = buildDatePostedSuffix(request.datePosted);
  return datePostedSuffix ? `${request.query} ${datePostedSuffix}` : request.query;
}

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
    q: buildGoogleJobsQuery(request),
    location: request.location,
    gl: request.gl,
    hl: request.hl,
    chips: request.chips,
    num: request.pageSize,
    next_page_token: request.pageToken,
  };
}

export async function searchGoogleJobs(request: JobSearchRequest) {
  return runSerpApiSearch(buildGoogleJobsParams(request));
}
