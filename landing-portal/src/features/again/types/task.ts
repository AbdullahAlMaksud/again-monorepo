export type IntervalUnit = "days" | "weeks" | "months" | "years";

export type TaskCategory = "Home" | "Devices" | "Personal" | "Garden" | "Other";

export type AgainTask = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  intervalValue: number;
  intervalUnit: IntervalUnit;
  lastCompletedAt: string | null;
  nextDueAt: string;
  reminderEnabled: boolean;
  history: string[];
  createdAt: string;
  archivedAt: string | null;
};

export type TaskStatus = "overdue" | "today" | "upcoming";
export type AppView = "today" | "tasks" | "history" | "settings";
export type TaskFilter = "all" | "due-soon" | "overdue" | "completed";

export type CreateTaskInput = Pick<
  AgainTask,
  "title" | "description" | "category" | "intervalValue" | "intervalUnit" | "nextDueAt" | "reminderEnabled"
>;
