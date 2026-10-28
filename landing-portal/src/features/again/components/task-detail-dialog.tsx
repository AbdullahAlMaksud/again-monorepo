"use client";

import { CalendarClock, Check, Clock3, House, Leaf, Monitor, UserRound, CircleDot, Repeat2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate, formatLongDate, getDueText, getIntervalText, getTaskStatus, toDateKey } from "@/features/again/lib/date-utils";
import type { AgainTask } from "@/features/again/types/task";

const categoryIcons = { Home: House, Devices: Monitor, Personal: UserRound, Garden: Leaf, Other: CircleDot } as const;

export function TaskDetailDialog({ task, onOpenChange, onComplete }: { task: AgainTask | null; onOpenChange: (open: boolean) => void; onComplete: (task: AgainTask) => void }) {
  const open = task !== null;
  if (!task) return null;
  const Icon = categoryIcons[task.category];
  const status = getTaskStatus(task);
  const today = toDateKey();
  const history = [...task.history].sort((a, b) => b.localeCompare(a));
  const completedToday = task.history.includes(today);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2"><span className="grid size-10 place-items-center rounded-2xl bg-peach text-brand"><Icon className="size-5" /></span><Badge variant="outline">{task.category}</Badge></div>
          <DialogTitle className="pr-6">{task.title}</DialogTitle>
          <DialogDescription>{task.description || "A recurring task worth remembering."}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <Card className="bg-paper/70 p-3.5"><p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Next due</p><p className="mt-1.5 text-sm font-bold">{formatLongDate(task.nextDueAt)}</p><div className="mt-2">{status === "overdue" ? <Badge variant="danger">{getDueText(task)}</Badge> : status === "today" ? <Badge variant="brand">Due today</Badge> : <Badge variant="outline">{getDueText(task)}</Badge>}</div></Card>
          <Card className="bg-paper/70 p-3.5"><p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Repeat cycle</p><p className="mt-1.5 text-sm font-bold">Every {getIntervalText(task.intervalValue, task.intervalUnit)}</p><p className="mt-2 text-[10px] text-muted">{task.reminderEnabled ? "Reminder enabled" : "No reminder"}</p></Card>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-line pb-3"><div><p className="text-xs font-semibold">Completion history</p><p className="mt-1 text-[11px] text-muted">{history.length} saved {history.length === 1 ? "record" : "records"}</p></div><div className="flex items-center gap-1 text-[11px] text-muted"><CalendarClock className="size-3.5" />{task.lastCompletedAt ? `Last done ${formatDate(task.lastCompletedAt)}` : "Not completed yet"}</div></div>
        <div className="max-h-44 space-y-3 overflow-y-auto pr-1">
          {history.length ? history.map((date, index) => <div key={`${date}-${index}`} className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-lemon text-ink"><Check className="size-3.5" /></span><div className="flex-1"><p className="text-xs font-medium">Completed</p><p className="mt-0.5 text-[10px] text-muted">{formatLongDate(date)}</p></div>{date === today && <Badge variant="lemon">Today</Badge>}</div>) : <p className="py-4 text-xs text-muted">No completion records yet. The first one is a click away.</p>}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4"><div className="flex items-center gap-1.5 text-[10px] text-muted"><Clock3 className="size-3.5" />Stored on this device</div><Button disabled={completedToday} onClick={() => onComplete(task)}>{completedToday ? <><Check className="size-4" /> Done today</> : <><Repeat2 className="size-4" /> Mark complete</>}</Button></div>
      </DialogContent>
    </Dialog>
  );
}
