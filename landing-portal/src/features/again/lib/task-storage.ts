import type { AgainTask } from "@/features/again/types/task";
import { isAgainTask } from "@/features/again/lib/task-validation";

const STORAGE_KEY = "again.tasks.v1";
const LEGACY_STORAGE_KEY = "recur.tasks.v1";

export function loadTasks(): AgainTask[] | null {
  if (typeof window === "undefined") return null;
  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    const legacy = current ? null : window.localStorage.getItem(LEGACY_STORAGE_KEY);
    const raw = current ?? legacy;
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isAgainTask)) return null;

    // Migrate old Recur data without losing the user's existing task history.
    if (!current && legacy) {
      window.localStorage.setItem(STORAGE_KEY, legacy);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveTasks(tasks: AgainTask[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Again could not save tasks to local storage.", error);
  }
}

export function clearSavedTasks(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export const taskStorageKey = STORAGE_KEY;
