import { NextResponse, type NextRequest } from "next/server";
import fixtureData from "@/tests/fixtures/google-jobs-sample.json";
import { resolveRuntimeMode } from "@/lib/env";
import { extractInsights } from "@/lib/jobs/extractInsights";
import { normalizeJobResults } from "@/lib/jobs/normalizeJob";
import { resolveJobSearchRequest } from "@/lib/jobs/presets";
import type { JobsSearchResponse } from "@/lib/jobs/types";
import { searchGoogleJobs } from "@/lib/serpapi/googleJobs";

export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest) {
  const resolvedRequest = resolveJobSearchRequest(request.nextUrl.searchParams);

  try {
    const resolvedMode = resolveRuntimeMode(resolvedRequest.mode);
    const rawResponse =
      resolvedMode === "demo"
        ? (fixtureData as Record<string, unknown>)
        : ((await searchGoogleJobs(resolvedRequest)) as Record<string, unknown>);

    const jobs = normalizeJobResults(rawResponse);
    const response: JobsSearchResponse = {
      request: resolvedRequest,
      meta: {
        requestedMode: resolvedRequest.mode,
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

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: resolvedRequest.mode === "live" ? 400 : 500,
      },
    );
  }
}
