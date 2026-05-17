import {
  type JobSearchPreset,
  type JobSearchPresetId,
  type JobSearchRequest,
  type SearchMode,
} from "@/lib/jobs/types";

export const DEFAULT_PRESET_ID: JobSearchPresetId = "backend-br";

export const jobSearchPresets: JobSearchPreset[] = [
  {
    id: "backend-br",
    label: "Backend remoto Brasil",
    query: "desenvolvedor backend remoto",
    location: "Brazil",
    gl: "br",
    hl: "pt-br",
  },
  {
    id: "data-ai-br",
    label: "Dados e IA Brasil",
    query: "engenheiro de dados OR ai engineer",
    location: "Brazil",
    gl: "br",
    hl: "pt-br",
  },
  {
    id: "frontend-remote",
    label: "Frontend remoto",
    query: "desenvolvedor frontend remoto",
    location: "Brazil",
    gl: "br",
    hl: "pt-br",
  },
  {
    id: "portugal-remote",
    label: "Portugal remoto",
    query: "software engineer remoto",
    location: "Portugal",
    gl: "pt",
    hl: "pt-pt",
  },
];

export function getPresetById(
  presetId?: string | null,
): JobSearchPreset | undefined {
  return jobSearchPresets.find((preset) => preset.id === presetId);
}

function getSearchMode(mode?: string | null): SearchMode {
  if (mode === "demo" || mode === "live") {
    return mode;
  }

  return "auto";
}

function getPositiveInt(value?: string | null): number | undefined {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return undefined;
  }

  return parsed;
}

export function resolveJobSearchRequest(
  searchParams: URLSearchParams,
): JobSearchRequest {
  const preset = getPresetById(searchParams.get("preset")) ??
    getPresetById(DEFAULT_PRESET_ID);

  if (!preset) {
    throw new Error("Default preset is not configured.");
  }

  return {
    query: searchParams.get("q")?.trim() || preset.query,
    location: searchParams.get("location")?.trim() || preset.location,
    gl: searchParams.get("gl")?.trim() || preset.gl,
    hl: searchParams.get("hl")?.trim() || preset.hl,
    chips: searchParams.get("chips")?.trim() || preset.chips,
    num: Math.min(getPositiveInt(searchParams.get("num")) ?? 10, 20),
    preset: preset.id,
    mode: getSearchMode(searchParams.get("mode")),
  };
}
