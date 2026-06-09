# Pomodoro App

> A minimal, themeable focus timer — built with Next.js 16, Tailwind CSS v4, and shadcn/ui.

---

## Features

| Feature | Details |
|---------|---------|
| **Pomodoro** | Focus sessions with auto-cycling (25 min focus → 5 min short break → 30 min long break after 4 sessions) |
| **Stopwatch** | Lap-capable stopwatch |
| **Countdown** | Configurable countdown with presets |
| **Clock** | Full-screen digital clock with locale-aware formatting |
| **Themes** | Emerald · Dark · Light · Nature Green Light · Natural Green — press `D` to cycle |
| **i18n** | English & Bengali (Anek Bangla font for Bengali UI) |

---

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Routes

| Route | Page |
|-------|------|
| `/` | Clock |
| `/pomodoro` | Pomodoro Timer |
| `/stopwatch` | Stopwatch |
| `/countdown` | Countdown |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `D` | Cycle through themes |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── features/             # Feature modules (pomodoro, clock, stopwatch, countdown)
└── shared/
    ├── components/
    │   └── ui/           # shadcn/ui primitives + app UI components
    ├── hooks/
    ├── i18n/             # i18next setup + en/bn locale files
    ├── lib/              # Utility functions (cn, etc.)
    ├── navigation/
    ├── providers/
    └── theme/            # Theme provider + config
```

---

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) — Accessible component primitives
- [Framer Motion](https://www.framer.com/motion) — Animations
- [Lucide React](https://lucide.dev) — Icons
- [i18next](https://www.i18next.com) / [react-i18next](https://react.i18next.com) — Internationalisation
- [Bun](https://bun.sh) — Package manager & runtime
