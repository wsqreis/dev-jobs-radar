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
    return {
      resolvedMode: "demo" as const,
    };
  }

  if (requestedMode === "live") {
    if (!apiKey) {
      return {
        resolvedMode: "demo" as const,
        warning: "Live mode requested without SERPAPI_API_KEY. Falling back to demo mode.",
      };
    }

    return {
      resolvedMode: "live" as const,
    };
  }

  if (apiKey && !isDemoModeEnabled()) {
    return {
      resolvedMode: "live" as const,
    };
  }

  return {
    resolvedMode: "demo" as const,
  };
}
