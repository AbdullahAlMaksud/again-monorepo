import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, getAppTheme, isAppTheme, THEME_OPTIONS } from "@/features/again/types/theme";

describe("theme configuration", () => {
  it("provides five unique themes", () => {
    expect(THEME_OPTIONS).toHaveLength(5);
    expect(new Set(THEME_OPTIONS.map((theme) => theme.id)).size).toBe(5);
  });

  it("accepts supported theme ids", () => {
    expect(isAppTheme("light")).toBe(true);
    expect(isAppTheme("forest")).toBe(true);
    expect(isAppTheme("ocean")).toBe(true);
    expect(isAppTheme("dune")).toBe(true);
    expect(isAppTheme("violet")).toBe(false);
  });

  it("falls back to the default theme and keeps the legacy dark preference", () => {
    expect(getAppTheme(null)).toBe(DEFAULT_THEME);
    expect(getAppTheme("unknown-theme")).toBe(DEFAULT_THEME);
    expect(getAppTheme("dark")).toBe("dark");
  });
});
