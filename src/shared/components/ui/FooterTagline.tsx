"use client";

import { useTranslation } from "react-i18next";

export default function FooterTagline() {
  const { t } = useTranslation("common");

  return (
    <div
      className="fixed bottom-6 left-0 right-0 flex justify-center"
      style={{
        color: "var(--text-faint)",
        fontFamily: "var(--font-body)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
      }}
    >
      {t("footer")}
    </div>
  );
}
