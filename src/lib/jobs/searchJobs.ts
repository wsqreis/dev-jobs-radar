import fixtureData from "@/tests/fixtures/google-jobs-sample.json";
import { resolveRuntimeMode } from "@/lib/env";
import { extractInsights } from "@/lib/jobs/extractInsights";
import { buildCliExample, buildSdkExample } from "@/lib/jobs/formatExamples";
import { normalizeJobResults } from "@/lib/jobs/normalizeJob";
import type {
  JobSearchRequest,
  JobsSearchResponse,
} from "@/lib/jobs/types";
import { searchGoogleJobs } from "@/lib/serpapi/googleJobs";

function getNextPageToken(rawResponse: Record<string, unknown>) {
  const pagination = rawResponse.serpapi_pagination;

  if (!pagination || typeof pagination !== "object") {
    return undefined;
  }

  const nextPageToken = (pagination as Record<string, unknown>).next_page_token;
  return typeof nextPageToken === "string" && nextPageToken.trim()
    ? nextPageToken.trim()
    : undefined;
}

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
    pagination:
      rawResponse.serpapi_pagination && typeof rawResponse.serpapi_pagination === "object"
        ? (rawResponse.serpapi_pagination as Record<string, unknown>)
        : undefined,
  };
}

export async function searchJobs(
  request: JobSearchRequest,
): Promise<JobsSearchResponse> {
  const runtime = resolveRuntimeMode(request.mode);
  const rawResponse =
    runtime.resolvedMode === "demo"
      ? (fixtureData as Record<string, unknown>)
      : ((await searchGoogleJobs(request)) as Record<string, unknown>);

  const nextPageToken = getNextPageToken(rawResponse);
  const allJobs = normalizeJobResults(rawResponse);
  const startIndex = runtime.resolvedMode === "demo"
    ? (request.page - 1) * request.pageSize
    : 0;
  const jobs = runtime.resolvedMode === "demo"
    ? allJobs.slice(startIndex, startIndex + request.pageSize)
    : allJobs;
  const hasNextPage = runtime.resolvedMode === "demo"
    ? startIndex + request.pageSize < allJobs.length
    : Boolean(nextPageToken);

  return {
    request,
    meta: {
      requestedMode: request.mode,
      resolvedMode: runtime.resolvedMode,
      source: runtime.resolvedMode === "demo" ? "fixture" : "serpapi",
      totalJobs: jobs.length,
      searchId:
        typeof rawResponse.search_metadata === "object" && rawResponse.search_metadata
          ? String((rawResponse.search_metadata as Record<string, unknown>).id ?? "") || undefined
          : undefined,
      warning: runtime.warning,
      pageIndex: request.page,
      pageSize: request.pageSize,
      hasPreviousPage: request.page > 1,
      hasNextPage,
      nextPageToken,
    },
    jobs,
    insights: extractInsights(jobs),
    raw: getRawSummary(rawResponse),
    examples: {
      cli: buildCliExample(request),
      sdk: buildSdkExample(request),
    },
  };
}
