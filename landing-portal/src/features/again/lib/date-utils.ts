import type { IntervalUnit, AgainTask, TaskStatus } from "@/features/again/types/task";

export function toDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function addDays(value: string, days: number): string {
  const date = fromDateKey(value);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

/** Add intervals using calendar arithmetic. Month/year additions clamp to the last valid day. */
export function addInterval(value: string, amount: number, unit: IntervalUnit): string {
  const date = fromDateKey(value);
  const safeAmount = Math.max(1, Math.floor(amount));

  if (unit === "days") date.setDate(date.getDate() + safeAmount);
  if (unit === "weeks") date.setDate(date.getDate() + safeAmount * 7);
  if (unit === "months") {
    const day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + safeAmount);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(day, lastDay));
  }
  if (unit === "years") {
    const month = date.getMonth();
    const day = date.getDate();
    date.setDate(1);
    date.setFullYear(date.getFullYear() + safeAmount);
    date.setMonth(month);
    const lastDay = new Date(date.getFullYear(), month + 1, 0).getDate();
    date.setDate(Math.min(day, lastDay));
  }

  return toDateKey(date);
}

export function getTaskStatus(task: Pick<AgainTask, "nextDueAt">, today = toDateKey()): TaskStatus {
  if (task.nextDueAt < today) return "overdue";
  if (task.nextDueAt === today) return "today";
  return "upcoming";
}

export function formatDate(value: string, options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }): string {
  return new Intl.DateTimeFormat("en-US", options).format(fromDateKey(value));
}

export function formatLongDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(fromDateKey(value));
}

export function formatWeekdayDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(fromDateKey(value));
}

export function getDueText(task: Pick<AgainTask, "nextDueAt">, today = toDateKey()): string {
  const status = getTaskStatus(task, today);
  if (status === "today") return "Due today";
  if (status === "overdue") {
    const diff = Math.round((fromDateKey(today).getTime() - fromDateKey(task.nextDueAt).getTime()) / 86_400_000);
    return diff === 1 ? "1 day overdue" : `${diff} days overdue`;
  }
  if (task.nextDueAt === addDays(today, 1)) return "Tomorrow";
  return `In ${Math.round((fromDateKey(task.nextDueAt).getTime() - fromDateKey(today).getTime()) / 86_400_000)} days`;
}

export function getIntervalText(amount: number, unit: IntervalUnit): string {
  return `${amount} ${unit.replace(/s$/, "")}${amount === 1 ? "" : "s"}`;
}

export function getWeekdayLabel(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export function getFormattedToday(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}
