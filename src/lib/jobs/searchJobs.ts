import fixtureData from "@/tests/fixtures/google-jobs-sample.json";
import { resolveRuntimeMode } from "@/lib/env";
import { extractInsights } from "@/lib/jobs/extractInsights";
import { normalizeJobResults } from "@/lib/jobs/normalizeJob";
import type {
  JobSearchRequest,
  JobsSearchResponse,
} from "@/lib/jobs/types";
import { searchGoogleJobs } from "@/lib/serpapi/googleJobs";

function getRawSummary(rawResponse: Record<string, unknown>) {
  return {
    searchMetadata:
      rawResponse.search_metadata && typeof rawResponse.search_metadata === "object"
        ? (rawResponse.search_metadata as Record<string, unknown>)
        : undefined,
    searchParameters:
      rawResponse.search_parameters && typeof rawResponse.search_parameters === "object"
        ? (rawResponse.search_parameters as Record<string, unknown>)
        : undefined,
  };
}

export async function searchJobs(
  request: JobSearchRequest,
): Promise<JobsSearchResponse> {
  const resolvedMode = resolveRuntimeMode(request.mode);
  const rawResponse =
    resolvedMode === "demo"
      ? (fixtureData as Record<string, unknown>)
      : ((await searchGoogleJobs(request)) as Record<string, unknown>);

  const jobs = normalizeJobResults(rawResponse);

  return {
    request,
    meta: {
      requestedMode: request.mode,
      resolvedMode,
      source: resolvedMode === "demo" ? "fixture" : "serpapi",
      totalJobs: jobs.length,
      searchId:
        typeof rawResponse.search_metadata === "object" && rawResponse.search_metadata
          ? String((rawResponse.search_metadata as Record<string, unknown>).id ?? "") || undefined
          : undefined,
    },
    jobs,
    insights: extractInsights(jobs),
    raw: getRawSummary(rawResponse),
  };
}
