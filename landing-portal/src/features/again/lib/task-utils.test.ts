import { describe, expect, it } from "vitest";
import { filterTasks } from "@/features/again/lib/task-utils";
import { createSeedTasks } from "@/features/again/lib/seed-tasks";

describe("filterTasks", () => {
  const tasks = createSeedTasks("2026-10-27");

  it("finds tasks by title, description, and category", () => {
    expect(filterTasks(tasks, "all", "coffee", "2026-10-27").map((task) => task.id)).toEqual(["task-coffee-machine"]);
    expect(filterTasks(tasks, "all", "devices", "2026-10-27").map((task) => task.id)).toEqual(["task-laptop-backup"]);
  });

  it("limits due-soon to the next seven days and excludes overdue tasks", () => {
    const results = filterTasks(tasks, "due-soon", "", "2026-10-27");
    expect(results.map((task) => task.id)).toContain("task-water-plants");
    expect(results.map((task) => task.id)).toContain("task-air-filter");
    expect(results.map((task) => task.id)).not.toContain("task-bike-chain");
    const farFutureTask = { ...tasks[0], id: "task-far-future", nextDueAt: "2026-11-20" };
    expect(filterTasks([...tasks, farFutureTask], "due-soon", "", "2026-10-27").map((task) => task.id)).not.toContain("task-far-future");
  });

  it("returns overdue tasks oldest-due-first", () => {
    expect(filterTasks(tasks, "overdue", "", "2026-10-27").map((task) => task.id)).toEqual(["task-bike-chain"]);
  });
});
