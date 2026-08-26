"use client";

import { useEffect, useRef } from "react";

const SPACING = 30;
const DOT_RADIUS = 1.6;
const ACTIVE_RADIUS = 2.4;
const BAND_WIDTH = 0.14;
const CYCLE_SECONDS = 6.5;

/**
 * A plain rectilinear dot grid with a diagonal band of brightness sweeping
 * across it on a loop, like light passing over the surface. Canvas-based
 * rather than SVG/DOM: with ~1-2k dots redrawn every frame, a single
 * bitmap surface is far cheaper than that many individually-animated
 * nodes (the tradeoff the previous concentric-ring version could take
 * since it only ever needed one shared `rotate` transform for the whole
 * group — a per-dot wave can't do that).
 */
export default function DotGridWave({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let visible = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    function resize() {
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      const diag = Math.hypot(width, height) || 1;
      // Sweeps from just off the top-left corner to just off the
      // bottom-right, so the band always fully enters and exits rather
      // than popping in/out mid-frame.
      const waveT = reducedMotion ? 0.5 : ((t / 1000 / CYCLE_SECONDS) % 1.4) - 0.2;

      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const x = cx * SPACING;
          const y = cy * SPACING;
          const phase = (x + y) / diag;
          const dist = Math.abs(phase - waveT);
          const glow = Math.max(0, 1 - dist / BAND_WIDTH);

          const opacity = 0.07 + glow * 0.56;
          const radius = DOT_RADIUS + glow * (ACTIVE_RADIUS - DOT_RADIUS);

          ctx!.fillStyle =
            glow > 0.35 ? `rgba(245, 166, 35, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
          ctx!.beginPath();
          ctx!.arc(x, y, radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (!reducedMotion && visible) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    }

    function start() {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    // The per-dot redraw used to run forever regardless of scroll position —
    // real, continuous main-thread cost competing with Lenis/ScrollTrigger
    // on every frame even while this section was scrolled far out of view.
    // Only spend that cost while the canvas is actually on/near screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(canvas);

    if (reducedMotion) {
      draw(0);
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
