"use client";

import { CalendarDays, History, Home, ListTodo, Plus, Settings2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgainLogo } from "@/features/again/components/again-logo";
import type { AppView, AgainTask } from "@/features/again/types/task";
import { getTaskStatus, toDateKey } from "@/features/again/lib/date-utils";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  onCreateTask: () => void;
  tasks: AgainTask[];
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

const navigation: { id: AppView; label: string; icon: typeof Home }[] = [
  { id: "today", label: "Today", icon: Home },
  { id: "tasks", label: "All tasks", icon: ListTodo },
  { id: "history", label: "History", icon: History },
];

export function Sidebar({ activeView, onViewChange, onCreateTask, tasks, mobileOpen = false, onCloseMobile }: SidebarProps) {
  const today = toDateKey();
  const dueToday = tasks.filter((task) => !task.archivedAt && getTaskStatus(task, today) === "today").length;

  return (
    <>
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-deep/30 md:hidden" onClick={onCloseMobile} />}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[236px] flex-col border-r border-line bg-background px-4 pb-4 pt-5 transition-transform duration-200 md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}>
        <div className="px-2"><AgainLogo /></div>

        <Button className="mt-8 h-10 w-full justify-start px-3" onClick={onCreateTask}>
          <Plus className="size-4" />
          <span>New task</span>
          <kbd className="ml-auto rounded border border-ink/10 bg-white/40 px-1.5 py-0.5 text-[10px] font-medium">N</kbd>
        </Button>

        <div className="mt-8 px-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-muted">Workspace</div>
        <nav aria-label="Main navigation" className="mt-2 space-y-1">
          {navigation.map(({ id, label, icon: Icon }) => {
            const selected = activeView === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => { onViewChange(id); onCloseMobile?.(); }}
                className={cn(
                  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors",
                  selected ? "bg-peach text-brand" : "text-muted hover:bg-paper hover:text-ink",
                )}
              >
                <Icon className={cn("size-[17px]", selected ? "stroke-[2.2]" : "stroke-[1.8]")} />
                <span>{label}</span>
                {id === "today" && dueToday > 0 && <span className={cn("ml-auto min-w-5 rounded-md px-1.5 py-0.5 text-center text-[10px]", selected ? "bg-panel text-brand" : "bg-paper text-muted")}>{dueToday}</span>}
              </button>
            );
          })}
          <button type="button" aria-current={activeView === "settings" ? "page" : undefined} onClick={() => { onViewChange("settings"); onCloseMobile?.(); }} className={cn("flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors", activeView === "settings" ? "bg-peach text-brand" : "text-muted hover:bg-paper hover:text-ink")}>
            <Settings2 className="size-[17px]" /> Settings
          </button>
        </nav>

        <div className="mt-auto border-t border-line pt-4">
          <div className="flex items-start gap-2.5 rounded-lg px-2 py-2.5">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-paper text-muted"><ShieldCheck className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink">Private by default</p>
              <p className="mt-1 text-[11px] leading-4 text-muted">Your tasks stay in this browser.</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2">
            <span className="grid size-8 place-items-center rounded-full bg-lemon/70 text-ink"><CalendarDays className="size-4" /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-ink">Local workspace</p><p className="mt-0.5 text-[10px] text-muted">No account required</p></div>
            <span className="size-1.5 rounded-full bg-brand" aria-label="Local mode active" />
          </div>
        </div>
      </aside>
    </>
  );
}
