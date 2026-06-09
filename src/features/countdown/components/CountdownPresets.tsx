"use client";

import { useTranslation } from "react-i18next";
import { COUNTDOWN_COLOR, COUNTDOWN_PRESETS } from "../config";

interface CountdownPresetsProps {
  totalSeconds: number;
  onPreset: (seconds: number) => void;
}

export default function CountdownPresets({ totalSeconds, onPreset }: CountdownPresetsProps) {
  const { t } = useTranslation("countdown");

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {COUNTDOWN_PRESETS.map((preset) => (
        <button
          key={preset.seconds}
          onClick={() => onPreset(preset.seconds)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            fontFamily: "var(--font-body)",
            background: totalSeconds === preset.seconds ? "var(--surface-2)" : "transparent",
            color: totalSeconds === preset.seconds ? COUNTDOWN_COLOR : "var(--text-muted)",
            border: `1px solid ${
              totalSeconds === preset.seconds ? "var(--border)" : "transparent"
            }`,
          }}
        >
          {t(`presets.${preset.seconds}`)}
        </button>
      ))}
    </div>
  );
}
