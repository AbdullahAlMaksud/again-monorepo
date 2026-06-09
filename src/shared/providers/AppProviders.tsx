"use client";

import type { ReactNode } from "react";
import I18nProvider from "../i18n/I18nProvider";
import { ThemeProvider } from "../theme";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}
