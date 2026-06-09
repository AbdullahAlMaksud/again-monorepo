import { TimerApp } from "../../shared/components";
import { CountdownMode } from "./components";

export default function CountdownPage() {
  return (
    <TimerApp activeRoute="countdown">
      <CountdownMode />
    </TimerApp>
  );
}
