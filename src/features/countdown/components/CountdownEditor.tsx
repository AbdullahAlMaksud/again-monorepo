"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { COUNTDOWN_COLOR } from "../config";

interface CountdownEditorProps {
  editH: string;
  editM: string;
  editS: string;
  onApply: () => void;
  onCancel: () => void;
  setEditH: (value: string) => void;
  setEditM: (value: string) => void;
  setEditS: (value: string) => void;
}

export default function CountdownEditor({
  editH,
  editM,
  editS,
  onApply,
  onCancel,
  setEditH,
  setEditM,
  setEditS,
}: CountdownEditorProps) {
  const { t } = useTranslation("common");
  const fields = [
    { val: editH, set: setEditH, label: "HH" },
    { val: editM, set: setEditM, label: "MM" },
    { val: editS, set: setEditS, label: "SS" },
  ];

  return (
    <motion.div
      key="edit"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center gap-6"
      style={{ width: 280 }}
    >
      <div className="flex items-center gap-2">
        {fields.map((field, index) => (
          <div key={field.label} className="flex flex-col items-center gap-1">
            <input
              type="number"
              value={field.val}
              min={0}
              max={index === 0 ? 99 : 59}
              onChange={(event) => field.set(event.target.value.slice(-2).padStart(2, "0"))}
              className="w-16 h-16 text-center text-2xl rounded-xl outline-none border transition-colors focus:border-current"
              style={{
                fontFamily: "var(--font-display)",
                background: "var(--surface-2)",
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
              onFocus={(event) => {
                event.target.style.borderColor = COUNTDOWN_COLOR;
                event.currentTarget.select();
              }}
              onBlur={(event) => {
                event.target.style.borderColor = "var(--border)";
              }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-body)" }}
            >
              {field.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-lg text-sm transition-opacity hover:opacity-70"
          style={{
            background: "var(--surface-2)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {t("actions.cancel")}
        </button>
        <button
          onClick={onApply}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            background: COUNTDOWN_COLOR,
            color: "#0e0e0f",
            fontFamily: "var(--font-body)",
          }}
        >
          {t("actions.setTime")}
        </button>
      </div>
    </motion.div>
  );
}
