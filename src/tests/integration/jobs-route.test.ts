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
      createRequest("http://localhost:3000/api/jobs?mode=demo&preset=backend-br"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.meta.resolvedMode).toBe("demo");
    expect(body.jobs).toHaveLength(3);
  });

  it("returns an error when live mode is requested without a key", async () => {
    const response = await GET(
      createRequest("http://localhost:3000/api/jobs?mode=live"),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("SERPAPI_API_KEY");
  });
});
