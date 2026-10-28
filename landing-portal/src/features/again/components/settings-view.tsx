"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Download,
  FileJson,
  Moon,
  Mountain,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sun,
  Trees,
  Upload,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AgainTask } from "@/features/again/types/task";
import { toDateKey } from "@/features/again/lib/date-utils";
import { isAgainTask } from "@/features/again/lib/task-validation";
import { THEME_OPTIONS, type AppTheme } from "@/features/again/types/theme";

const themeIcons: Record<AppTheme, LucideIcon> = {
  light: Sun,
  dark: Moon,
  forest: Trees,
  ocean: Waves,
  dune: Mountain,
};

export function SettingsView({ tasks, theme, onThemeChange, onImportTasks, onReset }: {
  tasks: AgainTask[];
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onImportTasks: (tasks: AgainTask[]) => void;
  onReset: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  function exportBackup() {
    const payload = { app: "again", version: 1, exportedAt: new Date().toISOString(), tasks };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `again-backup-${toDateKey()}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setMessage("Your Again backup is ready.");
  }

  async function importBackup(file?: File) {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const candidate = typeof parsed === "object" && parsed !== null && "tasks" in parsed ? (parsed as { tasks?: unknown }).tasks : parsed;
      if (!Array.isArray(candidate) || !candidate.every(isAgainTask)) {
        throw new Error("This file doesn't look like a valid Again backup.");
      }
      onImportTasks(candidate);
      setMessage(`Imported ${candidate.length} tasks successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Couldn't import this file.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleReset() {
    if (!confirmReset) { setConfirmReset(true); return; }
    onReset();
    setConfirmReset(false);
    setMessage("Sample data has been restored.");
  }

  return (
    <div className="fade-in max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-[-.8px] text-ink">Make Again yours.</h2>
        <p className="mt-1 text-sm text-muted">Choose the atmosphere that feels right for your workspace.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line p-5">
          <span className="grid size-9 place-items-center rounded-xl bg-peach text-brand"><Palette className="size-4" /></span>
          <div><h3 className="text-sm font-semibold">Appearance</h3><p className="mt-0.5 text-xs text-muted">Five carefully balanced color profiles.</p></div>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_OPTIONS.map((option) => {
            const Icon = themeIcons[option.id];
            const selected = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onThemeChange(option.id)}
                className={`rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${selected ? "border-brand bg-peach/50 ring-1 ring-brand/20" : "border-line bg-panel hover:border-brand/40"}`}
              >
                <div className="mb-3 flex h-16 items-end justify-between overflow-hidden rounded-xl border border-black/5 p-2" style={{ background: option.colors[0] }}>
                  <span className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold" style={{ background: option.colors[1], color: option.brandForeground }}>
                    <Icon className="size-3.5" /> Again
                  </span>
                  <span className="flex gap-1 pb-0.5">
                    {option.colors.slice(1).map((color) => <span key={color} className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: color }} />)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-ink">{option.label}</span>
                    <span className="mt-1 block text-[10px] leading-4 text-muted">{option.description}</span>
                  </span>
                  <span className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-brand bg-brand text-brand-foreground" : "border-line text-transparent"}`}>
                    <Check className="size-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="border-t border-line px-5 py-3 text-[11px] text-muted">Your theme is saved on this device and applied across the app.</p>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line p-5"><span className="grid size-9 place-items-center rounded-xl bg-lemon text-ink"><FileJson className="size-4" /></span><div><h3 className="text-sm font-semibold">Your data</h3><p className="mt-0.5 text-xs text-muted">Everything stays in your browser, not on a server.</p></div></div>
        <div className="flex items-center justify-between gap-4 px-5 py-4"><div className="flex-1"><p className="text-sm font-medium">Backup & restore</p><p className="mt-1 text-xs leading-5 text-muted">Export tasks as JSON or restore a previous Again backup. Older Recur task backups are also accepted.</p></div><div className="flex shrink-0 gap-2"><Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}><Upload className="size-3.5" /> Import</Button><Button size="sm" onClick={exportBackup}><Download className="size-3.5" /> Export</Button><input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => void importBackup(event.target.files?.[0])} /></div></div>
        <div className="mx-5 border-t border-line" />
        <div className="flex items-center justify-between gap-4 px-5 py-4"><div className="flex-1"><p className="text-sm font-medium">Restore sample data</p><p className="mt-1 text-xs leading-5 text-muted">Replace the current list with the original demo tasks.</p></div><div className="flex shrink-0 items-center gap-1.5">{confirmReset ? <><Button size="sm" variant="destructive" onClick={handleReset}><AlertTriangle className="size-3.5" /> Confirm reset</Button><Button size="sm" variant="ghost" onClick={() => setConfirmReset(false)}>Cancel</Button></> : <Button size="sm" variant="outline" onClick={handleReset}><RotateCcw className="size-3.5" /> Reset demo</Button>}</div></div>
      </Card>

      <Card className="flex items-start gap-3 p-4"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-peach text-brand"><ShieldCheck className="size-4" /></span><div className="flex-1"><p className="text-sm font-semibold">Private by default</p><p className="mt-1 text-xs leading-5 text-muted">Again stores tasks in this browser&apos;s local storage. Clearing browser data will remove your tasks, so keep a backup if they matter.</p><p className="mt-2 text-[10px] text-muted">{tasks.length} tasks currently saved on this device.</p></div></Card>
      {message && <div role="status" className="flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 text-xs font-medium text-ink"><Check className="size-4 text-brand" />{message}<button className="ml-auto text-muted hover:text-ink" onClick={() => setMessage("")}>Dismiss</button></div>}
      <p className="text-center text-[11px] text-muted">Again · Remember what needs doing again.</p>
    </div>
  );
}
