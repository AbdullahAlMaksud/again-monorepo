import { describe, expect, it } from "vitest";
import { addInterval, getTaskStatus, getDueText } from "@/features/again/lib/date-utils";

describe("addInterval", () => {
  it("adds calendar days and weeks", () => {
    expect(addInterval("2026-10-27", 3, "days")).toBe("2026-10-30");
    expect(addInterval("2026-10-27", 2, "weeks")).toBe("2026-11-10");
  });

  it("clamps month additions to the final day of the target month", () => {
    expect(addInterval("2026-01-31", 1, "months")).toBe("2026-02-28");
    expect(addInterval("2024-01-31", 1, "months")).toBe("2024-02-29");
  });

  it("handles leap-day year additions", () => {
    expect(addInterval("2024-02-29", 1, "years")).toBe("2025-02-28");
  });

  it("classifies tasks by their due date", () => {
    expect(getTaskStatus({ nextDueAt: "2026-10-26" }, "2026-10-27")).toBe("overdue");
    expect(getTaskStatus({ nextDueAt: "2026-10-27" }, "2026-10-27")).toBe("today");
    expect(getTaskStatus({ nextDueAt: "2026-10-28" }, "2026-10-27")).toBe("upcoming");
  });

  it("uses readable labels for overdue items", () => {
    expect(getDueText({ nextDueAt: "2026-10-26" }, "2026-10-27")).toBe("1 day overdue");
    expect(getDueText({ nextDueAt: "2026-10-24" }, "2026-10-27")).toBe("3 days overdue");
  });
});
