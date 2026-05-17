import { NextResponse, type NextRequest } from "next/server";
import { resolveJobSearchRequest } from "@/lib/jobs/presets";
import { searchJobs } from "@/lib/jobs/searchJobs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const resolvedRequest = resolveJobSearchRequest(request.nextUrl.searchParams);

  try {
    const response = await searchJobs(resolvedRequest);

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
