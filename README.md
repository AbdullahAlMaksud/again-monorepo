# Pomodoro App

A minimal focus timer with Pomodoro, Stopwatch, Countdown, and Clock — built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- **Pomodoro** — Focus sessions with customizable durations (presets: 10, 15, 20, 25, 30, 45, 60 min or custom)
- **Stopwatch** — Lap-capable stopwatch
- **Countdown** — Configurable countdown timer with presets
- **Clock** — Full-screen analog/digital clock
- **Themes** — Emerald, Dark, Light, Nature Green Light, Natural Green (press `D` to cycle)
- **i18n** — English and Bengali (Anek Bangla font for Bengali)
- **Keyboard shortcut** — Press `D` to cycle through themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Route | Page |
|-------|------|
| `/` | Clock |
| `/pomodoro` | Pomodoro Timer |
| `/stopwatch` | Stopwatch |
| `/countdown` | Countdown |

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide React](https://lucide.dev)
- [i18next](https://www.i18next.com) / [react-i18next](https://react.i18next.com)
