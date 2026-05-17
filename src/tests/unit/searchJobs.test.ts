import { describe, expect, it } from "vitest";
import { searchJobs } from "@/lib/jobs/searchJobs";

describe("searchJobs", () => {
  it("returns demo results and generated examples", async () => {
    const response = await searchJobs({
      query: "desenvolvedor backend remoto",
      location: "Brazil",
      gl: "br",
      hl: "pt-br",
      datePosted: "24h",
      pageSize: 10,
      page: 1,
      pageTokenTrail: [],
      preset: "backend-br",
      mode: "demo",
    });

    expect(response.meta.resolvedMode).toBe("demo");
    expect(response.meta.pageIndex).toBe(1);
    expect(response.meta.pageSize).toBe(10);
    expect(response.jobs).toHaveLength(3);
    expect(response.examples.sdk).toContain('engine: "google_jobs"');
    expect(response.examples.sdk).toContain("since yesterday");
    expect(response.examples.cli).toContain("--datePosted 24h");
    expect(response.examples.cli).toContain("--pageSize 10");
  });

  it("falls back to demo mode when live mode is requested without a key", async () => {
    const response = await searchJobs({
      query: "desenvolvedor backend remoto",
      location: "Brazil",
      gl: "br",
      hl: "pt-br",
      datePosted: "7d",
      pageSize: 10,
      page: 1,
      pageTokenTrail: [],
      preset: "backend-br",
      mode: "live",
    });

    expect(response.meta.requestedMode).toBe("live");
    expect(response.meta.resolvedMode).toBe("demo");
    expect(response.meta.warning).toContain("SERPAPI_API_KEY");
    expect(response.jobs).toHaveLength(3);
  });
});
