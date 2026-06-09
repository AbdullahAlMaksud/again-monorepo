import { TimerApp } from "../../shared/components";
import { StopwatchMode } from "./components";

export default function StopwatchPage() {
  return (
    <TimerApp activeRoute="stopwatch">
      <StopwatchMode />
    </TimerApp>
  );
}
