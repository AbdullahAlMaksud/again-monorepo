import type { AgainTask, TaskFilter } from "@/features/again/types/task";
import { addDays, getTaskStatus, toDateKey } from "@/features/again/lib/date-utils";

export function filterTasks(tasks: AgainTask[], filter: TaskFilter, query: string, today = toDateKey()): AgainTask[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return tasks
    .filter((task) => !task.archivedAt)
    .filter((task) => {
      if (!normalizedQuery) return true;
      return `${task.title} ${task.description} ${task.category}`.toLocaleLowerCase().includes(normalizedQuery);
    })
    .filter((task) => {
      if (filter === "overdue") return getTaskStatus(task, today) === "overdue";
      if (filter === "due-soon") return task.nextDueAt >= today && task.nextDueAt <= addDays(today, 7);
      if (filter === "completed") return task.lastCompletedAt === today;
      return true;
    })
    .sort((a, b) => a.nextDueAt.localeCompare(b.nextDueAt));
}

export function countCompletedThisWeek(tasks: AgainTask[], today = toDateKey()): number {
  const currentDate = new Date(`${today}T12:00:00`);
  const dayOfWeek = currentDate.getDay();
  const start = new Date(currentDate);
  start.setDate(currentDate.getDate() - ((dayOfWeek + 6) % 7));
  const startKey = toDateKey(start);

  return tasks.reduce((count, task) => count + task.history.filter((date) => date >= startKey && date <= today).length, 0);
}
