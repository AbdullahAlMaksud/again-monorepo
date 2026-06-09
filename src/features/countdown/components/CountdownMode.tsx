"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTimerSound } from "../../../shared/hooks";
import CountdownControls from "./CountdownControls";
import CountdownEditor from "./CountdownEditor";
import CountdownPresets from "./CountdownPresets";
import CountdownTimerView from "./CountdownTimerView";
import { formatCountdownTime } from "../config";

export default function CountdownMode() {
  const { t } = useTranslation("countdown");
  const [totalSeconds, setTotalSeconds] = useState(600);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editH, setEditH] = useState("00");
  const [editM, setEditM] = useState("10");
  const [editS, setEditS] = useState("00");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { playStart, playTick, notifyCompletion } = useTimerSound();

  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const { h, m, sec } = formatCountdownTime(timeLeft);
  const showHours = totalSeconds >= 3600;

  const stopInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const applyCustomTime = useCallback(() => {
    const hrs = Number.parseInt(editH, 10) || 0;
    const mins = Number.parseInt(editM, 10) || 0;
    const secs = Number.parseInt(editS, 10) || 0;
    const total = hrs * 3600 + mins * 60 + secs;

    if (total > 0) {
      setTotalSeconds(total);
      setTimeLeft(total);
    }
    setIsEditing(false);
    setIsRunning(false);
  }, [editH, editM, editS]);

  const handlePreset = useCallback(
    (seconds: number) => {
      setTotalSeconds(seconds);
      setTimeLeft(seconds);
      setIsRunning(false);
      stopInterval();
    },
    [stopInterval],
  );

  const handleStartStop = useCallback(() => {
    if (timeLeft === 0) return;
    if (!isRunning) playStart();
    setIsRunning((value) => !value);
  }, [isRunning, timeLeft, playStart]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    stopInterval();
    setTimeLeft(totalSeconds);
  }, [stopInterval, totalSeconds]);

  const openEdit = useCallback(() => {
    const current = formatCountdownTime(timeLeft || totalSeconds);
    setEditH(current.h);
    setEditM(current.m);
    setEditS(current.sec);
    setIsEditing(true);
    setIsRunning(false);
  }, [timeLeft, totalSeconds]);

  useEffect(() => {
    if (!isRunning) {
      stopInterval();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          stopInterval();
          setIsRunning(false);
          notifyCompletion(t("complete"));
          return 0;
        }
        if (current % 60 === 0) playTick();
        return current - 1;
      });
    }, 1000);

    return stopInterval;
  }, [isRunning, playTick, notifyCompletion, stopInterval, t]);

  return (
    <div className="flex flex-col items-center gap-8 select-none">
      <CountdownPresets totalSeconds={totalSeconds} onPreset={handlePreset} />

      <AnimatePresence mode="wait">
        {isEditing ? (
          <CountdownEditor
            editH={editH}
            editM={editM}
            editS={editS}
            onApply={applyCustomTime}
            onCancel={() => setIsEditing(false)}
            setEditH={setEditH}
            setEditM={setEditM}
            setEditS={setEditS}
          />
        ) : (
          <CountdownTimerView
            h={h}
            isRunning={isRunning}
            m={m}
            onEdit={openEdit}
            progress={progress}
            sec={sec}
            showHours={showHours}
            timeLeft={timeLeft}
          />
        )}
      </AnimatePresence>

      {!isEditing && (
        <CountdownControls
          isRunning={isRunning}
          onEdit={openEdit}
          onReset={handleReset}
          onStartStop={handleStartStop}
          timeLeft={timeLeft}
          totalSeconds={totalSeconds}
        />
      )}
    </div>
  );
}
