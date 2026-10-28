import { describe, expect, it } from "vitest";
import { createSeedTasks } from "@/features/again/lib/seed-tasks";
import { isDateKey, isAgainTask } from "@/features/again/lib/task-validation";

describe("task validation", () => {
  it("accepts a valid Again task", () => {
    expect(isAgainTask(createSeedTasks("2026-10-27")[0])).toBe(true);
  });

  it("rejects impossible calendar dates", () => {
    expect(isDateKey("2026-02-29")).toBe(false);
    expect(isDateKey("2024-02-29")).toBe(true);
    expect(isDateKey("2026-13-01")).toBe(false);
  });

  it("rejects a task with an unknown repeat interval", () => {
    const task = { ...createSeedTasks("2026-10-27")[0], intervalUnit: "decades" };
    expect(isAgainTask(task)).toBe(false);
  });
});
