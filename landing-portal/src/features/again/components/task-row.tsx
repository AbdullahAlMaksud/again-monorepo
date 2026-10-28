"use client";

import { Archive, CalendarClock, Check, ChevronRight, Circle, CircleDot, House, Leaf, Monitor, UserRound, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AgainTask } from "@/features/again/types/task";
import { formatDate, getDueText, getIntervalText, getTaskStatus, toDateKey } from "@/features/again/lib/date-utils";
import { cn } from "@/lib/utils";

const categoryIcons: Record<AgainTask["category"], LucideIcon> = {
  Home: House,
  Devices: Monitor,
  Personal: UserRound,
  Garden: Leaf,
  Other: CircleDot,
};

export function TaskRow({ task, onComplete, onArchive, onSelect, showCompleted = false }: {
  task: AgainTask;
  onComplete: (task: AgainTask) => void;
  onArchive?: (task: AgainTask) => void;
  onSelect?: (task: AgainTask) => void;
  showCompleted?: boolean;
}) {
  const today = toDateKey();
  const status = getTaskStatus(task, today);
  const Icon = categoryIcons[task.category];
  const completedToday = task.history.includes(today);

  return (
    <div className={cn("group flex min-w-0 items-center gap-3 border-b border-line/80 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-paper/55 sm:gap-3.5 sm:px-5", showCompleted && completedToday && "bg-paper/35")}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-paper text-muted"><Icon className="size-[17px]" strokeWidth={1.8} /></span>
      <button type="button" onClick={() => onSelect?.(task)} className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
        <span className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="truncate text-[13px] font-medium text-ink transition-colors group-hover:text-brand">{task.title}</span>
          {status === "overdue" && <Badge variant="danger" className="px-2 py-0.5 text-[10px]">{getDueText(task, today)}</Badge>}
          {status === "today" && !completedToday && <Badge variant="brand" className="px-2 py-0.5 text-[10px]">Due today</Badge>}
          {completedToday && showCompleted && <Badge variant="lemon" className="px-2 py-0.5 text-[10px]"><Check className="size-3" /> Done today</Badge>}
        </span>
        <span className="mt-1 block truncate text-[11px] text-muted">{task.category}<span className="mx-1.5 text-line">·</span>Every {getIntervalText(task.intervalValue, task.intervalUnit)}{task.lastCompletedAt ? ` · Last done ${formatDate(task.lastCompletedAt)}` : " · Not completed yet"}</span>
      </button>
      <div className="hidden shrink-0 items-center gap-1.5 text-[11px] text-muted md:flex"><CalendarClock className="size-3.5" /><span className={status === "overdue" ? "text-danger" : ""}>{formatDate(task.nextDueAt, { month: "short", day: "numeric" })}</span></div>
      <div className="flex shrink-0 items-center gap-0.5">
        {!showCompleted && <Button aria-label={`Mark ${task.title} complete`} title="Mark complete" variant="ghost" size="icon-sm" className="text-muted hover:bg-lemon/50 hover:text-ink" onClick={() => onComplete(task)}><Check className="size-4" /></Button>}
        {onArchive && <Button aria-label={`Archive ${task.title}`} title="Archive task" variant="ghost" size="icon-sm" className="text-muted opacity-100 transition-opacity hover:bg-paper sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100" onClick={() => onArchive(task)}><Archive className="size-3.5" /></Button>}
        {onSelect && <button aria-label={`View ${task.title}`} onClick={() => onSelect(task)} className="grid size-7 place-items-center rounded-md text-muted/60 transition hover:bg-paper hover:text-ink"><ChevronRight className="size-4" /></button>}
      </div>
    </div>
  );
}

export function TaskStatusIcon({ task }: { task: AgainTask }) {
  const status = getTaskStatus(task);
  if (status === "overdue") return <CalendarClock className="size-3.5 text-danger" />;
  if (status === "today") return <Circle className="size-3.5 fill-brand text-brand" />;
  return <Circle className="size-3.5 text-muted" />;
}
