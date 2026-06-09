import type { Metadata } from "next";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-mono/300.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "@fontsource/anek-bangla/400.css";
import "@fontsource/anek-bangla/500.css";
import "@fontsource/anek-bangla/600.css";
import { AppProviders } from "../shared/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomodoro — Focus Timer",
  description: "Minimal focus timer with Pomodoro, Stopwatch & Countdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="emerald">
      <body className="h-full overflow-hidden">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
