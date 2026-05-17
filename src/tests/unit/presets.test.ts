import { describe, expect, it } from "vitest";
import {
  DEFAULT_PRESET_ID,
  getPresetById,
  resolveJobSearchRequest,
} from "@/lib/jobs/presets";

describe("resolveJobSearchRequest", () => {
  it("falls back to the default preset", () => {
    const request = resolveJobSearchRequest(new URLSearchParams());

    expect(request.preset).toBe(DEFAULT_PRESET_ID);
    expect(request.query).toBe("desenvolvedor backend remoto");
    expect(request.mode).toBe("auto");
  });

  it("applies URL overrides over preset values", () => {
    const preset = getPresetById("portugal-remote");
    if (!preset) {
      throw new Error("Expected preset to exist.");
    }

    const request = resolveJobSearchRequest(
      new URLSearchParams({
        preset: "portugal-remote",
        q: "typescript remoto",
        location: "Lisbon",
        gl: preset.gl,
        hl: preset.hl,
        mode: "demo",
        pageSize: "25",
        page: "2",
        pageToken: "token-2",
        pageTokenTrail: "token-1,token-2",
        datePosted: "7d",
      }),
    );

    expect(request.query).toBe("typescript remoto");
    expect(request.location).toBe("Lisbon");
    expect(request.mode).toBe("demo");
    expect(request.pageSize).toBe(10);
    expect(request.page).toBe(2);
    expect(request.pageToken).toBe("token-2");
    expect(request.pageTokenTrail).toEqual(["token-1", "token-2"]);
    expect(request.datePosted).toBe("7d");
  });

  it("uses the preset defaults when only preset-specific params are provided", () => {
    const request = resolveJobSearchRequest(
      new URLSearchParams({
        preset: "portugal-remote",
        mode: "demo",
        pageSize: "5",
        page: "1",
      }),
    );

    expect(request.query).toBe("software engineer remoto");
    expect(request.location).toBe("Portugal");
    expect(request.gl).toBe("pt");
    expect(request.hl).toBe("pt-pt");
    expect(request.pageSize).toBe(5);
  });
});
