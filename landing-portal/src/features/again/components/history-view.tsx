"use client";

import { useMemo } from "react";
import { CalendarDays, Check, Clock3, History, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate, formatLongDate, toDateKey } from "@/features/again/lib/date-utils";
import type { AgainTask } from "@/features/again/types/task";

export function HistoryView({ tasks }: { tasks: AgainTask[] }) {
  const entries = useMemo(() => tasks
    .filter((task) => !task.archivedAt)
    .flatMap((task) => task.history.map((date, index) => ({ id: `${task.id}-${date}-${index}`, date, title: task.title, category: task.category })))
    .sort((a, b) => b.date.localeCompare(a.date)), [tasks]);
  const today = toDateKey();
  const todayCount = entries.filter((entry) => entry.date === today).length;
  const thisMonthCount = entries.filter((entry) => entry.date.slice(0, 7) === today.slice(0, 7)).length;
  const groups = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <div className="fade-in mx-auto max-w-[1180px] space-y-6">
      <div><h2 className="text-2xl font-bold tracking-[-.8px] text-ink">A history of showing up.</h2><p className="mt-1 text-sm text-muted">Every small thing you've taken care of, in one place.</p></div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4"><div className="flex items-center justify-between"><span className="text-xs font-medium text-muted">Completed today</span><span className="grid size-8 place-items-center rounded-xl bg-peach text-brand"><Check className="size-4" /></span></div><p className="mt-3 text-3xl font-bold tracking-tight">{todayCount}</p><p className="mt-1 text-[11px] text-muted">tasks checked off</p></Card>
        <Card className="p-4"><div className="flex items-center justify-between"><span className="text-xs font-medium text-muted">This month</span><span className="grid size-8 place-items-center rounded-xl bg-lemon text-ink"><CalendarDays className="size-4" /></span></div><p className="mt-3 text-3xl font-bold tracking-tight">{thisMonthCount}</p><p className="mt-1 text-[11px] text-muted">completed moments</p></Card>
        <Card className="p-4"><div className="flex items-center justify-between"><span className="text-xs font-medium text-muted">All-time</span><span className="grid size-8 place-items-center rounded-xl bg-paper text-muted"><History className="size-4" /></span></div><p className="mt-3 text-3xl font-bold tracking-tight">{entries.length}</p><p className="mt-1 text-[11px] text-muted">records saved on this device</p></Card>
      </div>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-4"><div><h3 className="text-sm font-semibold">Completion timeline</h3><p className="mt-1 text-[11px] text-muted">Your most recent activity first.</p></div><Badge variant="outline">{entries.length} records</Badge></div>
        {entries.length ? <div className="divide-y divide-line/80">
          {Object.entries(groups).map(([date, dayEntries]) => <div key={date} className="grid gap-2 px-5 py-4 sm:grid-cols-[150px_1fr] sm:gap-5"><div className="pt-1 text-xs font-semibold text-muted">{date === today ? "Today" : formatLongDate(date)}</div><div className="space-y-2">{dayEntries.map((entry) => <div key={entry.id} className="flex items-center gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-lemon text-ink"><Check className="size-3.5" /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-ink">{entry.title}</p><p className="mt-0.5 text-[10px] text-muted">{entry.category} · Completed {formatDate(entry.date, { month: "short", day: "numeric" })}</p></div><span className="hidden text-[10px] text-muted sm:inline-flex"><Clock3 className="mr-1 size-3" />Logged</span></div>)}</div></div>)}
        </div> : <div className="flex flex-col items-center py-16 text-center"><span className="grid size-12 place-items-center rounded-2xl bg-paper text-muted"><Sparkles className="size-5" /></span><p className="mt-4 text-sm font-semibold">Your story starts here.</p><p className="mt-1 max-w-xs text-xs leading-5 text-muted">Complete a task and it will appear in this timeline.</p></div>}
      </Card>
    </div>
  );
}
