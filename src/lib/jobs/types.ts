export type SearchMode = "auto" | "demo" | "live";
export type DatePostedFilter = "24h" | "3d" | "7d";

export type JobSearchPresetId =
  | "backend-br"
  | "data-ai-br"
  | "frontend-remote"
  | "portugal-remote";

export interface JobSearchPreset {
  id: JobSearchPresetId;
  label: string;
  query: string;
  location: string;
  gl: string;
  hl: string;
  chips?: string;
}

export interface JobSearchRequest {
  query: string;
  location: string;
  gl: string;
  hl: string;
  chips?: string;
  datePosted?: DatePostedFilter;
  pageSize: number;
  page: number;
  pageToken?: string;
  pageTokenTrail: string[];
  preset?: JobSearchPresetId;
  mode: SearchMode;
}

export interface JobLink {
  title: string;
  url: string;
}

export interface NormalizedJob {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  thumbnail?: string;
  via?: string;
  scheduleType?: string;
  postedAt?: string;
  detectedExtensions: string[];
  relatedLinks: JobLink[];
  applyOptions: JobLink[];
}

export interface JobsInsights {
  topCompanies: Array<{ name: string; count: number }>;
  topLocations: Array<{ name: string; count: number }>;
  topSchedules: Array<{ name: string; count: number }>;
}

export interface JobsResponseMeta {
  requestedMode: SearchMode;
  resolvedMode: Exclude<SearchMode, "auto">;
  source: "fixture" | "serpapi";
  totalJobs: number;
  searchId?: string;
  warning?: string;
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPageToken?: string;
}

export interface JobsSearchResponse {
  request: JobSearchRequest;
  meta: JobsResponseMeta;
  jobs: NormalizedJob[];
  insights: JobsInsights;
  raw: {
    searchMetadata?: Record<string, unknown>;
    searchParameters?: Record<string, unknown>;
    pagination?: Record<string, unknown>;
  };
  examples: {
    cli: string;
    sdk: string;
  };
}
