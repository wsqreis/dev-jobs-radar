import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/jobs/route";

function createRequest(url: string) {
  return {
    nextUrl: new URL(url),
  } as never;
}

describe("GET /api/jobs", () => {
  it("returns normalized demo jobs", async () => {
    const response = await GET(
      createRequest("http://localhost:3000/api/jobs?mode=demo&preset=backend-br&pageSize=2&page=1&datePosted=24h"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.meta.resolvedMode).toBe("demo");
    expect(body.meta.pageSize).toBe(2);
    expect(body.meta.pageIndex).toBe(1);
    expect(body.request.datePosted).toBe("24h");
    expect(body.jobs).toHaveLength(2);
    expect(body.meta.hasNextPage).toBe(true);
  });

  it("falls back to demo mode when live mode is requested without a key", async () => {
    const response = await GET(
      createRequest("http://localhost:3000/api/jobs?mode=live&pageSize=2&page=2"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.meta.requestedMode).toBe("live");
    expect(body.meta.resolvedMode).toBe("demo");
    expect(body.meta.warning).toContain("SERPAPI_API_KEY");
    expect(body.meta.pageIndex).toBe(2);
    expect(body.jobs).toHaveLength(1);
  });
});
