import { describe, expect, it } from "vitest";

describe("bootstrap smoke test", () => {
  it("keeps the project name stable", () => {
    expect("Dev Jobs Radar").toBe("Dev Jobs Radar");
  });
});
