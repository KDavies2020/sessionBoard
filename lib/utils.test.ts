import { describe, it, expect } from "vitest";
import { formatTime } from "./utils";

describe("formatTime", () => {
  it("formats minutes under 60", () => {
    expect(formatTime(30)).toBe("30min");
    expect(formatTime(45)).toBe("45min");
  });

  it("formats exactly 60 minutes as 1 hour", () => {
    expect(formatTime(60)).toBe("1h");
  });

  it("formats time with hours and minutes", () => {
    expect(formatTime(90)).toBe("1h 30min");
    expect(formatTime(125)).toBe("2h 5min");
  });

  it("formats time with whole hours", () => {
    expect(formatTime(120)).toBe("2h");
    expect(formatTime(180)).toBe("3h");
  });
});
