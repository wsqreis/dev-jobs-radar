import { describe, expect, it } from "vitest";
import { searchJobs } from "@/lib/jobs/searchJobs";

describe("searchJobs", () => {
  it("returns demo results and generated examples", async () => {
    const response = await searchJobs({
      query: "desenvolvedor backend remoto",
      location: "Brazil",
      gl: "br",
      hl: "pt-br",
      num: 10,
      preset: "backend-br",
      mode: "demo",
    });

    expect(response.meta.resolvedMode).toBe("demo");
    expect(response.jobs).toHaveLength(3);
    expect(response.examples.sdk).toContain('engine: "google_jobs"');
    expect(response.examples.cli).toContain("npm run cli --");
  });
});
