"use client";

import { motion } from "framer-motion";

interface TimerRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color: string;
  isRunning: boolean;
  children?: React.ReactNode;
}

export default function TimerRing({
  progress,
  size = 280,
  strokeWidth = 2.5,
  color,
  isRunning,
  children,
}: TimerRingProps) {
  const radius = (size - strokeWidth * 2) / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const center = size / 2;
  const stable = (value: number) => Number(value.toFixed(4));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={
          isRunning
            ? {
                boxShadow: [
                  `0 0 0px 0px transparent`,
                  `0 0 40px 8px ${color}22`,
                  `0 0 0px 0px transparent`,
                ],
              }
            : { boxShadow: `0 0 0px 0px transparent` }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          opacity={0.5}
        />

        {/* Tick marks */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i / 60) * 2 * Math.PI;
          const isMajor = i % 5 === 0;
          const innerR = radius - (isMajor ? 10 : 6);
          const outerR = radius - 2;
          return (
            <line
              key={i}
              x1={stable(center + Math.cos(angle) * innerR)}
              y1={stable(center + Math.sin(angle) * innerR)}
              x2={stable(center + Math.cos(angle) * outerR)}
              y2={stable(center + Math.sin(angle) * outerR)}
              stroke="var(--text-faint)"
              strokeWidth={isMajor ? 1.2 : 0.5}
              opacity={isMajor ? 0.7 : 0.3}
            />
          );
        })}

        {/* Progress arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />

        {/* Progress dot */}
        {progress > 0.01 && (
          <motion.circle
            cx={stable(center + Math.cos((-Math.PI / 2) + (2 * Math.PI * progress)) * radius)}
            cy={stable(center + Math.sin((-Math.PI / 2) + (2 * Math.PI * progress)) * radius)}
            r={strokeWidth * 2.2}
            fill={color}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
              transform: "rotate(90deg)",
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
