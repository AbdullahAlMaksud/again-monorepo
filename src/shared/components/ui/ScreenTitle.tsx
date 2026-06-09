"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ScreenTitleProps {
  accentColor: string;
}

export default function ScreenTitle({ accentColor }: ScreenTitleProps) {
  const { t } = useTranslation("common");

  return (
    <div className="mb-8 text-center">
      <motion.div
        className="text-xs uppercase tracking-[0.25em] mb-1"
        style={{ fontFamily: "var(--font-body)" }}
        animate={{ color: accentColor }}
        transition={{ duration: 0.5 }}
      >
        {t("brand")}
      </motion.div>
      <h1
        className="text-2xl font-light tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
        }}
      >
        {t("title")}
      </h1>
    </div>
  );
}
