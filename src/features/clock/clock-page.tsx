import { TimerApp } from "../../shared/components";
import { FullscreenClock } from "./components";

export default function ClockPage() {
  return (
    <TimerApp activeRoute="clock">
      <FullscreenClock />
    </TimerApp>
  );
}
