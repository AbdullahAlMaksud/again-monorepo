"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  pulseOffset: number;
  pulseSpeed: number;
}

interface Ribbon {
  y: number;
  amplitude: number;
  speed: number;
  offset: number;
  width: number;
}

interface BackgroundCanvasProps {
  accentColor: string;
}

export default function BackgroundCanvas({ accentColor }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ribbonsRef = useRef<Ribbon[]>([]);
  const animRef = useRef<number>(0);
  const colorRef = useRef(accentColor);

  useEffect(() => {
    colorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ribbonsRef.current = ribbonsRef.current.map((ribbon, index) => ({
        ...ribbon,
        y: window.innerHeight * (0.2 + index * 0.15),
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 72;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      size: Math.random() * 1.8 + 0.35,
      opacity: 0,
      baseOpacity: Math.random() * 0.24 + 0.05,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.005 + 0.002,
    }));

    ribbonsRef.current = Array.from({ length: 5 }, (_, index) => ({
      y: window.innerHeight * (0.2 + index * 0.15),
      amplitude: 28 + index * 10,
      speed: 0.00012 + index * 0.000035,
      offset: Math.random() * Math.PI * 2,
      width: 72 + index * 18,
    }));

    const hexToRgb = (hex: string) => {
      const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (!match) return { r: 212, g: 168, b: 67 };
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      };
    };

    const parseColor = (color?: string) => {
      if (!color) return { r: 212, g: 168, b: 67 };
      if (color.startsWith("#")) return hexToRgb(color);
      if (color === "amber") return { r: 212, g: 168, b: 67 };
      if (color === "green") return { r: 109, g: 186, b: 127 };
      if (color === "blue") return { r: 122, g: 163, b: 200 };
      return { r: 212, g: 168, b: 67 };
    };

    const drawRibbon = (
      ribbon: Ribbon,
      rgb: { r: number; g: number; b: number },
      w: number,
      ts: number,
      index: number,
    ) => {
      const drift = Math.sin(ts * ribbon.speed + ribbon.offset) * ribbon.amplitude;
      const baseY = ribbon.y + drift;

      const gradient = ctx.createLinearGradient(0, baseY - ribbon.width, 0, baseY + ribbon.width);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.035 + index * 0.006})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(-40, baseY);

      for (let x = -40; x <= w + 40; x += 32) {
        const wave =
          Math.sin(x * 0.006 + ts * ribbon.speed * 5 + ribbon.offset) * ribbon.amplitude +
          Math.sin(x * 0.014 - ts * ribbon.speed * 3) * (ribbon.amplitude * 0.32);
        ctx.lineTo(x, baseY + wave);
      }

      ctx.lineTo(w + 40, baseY + ribbon.width);
      ctx.lineTo(-40, baseY + ribbon.width);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgb = parseColor(colorRef.current);
      const w = canvas.width;
      const h = canvas.height;

      const ambient = ctx.createLinearGradient(0, 0, w, h);
      ambient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.045)`);
      ambient.addColorStop(0.42, "rgba(255,255,255,0.012)");
      ambient.addColorStop(1, "rgba(14,14,15,0.1)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, w, h);

      ribbonsRef.current.forEach((ribbon, index) => drawRibbon(ribbon, rgb, w, ts, index));

      particlesRef.current.forEach((p) => {
        const flow = Math.sin((p.y + ts * 0.012) * 0.01) * 0.025;
        p.x += p.vx;
        p.y += p.vy + flow;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        p.opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(ts * p.pulseSpeed + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw soft connections
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.05;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Soft radial vignette overlay at center
      const cx = w / 2;
      const cy = h / 2;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
      gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.025)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
