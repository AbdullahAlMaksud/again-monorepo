import type { AgainTask, TaskCategory, IntervalUnit } from "@/features/again/types/task";

const TASK_CATEGORIES: readonly TaskCategory[] = ["Home", "Devices", "Personal", "Garden", "Other"];
const INTERVAL_UNITS: readonly IntervalUnit[] = ["days", "weeks", "months", "years"];

export function isDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function isAgainTask(value: unknown): value is AgainTask {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<AgainTask>;

  return typeof item.id === "string"
    && item.id.length > 0
    && typeof item.title === "string"
    && item.title.trim().length > 0
    && item.title.length <= 80
    && typeof item.description === "string"
    && TASK_CATEGORIES.includes(item.category as TaskCategory)
    && typeof item.intervalValue === "number"
    && Number.isInteger(item.intervalValue)
    && item.intervalValue >= 1
    && item.intervalValue <= 3650
    && INTERVAL_UNITS.includes(item.intervalUnit as IntervalUnit)
    && isDateKey(item.nextDueAt)
    && (item.lastCompletedAt === null || isDateKey(item.lastCompletedAt))
    && typeof item.reminderEnabled === "boolean"
    && Array.isArray(item.history)
    && item.history.every((date) => isDateKey(date))
    && typeof item.createdAt === "string"
    && (item.archivedAt === null || typeof item.archivedAt === "string");
}
