# 📱 Again — Mobile App

Cross-platform mobile companion for the **Again** recurring task tracking platform, built with **Expo (React Native)** and **TypeScript**.

<p align="left">
  <img src="https://img.shields.io/badge/Bun-Strict-fbf0df?style=for-the-badge&logo=bun&logoColor=black" alt="Bun" />
  <img src="https://img.shields.io/badge/Expo-v52-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Overview

The `mobile-app` workspace brings Again's local-first recurring task tracker to mobile devices (iOS & Android).

### Key Features
- **Offline-First Storage**: Local SQLite database for instant, zero-latency task management.
- **Home Screen Widgets**: iOS and Android widgets displaying tasks due today.
- **Native Notifications**: Local push reminders when maintenance intervals are reached.
- **Cloud Sync**: Seamless background synchronization with `server/`.

---

## 📦 Package Manager Policy

> [!IMPORTANT]
> In accordance with the monorepo package policy, always use **[Bun](https://bun.sh)** (`bun`) inside `mobile-app`.

```bash
cd mobile-app

# Install dependencies
bun install

# Start development server
bun start

# Run on Android
bun run android

# Run on iOS
bun run ios
```

---

## 📄 License

MIT License.
