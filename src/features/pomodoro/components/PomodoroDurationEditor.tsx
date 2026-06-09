"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  clampMinutes,
  POMODORO_PHASE_KEYS,
  POMODORO_PHASES,
  type PomodoroPhase,
} from "../config";

const PRESET_MINUTES = [1, 5, 10, 15, 20, 25, 30, 45, 60];

interface PomodoroDurationEditorProps {
  durations: Record<PomodoroPhase, number>;
  phase: PomodoroPhase;
  onDurationChange: (phase: PomodoroPhase, value: string) => void;
}

function PhaseSelect({
  item,
  value,
  isActive,
  onChange,
  label,
  ariaLabel,
}: {
  item: PomodoroPhase;
  value: number;
  isActive: boolean;
  onChange: (val: string) => void;
  label: string;
  ariaLabel: string;
}) {
  const accentColor = POMODORO_PHASES[item].color;
  const isCustom = !PRESET_MINUTES.includes(value);
  const [customValue, setCustomValue] = useState(isCustom ? value : 25);
  const selectVal = isCustom ? "custom" : String(value);

  function handleSelectChange(val: string) {
    if (val === "custom") {
      onChange(String(customValue));
    } else {
      onChange(val);
    }
  }

  return (
    <label
      className="flex flex-col items-center gap-1.5 rounded-xl border p-2"
      style={{
        borderColor: isActive ? accentColor : "var(--border)",
        background: isActive ? `${accentColor}12` : "var(--surface-2)",
      }}
    >
      <span
        className="text-[0.62rem] font-medium uppercase tracking-wider"
        style={{
          color: isActive ? accentColor : "var(--text-faint)",
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
      </span>

      <Select value={selectVal} onValueChange={handleSelectChange}>
        <SelectTrigger
          className="h-8 w-full rounded-lg border text-center text-sm font-semibold outline-none focus:ring-0 focus:ring-offset-0 px-2"
          style={{
            background: "rgba(0,0,0,0.25)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
          }}
          aria-label={ariaLabel}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          {PRESET_MINUTES.map((m) => (
            <SelectItem key={m} value={String(m)}>
              {m} min
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {selectVal === "custom" && (
        <input
          type="number"
          min={1}
          max={180}
          value={customValue}
          onChange={(e) => {
            const n = Number.parseInt(e.currentTarget.value, 10);
            setCustomValue(Number.isFinite(n) ? n : 1);
          }}
          onBlur={(e) => {
            const clamped = clampMinutes(
              Number.parseInt(e.currentTarget.value, 10),
            );
            setCustomValue(clamped);
            onChange(String(clamped));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          placeholder="min"
          className="h-7 w-full rounded-lg border text-center text-xs font-semibold outline-none transition-colors focus:border-current mt-0.5"
          style={{
            background: "rgba(0,0,0,0.25)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
          }}
          aria-label={`${ariaLabel} custom minutes`}
        />
      )}
    </label>
  );
}

export default function PomodoroDurationEditor({
  durations,
  phase,
  onDurationChange,
}: PomodoroDurationEditorProps) {
  const { t } = useTranslation("pomodoro");

  return (
    <div
      className="grid w-full max-w-xs grid-cols-3 gap-2 rounded-2xl p-2"
      style={{ background: "var(--surface)" }}
    >
      {POMODORO_PHASE_KEYS.map((item) => (
        <PhaseSelect
          key={item}
          item={item}
          value={durations[item]}
          isActive={phase === item}
          onChange={(val) => onDurationChange(item, val)}
          label={t(`shortPhases.${item}`)}
          ariaLabel={`${t(`phases.${item}`)} minutes`}
        />
      ))}
    </div>
  );
}
