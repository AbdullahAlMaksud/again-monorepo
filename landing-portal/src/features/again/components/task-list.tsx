"use client";

import { useMemo, useState } from "react";
import { Archive, CheckCheck, CircleDashed, ListFilter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskRow } from "@/features/again/components/task-row";
import { filterTasks } from "@/features/again/lib/task-utils";
import type { AgainTask, TaskFilter } from "@/features/again/types/task";

const filters: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All tasks" },
  { id: "due-soon", label: "Due soon" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed today" },
];

export function TaskList({ tasks, onComplete, onArchive, onSelect, searchQuery = "", onSearchQueryChange, onCreateTask }: {
  tasks: AgainTask[];
  onComplete: (task: AgainTask) => void;
  onArchive: (task: AgainTask) => void;
  onSelect: (task: AgainTask) => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onCreateTask: () => void;
}) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [localQuery, setLocalQuery] = useState("");
  const query = onSearchQueryChange ? searchQuery : localQuery;
  const setQuery = onSearchQueryChange ?? setLocalQuery;
  const visibleTasks = useMemo(() => filterTasks(tasks, filter, query), [tasks, filter, query]);
  const activeCount = tasks.filter((task) => !task.archivedAt).length;

  return (
    <div className="fade-in mx-auto max-w-[1180px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-2 text-xs text-muted">YOUR WORKSPACE</p><h1 className="text-3xl font-semibold tracking-[-1.2px] text-ink">All tasks <span className="ml-1 align-middle text-base font-medium text-muted">{activeCount}</span></h1><p className="mt-2 text-sm text-muted">Everything you want to remember to do again.</p></div>
        <Button onClick={onCreateTask}><Plus className="size-4" /> New task</Button>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as TaskFilter)}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" /><Input aria-label="Search tasks" className="h-10 border-line bg-panel pl-9" placeholder="Search by task, note, or category…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <TabsList aria-label="Filter tasks" className="h-10 max-w-full overflow-x-auto">
            {filters.map((item) => <TabsTrigger key={item.id} value={item.id} className="shrink-0">{item.label}</TabsTrigger>)}
          </TabsList>
        </div>
        <TabsContent value={filter} className="mt-4">
          <Card className="overflow-hidden shadow-sm shadow-ink/[0.02]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6"><div className="flex items-center gap-2 text-xs font-semibold text-ink"><ListFilter className="size-4 text-muted" /> Task list</div><Badge variant="outline">{visibleTasks.length} shown</Badge></div>
            {visibleTasks.length ? visibleTasks.map((task) => <TaskRow key={task.id} task={task} onComplete={onComplete} onArchive={onArchive} onSelect={onSelect} showCompleted={filter === "completed"} />) : (
              <div className="flex flex-col items-center px-6 py-14 text-center"><span className="grid size-11 place-items-center rounded-full bg-paper text-muted">{filter === "completed" ? <CheckCheck className="size-5" /> : <CircleDashed className="size-5" />}</span><p className="mt-4 text-sm font-semibold text-ink">No tasks found</p><p className="mt-1 max-w-xs text-xs leading-5 text-muted">Try another filter or add a task to get started.</p><Button variant="outline" size="sm" className="mt-4" onClick={onCreateTask}><Plus className="size-3.5" /> Create a task</Button></div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex items-center gap-2 px-1 text-[11px] text-muted"><Archive className="size-3.5" /> Archived tasks are hidden from this list.</div>
    </div>
  );
}
