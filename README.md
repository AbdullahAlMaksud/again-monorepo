# Ghorial — Minimalist Focus Timer & Productivity Suite

A clean, distraction-free focus timer, digital clock, and productivity companion built with Next.js 16, React 19, Tailwind CSS v4, and native Bengali & English typography.

<p align="left">
  <img src="https://img.shields.io/badge/pnpm-11.18.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <img width="49%" alt="Photocard Studio screenshot 2" src="https://github.com/user-attachments/assets/f90a442e-3204-493e-9403-67488de48ff8" />
  <img width="49%" alt="Photocard Studio screenshot 1" src="https://github.com/user-attachments/assets/42db3298-abcb-45f8-b8b8-26e4e3d1a9ee" />
</p>
<!-- <img width="1919" height="1079" alt="image" src="" /><img width="1919" height="1079" alt="image" src="" /> -->


---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

**Ghorial (ঘড়িয়াল)** is an open-source productivity web application designed to help you maintain focus, track your time, and build better work habits without unnecessary distractions.

Inspired by classical minimalism and modern Swiss design principles, Ghorial combines a Pomodoro timer, precision lap stopwatch, flexible countdown timer, and minimalist digital clock in one cohesive interface. It provides responsive client-side interactions, synthesized audio feedback, and bilingual support for English and Bengali speakers.

## Features

### 1. Pomodoro Timer

- **Automatic Cycle Progression:** Automatically alternate between focus sessions (25 minutes by default) and short breaks (5 minutes). After four focus sessions, transition into a 30-minute long break.
- **Customizable Intervals:** Adjust focus, short-break, and long-break durations.
- **Visual Session Dots:** Track completed focus sessions within each four-session cycle.
- **Circular Progress Meter:** Visualize the remaining time through a smooth SVG progress ring.
- **Quick Controls:** Start, pause, and reset the timer.

### 2. Lap Stopwatch

- **Precision Time Tracking:** Display minutes, seconds, and hundredths of a second.
- **Lap Recording:** Record split times and compare individual laps.
- **Fastest and Slowest Lap Highlighting:** Identify personal best and slowest laps using color-coded indicators.
- **Scrollable Lap Log:** Review recorded lap times.

### 3. Countdown Timer

- **Configurable Durations:** Set hours, minutes, and seconds.
- **Quick Presets:** Choose common durations, including 5, 10, 15, 25, 45, and 60 minutes.
- **Audio Alarm:** Play a synthesized bell chime when the countdown finishes.

### 4. Digital Clock

- **Minimalist Full-Screen Display:** Display the time without unnecessary distractions.
- **12-Hour and 24-Hour Modes:** Switch between AM/PM and 24-hour formats.
- **Localized Date and Numerals:** Display dates and numerals in English or Bengali.
- **Animated Colon Separator:** Add a subtle animation to the clock's time separator.

### Themes

Ghorial features five color themes designed for different environments and preferences.

| Theme | Description |
| --- | --- |
| **Emerald** | A deep, dark background with radiant mint and emerald accents. Default theme. |
| **Dark** | Monochromatic slate and neutral gray tones for nighttime focus. |
| **Light** | A crisp, high-contrast white and stone palette for bright environments. |
| **Nature Green Light** | Soft matcha and botanical pastel tones on a paper-like background. |
| **Natural Green** | Rich forest green and earthy, organic colors. |

**Theme Shortcut:** Press `D` anywhere in the application to cycle through the available themes.

### Bilingual Typography & Internationalization

- **English and Bengali Support:** Switch between English and Bengali (বাংলা).
- **Curated Typography:** DM Sans for English interface text, DM Mono for tabular numbers, and Anek Bangla for Bengali typography.
- **Localized Numerals:** Convert between Arabic numerals (`0–9`) and Bengali digits (`০–৯`).

### Audio & Desktop Notifications

- **Synthesized Audio:** Generate sounds using the browser's native Web Audio API (`AudioContext`), without external audio files.
- **Optional Ticking Sounds:** Enable rhythmic audio feedback during minute transitions.
- **Browser Notifications:** Receive notifications when focus sessions or breaks end, even when working in another tab or window.

### Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `D` | Cycle through available themes. |
| `F` | Toggle full-screen mode. |
| `Space` | Start or pause the active timer. |

## Tech Stack

- **Package Manager:** [pnpm](https://pnpm.io/) — Fast, disk-space-efficient package management.
- **Framework:** [Next.js 16](https://nextjs.org/) — App Router, Server Components, and Turbopack.
- **Language:** [TypeScript](https://www.typescriptlang.org/) — Static type checking and type safety.
- **Core Library:** [React 19](https://react.dev/) — Modern UI rendering and React APIs.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first utility-based styling.
- **UI Primitives:** [Radix UI](https://www.radix-ui.com/) — Accessible, unstyled component primitives.
- **Animation:** [Framer Motion](https://www.framer.com/motion/) — Layout transitions and micro-interactions.
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/) — Lightweight smooth-scrolling engine.
- **Internationalization:** [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) — Client-side translation and language management.
- **Typography:** [Fontsource](https://fontsource.org/) — Self-hosted DM Sans, DM Mono, and Anek Bangla fonts.
- **Icons:** [Lucide React](https://lucide.dev/) — Lightweight, consistent vector icons.


## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v20.x or later
- [pnpm](https://pnpm.io/installation) v10.x or v11.x

Install pnpm globally if needed:

```bash
npm install -g pnpm
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/AbdullahAlMaksud/ghorial-web.git
cd ghorial-web
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment variables (If Needed)**

Create a `.env.local` file in the project root and configure the required variables using `.env.example` as your reference, if your local setup requires it.

See [Environment Variables](#environment-variables) for details.

**4. Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Ghorial uses environment variables to configure application services and external integrations.

1. Create a `.env.local` file in the project root.
2. Review `.env.example` for available variables and their intended use.
3. Configure the required settings for MongoDB Atlas and GitHub API integration, as applicable.
4. Keep credentials and access tokens private.

Never commit your real `.env.local` file or expose private credentials in client-side code.

### Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server with Turbopack. |
| `pnpm build` | Compile an optimized production build. |
| `pnpm start` | Run the compiled production build locally. |
| `pnpm lint` | Run ESLint to check code quality and style. |

### Project Structure

```text
ghorial-web/
├── public/                     # Static assets and icons
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── clock/              # Digital clock route
│   │   ├── countdown/          # Countdown timer route
│   │   ├── pomodoro/           # Pomodoro timer route
│   │   ├── stopwatch/          # Stopwatch route
│   │   ├── globals.css         # Global styles and theme tokens
│   │   ├── layout.tsx          # Root layout and font imports
│   │   └── page.tsx            # Entry page
│   ├── features/               # Feature-specific modules
│   │   ├── clock/              # Clock components, formatters, and hooks
│   │   ├── countdown/          # Countdown state and presets
│   │   ├── pomodoro/           # Pomodoro phases, cycle dots, and editors
│   │   └── stopwatch/          # Stopwatch and lap recording
│   └── shared/                 # Shared utilities and application modules
│       ├── components/         # UI primitives and application shell
│       ├── hooks/              # Shared hooks, including timer sounds
│       ├── i18n/               # i18next configuration and translations
│       ├── lib/                # Utility helpers and formatters
│       ├── navigation/         # Navigation links and sidebar configuration
│       ├── providers/           # Theme, i18n, and audio providers
│       └── theme/               # Theme registry and cycling logic
├── package.json                # Project manifest and dependencies
├── pnpm-lock.yaml              # pnpm dependency lockfile
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

### Deployment

Ghorial can be deployed to [Vercel](https://vercel.com/) or another hosting platform that supports Next.js.

Before deploying, configure the environment variables required by your chosen storage integrations and ensure that the database and GitHub API settings are correct.

To build and run the production application:

```bash
pnpm build
pnpm start
```

For platform-specific instructions, consult the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).

## Contributing

Contributions are welcome and greatly appreciated. Whether you're fixing a bug, improving an existing feature, or proposing a new idea, your contributions help make Ghorial better.

1. Fork the project.
2. Create a feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m "feat: add some AmazingFeature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```

5. Open a pull request.

## License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

## Contact

**Abdullah Al Maksud**

- **Email:** [maksud.workspace@gmail.com](mailto:maksud.workspace@gmail.com)
- **Website:** [abdullahalmaksud.com](https://abdullahalmaksud.com)
- **LinkedIn:** [@AbdullahAlMaksud](https://linkedin.com/in/AbdullahAlMaksud)
- **GitHub:** [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)

---

<p align="center">
  Crafted with care for focused work and intentional living.
</p>
