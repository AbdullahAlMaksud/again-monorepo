"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, History, Menu, Search, Settings2, Sparkles, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardView } from "@/features/again/components/dashboard-view";
import { HistoryView } from "@/features/again/components/history-view";
import { SettingsView } from "@/features/again/components/settings-view";
import { TaskDetailDialog } from "@/features/again/components/task-detail-dialog";
import { TaskFormDialog } from "@/features/again/components/task-form-dialog";
import { TaskList } from "@/features/again/components/task-list";
import { createSeedTasks } from "@/features/again/lib/seed-tasks";
import { addInterval, toDateKey } from "@/features/again/lib/date-utils";
import { loadTasks, saveTasks } from "@/features/again/lib/task-storage";
import type { AppView, CreateTaskInput, AgainTask } from "@/features/again/types/task";
import { getAppTheme, type AppTheme } from "@/features/again/types/theme";

export function AgainApp() {
  const [tasks, setTasks] = useState<AgainTask[]>([]);
  const [activeView, setActiveView] = useState<AppView>("today");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<AppTheme>("light");
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks ?? createSeedTasks());
    const savedTheme = window.localStorage.getItem("again.theme") ?? window.localStorage.getItem("recur.theme");
    setTheme(getAppTheme(savedTheme));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTasks(tasks);
  }, [tasks, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("again.theme", theme);
    window.localStorage.removeItem("recur.theme");
  }, [theme, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const selectedTask = useMemo(() => tasks.find((task) => task.id === selectedTaskId) ?? null, [tasks, selectedTaskId]);

  const handleCreateTask = useCallback((input: CreateTaskInput) => {
    const now = new Date().toISOString();
    const task: AgainTask = { ...input, id: crypto.randomUUID(), lastCompletedAt: null, history: [], createdAt: now, archivedAt: null };
    setTasks((current) => [task, ...current]);
    setToast("Your new task is in the loop.");
  }, []);

  const handleCompleteTask = useCallback((task: AgainTask) => {
    const today = toDateKey();
    if (task.history.includes(today)) {
      setToast("Already checked off for today.");
      return;
    }
    setTasks((current) => current.map((item) => item.id === task.id ? {
      ...item,
      lastCompletedAt: today,
      nextDueAt: addInterval(today, item.intervalValue, item.intervalUnit),
      history: [today, ...item.history].sort((a, b) => b.localeCompare(a)),
    } : item));
    setToast(`Nice. “${task.title}” is checked off.`);
  }, []);

  const handleArchiveTask = useCallback((task: AgainTask) => {
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, archivedAt: new Date().toISOString() } : item));
    setToast(`“${task.title}” was archived.`);
  }, []);

  const handleReset = useCallback(() => {
    setTasks(createSeedTasks());
    setActiveView("today");
    setToast("Demo tasks restored.");
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (!isTyping && event.key.toLowerCase() === "n" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setCreateOpen(true);
      }
      if (event.key === "Escape") setMobileNavOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleImportTasks(importedTasks: AgainTask[]) {
    setTasks(importedTasks);
    setToast(`${importedTasks.length} tasks imported.`);
  }

  function openAllTasks() {
    setActiveView("tasks");
    setSearchQuery("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar activeView={activeView} onViewChange={setActiveView} onCreateTask={() => setCreateOpen(true)} tasks={tasks} mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      <div className="min-h-screen md:pl-[236px]">
        <header className="sticky top-0 z-20 flex h-[64px] items-center gap-3 border-b border-line/80 bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Button aria-label="Open navigation" variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}><Menu className="size-5" /></Button>
          <div className="relative ml-auto w-full max-w-[380px]"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" /><Input ref={searchInputRef} aria-label="Search tasks" placeholder="Search tasks…" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); if (event.target.value) setActiveView("tasks"); }} onKeyDown={(event) => { if (event.key === "Enter") setActiveView("tasks"); }} className="h-9 rounded-lg border-transparent bg-paper pl-9 pr-12 text-xs placeholder:text-muted/80 focus:border-brand/40 focus:bg-panel" /><span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-line bg-panel px-1.5 py-1 text-[9px] text-muted lg:flex">⌘ K</span></div>
          <div className="ml-1 hidden items-center gap-2 rounded-full border border-line/80 bg-panel px-2.5 py-1.5 sm:flex"><span className="size-1.5 rounded-full bg-brand" /><span className="text-[10px] font-medium text-muted">Local mode</span></div>
          <Button aria-label="Go to settings" title="Settings" variant="ghost" size="icon" className="hidden text-muted sm:inline-flex" onClick={() => setActiveView("settings")}><Settings2 className="size-4" /></Button>
          <span aria-label="Personal workspace" title="Personal workspace" className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-panel text-muted"><UserRound className="size-4" /></span>
        </header>

        <main className="again-grid mx-auto max-w-[1540px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          {!hydrated ? <AppSkeleton /> : activeView === "today" ? (
            <DashboardView tasks={tasks} onCreateTask={() => setCreateOpen(true)} onComplete={handleCompleteTask} onArchive={handleArchiveTask} onSelect={(task) => setSelectedTaskId(task.id)} onViewAll={openAllTasks} />
          ) : activeView === "tasks" ? (
            <TaskList tasks={tasks} onComplete={handleCompleteTask} onArchive={handleArchiveTask} onSelect={(task) => setSelectedTaskId(task.id)} searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} onCreateTask={() => setCreateOpen(true)} />
          ) : activeView === "history" ? (
            <HistoryView tasks={tasks} />
          ) : (
            <SettingsView tasks={tasks.filter((task) => !task.archivedAt)} theme={theme} onThemeChange={setTheme} onImportTasks={handleImportTasks} onReset={handleReset} />
          )}
        </main>
      </div>

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-background/95 px-2 py-2 backdrop-blur-xl md:hidden">
        {[{ id: "today" as const, label: "Today", icon: Sparkles }, { id: "tasks" as const, label: "Tasks", icon: Check }, { id: "history" as const, label: "History", icon: History }, { id: "settings" as const, label: "Settings", icon: Settings2 }].map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveView(id)} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold ${activeView === id ? "text-brand" : "text-muted"}`}><Icon className={`size-[18px] ${activeView === id ? "stroke-[2.4]" : "stroke-[1.8]"}`} />{label}</button>)}
      </nav>
      <div className="h-16 md:hidden" />

      <TaskFormDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreateTask} />
      <TaskDetailDialog task={selectedTask} onOpenChange={(open) => { if (!open) setSelectedTaskId(null); }} onComplete={(task) => { handleCompleteTask(task); setSelectedTaskId(null); }} />

      {toast && <div role="status" className="fade-in fixed bottom-20 left-1/2 z-[70] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-2xl bg-deep px-4 py-3 text-xs font-medium text-white shadow-xl md:bottom-6"><span className="grid size-5 place-items-center rounded-full bg-lemon text-ink"><Check className="size-3" /></span><span className="whitespace-nowrap">{toast}</span><button aria-label="Dismiss notification" className="ml-1 text-white/60 hover:text-white" onClick={() => setToast(null)}><X className="size-3.5" /></button></div>}
    </div>
  );
}

function AppSkeleton() {
  return <div className="mx-auto max-w-[1180px] animate-pulse space-y-6"><div className="h-16 max-w-md rounded-xl bg-paper" /><div className="grid gap-3 sm:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-20 rounded-xl border border-line bg-panel" />)}</div><div className="grid gap-5 xl:grid-cols-[1.5fr_.82fr]"><div className="h-[390px] rounded-xl border border-line bg-panel" /><div className="h-[320px] rounded-xl border border-line bg-panel" /></div></div>;
}
