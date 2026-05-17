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
        num: "25",
      }),
    );

    expect(request.query).toBe("typescript remoto");
    expect(request.location).toBe("Lisbon");
    expect(request.mode).toBe("demo");
    expect(request.num).toBe(20);
  });
});
