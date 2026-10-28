"use client";

import { ArrowRight, CalendarDays, Check, CheckCheck, CircleAlert, Clock3, Plus, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TaskRow } from "@/features/again/components/task-row";
import { countCompletedThisWeek } from "@/features/again/lib/task-utils";
import { addDays, formatDate, getFormattedToday, getTaskStatus, toDateKey } from "@/features/again/lib/date-utils";
import type { AgainTask } from "@/features/again/types/task";

export function DashboardView({ tasks, onCreateTask, onComplete, onArchive, onSelect, onViewAll }: {
  tasks: AgainTask[];
  onCreateTask: () => void;
  onComplete: (task: AgainTask) => void;
  onArchive: (task: AgainTask) => void;
  onSelect: (task: AgainTask) => void;
  onViewAll: () => void;
}) {
  const today = toDateKey();
  const activeTasks = tasks.filter((task) => !task.archivedAt);
  const overdueTasks = activeTasks.filter((task) => getTaskStatus(task, today) === "overdue").sort((a, b) => a.nextDueAt.localeCompare(b.nextDueAt));
  const dueToday = activeTasks.filter((task) => getTaskStatus(task, today) === "today").sort((a, b) => a.title.localeCompare(b.title));
  const upcomingTasks = activeTasks.filter((task) => task.nextDueAt > today).sort((a, b) => a.nextDueAt.localeCompare(b.nextDueAt));
  const nextSevenDays = upcomingTasks.filter((task) => task.nextDueAt <= addDays(today, 7));
  const completedThisWeek = countCompletedThisWeek(activeTasks, today);
  const attentionTasks = [...overdueTasks, ...dueToday];

  return (
    <div className="fade-in mx-auto max-w-[1180px] space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted"><CalendarDays className="size-3.5" /><span>{getFormattedToday()}</span></div>
          <h1 className="text-[29px] font-semibold leading-tight tracking-[-1.35px] text-ink sm:text-[34px]">A little care, on repeat<span className="text-brand">.</span></h1>
          <p className="mt-2 text-sm text-muted">A clear view of what needs doing again.</p>
        </div>
        <Button onClick={onCreateTask} className="self-start sm:self-auto"><Plus className="size-4" /> New task</Button>
      </section>

      <section aria-label="Task summary" className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Today" value={dueToday.length} description="Tasks due today" icon={Sunrise} tone="yellow" />
        <SummaryCard label="Overdue" value={overdueTasks.length} description="Ready when you are" icon={CircleAlert} tone="orange" />
        <SummaryCard label="Upcoming" value={nextSevenDays.length} description="Due in the next 7 days" icon={CalendarDays} tone="neutral" />
      </section>

      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.82fr)]">
        <Card className="overflow-hidden shadow-sm shadow-ink/[0.02]">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-ink">Needs attention</h2><Badge variant="outline">{attentionTasks.length}</Badge></div>
              <p className="mt-1 text-xs text-muted">Due today or past due.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onViewAll} className="text-muted">All tasks <ArrowRight className="size-3.5" /></Button>
          </div>
          {attentionTasks.length ? (
            <div>
              {attentionTasks.map((task) => <TaskRow key={task.id} task={task} onComplete={onComplete} onArchive={onArchive} onSelect={onSelect} />)}
              <div className="flex items-center gap-2 border-t border-line bg-paper/50 px-5 py-3 text-[11px] text-muted sm:px-6"><Check className="size-3.5" /> Completing a task automatically sets its next due date.</div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="grid size-10 place-items-center rounded-full bg-lemon/45 text-ink"><Check className="size-5" /></span>
              <p className="mt-3 text-sm font-semibold text-ink">You’re all caught up.</p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-muted">Nothing needs your attention right now.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={onCreateTask}><Plus className="size-3.5" /> Add a task</Button>
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <Card className="overflow-hidden shadow-sm shadow-ink/[0.02]">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div><h2 className="text-sm font-semibold text-ink">Coming up</h2><p className="mt-1 text-xs text-muted">What’s next on your list.</p></div>
              <Button variant="ghost" size="icon-sm" aria-label="View all upcoming tasks" onClick={onViewAll}><ArrowRight className="size-4" /></Button>
            </div>
            {upcomingTasks.length ? upcomingTasks.slice(0, 4).map((task) => <TaskRow key={task.id} task={task} onComplete={onComplete} onArchive={onArchive} onSelect={onSelect} />) : <p className="px-5 py-8 text-center text-xs text-muted">No upcoming tasks yet.</p>}
            {upcomingTasks.length > 4 && <button type="button" onClick={onViewAll} className="w-full border-t border-line py-3 text-xs font-medium text-muted transition hover:text-brand">See all {upcomingTasks.length} tasks</button>}
          </Card>

          <Card className="p-5 shadow-sm shadow-ink/[0.02] sm:p-6">
            <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-lemon/50 text-ink"><CheckCheck className="size-[18px]" /></span><div><h2 className="text-sm font-semibold text-ink">This week</h2><p className="mt-0.5 text-xs text-muted">A record, not a streak.</p></div></div>
            <div className="mt-5 flex items-end justify-between gap-3"><p className="text-4xl font-semibold tracking-[-1.8px] text-ink">{completedThisWeek}</p><p className="max-w-[145px] pb-1 text-right text-xs leading-5 text-muted">{completedThisWeek === 1 ? "task" : "tasks"} taken care of this week</p></div>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-[11px] text-muted"><Clock3 className="size-3.5" />{upcomingTasks[0] ? <>Next due: <span className="font-medium text-ink">{formatDate(upcomingTasks[0].nextDueAt, { month: "short", day: "numeric" })}</span><span className="ml-auto truncate">{upcomingTasks[0].title}</span></> : "No upcoming dates"}</div>
            {upcomingTasks[0] && <button type="button" onClick={() => onSelect(upcomingTasks[0])} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline">View next task <ArrowRight className="size-3.5" /></button>}
          </Card>
        </div>
      </section>
      <p className="flex items-center justify-center gap-2 pb-3 text-[11px] text-muted"><span className="size-1.5 rounded-full bg-brand" />Your tasks are stored locally on this device.</p>
    </div>
  );
}

function SummaryCard({ label, value, description, icon: Icon, tone }: { label: string; value: number; description: string; icon: typeof CalendarDays; tone: "yellow" | "orange" | "neutral" }) {
  const toneClasses = {
    yellow: "bg-lemon/40 text-ink",
    orange: "bg-peach text-brand",
    neutral: "bg-paper text-muted",
  };
  return (
    <Card className="flex items-center gap-4 rounded-xl p-4 shadow-sm shadow-ink/[0.02] sm:p-5">
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${toneClasses[tone]}`}><Icon className="size-[18px]" strokeWidth={1.8} /></span>
      <div className="min-w-0 flex-1"><p className="text-xs font-medium text-muted">{label}</p><div className="mt-1 flex items-baseline gap-2"><span className="text-2xl font-semibold tracking-tight text-ink">{value}</span><span className="truncate text-[11px] text-muted">{description}</span></div></div>
    </Card>
  );
}
