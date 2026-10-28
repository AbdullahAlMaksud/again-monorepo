"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Bell, CalendarDays, House, Monitor, Leaf, UserRound, CircleDot, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { CreateTaskInput, IntervalUnit, TaskCategory } from "@/features/again/types/task";
import { toDateKey } from "@/features/again/lib/date-utils";

const categories: { value: TaskCategory; label: string; icon: typeof House }[] = [
  { value: "Home", label: "Home", icon: House },
  { value: "Devices", label: "Devices", icon: Monitor },
  { value: "Garden", label: "Garden", icon: Leaf },
  { value: "Personal", label: "Personal", icon: UserRound },
  { value: "Other", label: "Other", icon: CircleDot },
];

export function TaskFormDialog({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (open: boolean) => void; onCreate: (input: CreateTaskInput) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Home");
  const [intervalValue, setIntervalValue] = useState("30");
  const [intervalUnit, setIntervalUnit] = useState<IntervalUnit>("days");
  const [nextDueAt, setNextDueAt] = useState("");

  useEffect(() => {
    if (open && !nextDueAt) setNextDueAt(toDateKey());
  }, [open, nextDueAt]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("Home");
    setIntervalValue("30");
    setIntervalUnit("days");
    setNextDueAt("");
    setReminderEnabled(true);
    setError("");
  }

  function handleOpenChange(value: boolean) {
    if (!value) resetForm();
    onOpenChange(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(intervalValue);
    if (!title.trim()) { setError("Give this task a name to get started."); return; }
    if (!Number.isInteger(amount) || amount < 1 || amount > 3650) { setError("Choose an interval between 1 and 3,650."); return; }
    onCreate({ title: title.trim(), description: description.trim(), category, intervalValue: amount, intervalUnit, nextDueAt, reminderEnabled });
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:p-7">
        <DialogHeader>
          <div className="mb-2 grid size-10 place-items-center rounded-2xl bg-peach text-brand"><Repeat2 className="size-5" /></div>
          <DialogTitle>Create a recurring task</DialogTitle>
          <DialogDescription>A small thing, remembered at the right time.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="task-title" className="text-xs font-semibold text-ink">Task name <span className="text-brand">*</span></label>
            <Input id="task-title" autoFocus placeholder="e.g. Clean the coffee machine" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="task-description" className="text-xs font-semibold text-ink">Note <span className="font-normal text-muted">· optional</span></label>
            <Textarea id="task-description" rows={2} placeholder="Add a detail you'll want to remember…" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={240} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink">Category</label>
            <div className="grid grid-cols-5 gap-1.5">
              {categories.map(({ value, label, icon: Icon }) => (
                <button key={value} type="button" onClick={() => setCategory(value)} className={`flex min-w-0 flex-col items-center gap-1.5 rounded-xl border p-2 transition ${category === value ? "border-brand bg-peach text-brand" : "border-line bg-panel text-muted hover:bg-paper"}`}>
                  <Icon className="size-4" /><span className="text-[10px] font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-paper/55 p-4">
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink"><Repeat2 className="size-4 text-brand" /> Repeat every</label>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <Input aria-label="Interval amount" type="number" min="1" max="3650" value={intervalValue} onChange={(event) => setIntervalValue(event.target.value)} />
              <Select value={intervalUnit} onValueChange={(value) => setIntervalUnit(value as IntervalUnit)}>
                <SelectTrigger aria-label="Interval unit"><SelectValue placeholder="Choose unit" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><label htmlFor="due-date" className="flex items-center gap-1.5 text-xs font-semibold text-ink"><CalendarDays className="size-3.5 text-muted" /> First due date</label><Input id="due-date" type="date" value={nextDueAt} onChange={(event) => setNextDueAt(event.target.value)} required /></div>
            <div className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-lemon text-ink"><Bell className="size-4" /></span><div><p className="text-xs font-semibold">Reminder</p><p className="mt-0.5 text-[10px] text-muted">Saved preference</p></div></div>
              <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} aria-label="Enable reminder preference" />
            </div>
          </div>
          {error && <p role="alert" className="rounded-xl bg-danger/10 px-3 py-2 text-xs text-danger">{error}</p>}
          <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="min-w-32"><span>Create task</span><span aria-hidden="true">↗</span></Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
