import type { SearchMode } from "@/lib/jobs/types";

export function getSerpApiKey() {
  const value = process.env.SERPAPI_API_KEY?.trim();
  return value ? value : undefined;
}

export function isDemoModeEnabled() {
  return process.env.SERPAPI_DEMO_MODE !== "false";
}

export function resolveRuntimeMode(
  requestedMode: SearchMode,
  apiKey = getSerpApiKey(),
) {
  if (requestedMode === "demo") {
    return "demo" as const;
  }

  if (requestedMode === "live") {
    if (!apiKey) {
      throw new Error("Live mode requires SERPAPI_API_KEY.");
    }

    return "live" as const;
  }

  if (apiKey && !isDemoModeEnabled()) {
    return "live" as const;
  }

  return "demo" as const;
}
