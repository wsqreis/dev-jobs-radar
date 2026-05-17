import { describe, expect, it } from "vitest";
import fixtureData from "@/tests/fixtures/google-jobs-sample.json";
import { extractInsights } from "@/lib/jobs/extractInsights";
import { normalizeJobResults } from "@/lib/jobs/normalizeJob";

describe("normalizeJobResults", () => {
  it("normalizes fixture jobs into the internal shape", () => {
    const jobs = normalizeJobResults(fixtureData as Record<string, unknown>);

    expect(jobs).toHaveLength(3);
    expect(jobs[0]).toMatchObject({
      title: "Desenvolvedor Backend Pleno",
      companyName: "Tech Brasil",
      location: "São Paulo, SP",
      scheduleType: "Tempo integral",
    });
    expect(jobs[0].applyOptions[0]?.url).toContain("/apply");
  });

  it("builds insight groups from normalized jobs", () => {
    const jobs = normalizeJobResults(fixtureData as Record<string, unknown>);
    const insights = extractInsights(jobs);

    expect(insights.topCompanies[0]).toMatchObject({
      name: "Dados em Foco",
      count: 1,
    });
    expect(insights.topLocations).toHaveLength(3);
  });
});
