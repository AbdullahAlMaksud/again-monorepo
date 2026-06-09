import { TimerApp } from "../../shared/components";
import { PomodoroMode } from "./components";

export default function PomodoroPage() {
  return (
    <TimerApp activeRoute="pomodoro">
      <PomodoroMode />
    </TimerApp>
  );
}
