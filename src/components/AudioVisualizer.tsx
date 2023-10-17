import { useEffect, useRef, useMemo, useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioTime from "../hooks/useAudioTime";

interface AudioVisualizerProps {
  peaks: number[];
  className?: string;
}

const numBars = 20;
const barGap = 2;

function AudioVisualizer({ peaks, className }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameIdRef = useRef(0);
  const pos = useAudioTime();
  const { duration } = useGlobalAudioPlayer();
  const maxPeakValue = useMemo(() => Math.max(...peaks), [peaks]);

  const drawWaveform = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const visiblePeaksStart = Math.floor((pos / duration) * peaks.length);
      const visiblePeaks = peaks.slice(
        visiblePeaksStart,
        visiblePeaksStart + numBars,
      );
      const barWidth = (canvasWidth - barGap * numBars) / numBars;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#c5c6c7";

      for (let i = 0; i < visiblePeaks.length; i++) {
        const barHeight = (visiblePeaks[i] / maxPeakValue) * canvasHeight;

        ctx.fillRect(
          i * (barWidth + barGap),
          canvasHeight - barHeight,
          barWidth,
          barHeight,
        );
      }

      animationFrameIdRef.current = requestAnimationFrame(() =>
        drawWaveform(canvas, ctx),
      );
    },
    [peaks, pos, duration, maxPeakValue],
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      ctxRef.current = canvas.getContext("2d");
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    // Initial call to start the animation
    drawWaveform(canvas, ctx);

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [drawWaveform]);

  return <canvas ref={canvasRef} className={className} />;
}

export default AudioVisualizer;
