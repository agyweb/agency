"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useCallback, useLayoutEffect } from "react";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number | null;
  twinkleStart: number;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = React.memo(({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarProps[]>([]);
  const animationRef = useRef<number>();

  const generateStars = useCallback((width: number, height: number): StarProps[] => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.05 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
          : null,
        twinkleStart: Math.random() * 1000,
      };
    });
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  const renderStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height);
    starsRef.current.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      let opacity = star.baseOpacity;
      if (star.twinkleSpeed !== null) {
        const twinkleProgress = ((time - star.twinkleStart) % (star.twinkleSpeed * 1000)) / (star.twinkleSpeed * 1000);
        opacity = star.baseOpacity * (0.3 + 0.7 * Math.abs(Math.sin(twinkleProgress * Math.PI)));
      }
      
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fill();
    });
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderStars(ctx, canvas.width, canvas.height, time);
    animationRef.current = requestAnimationFrame(animate);
  }, [renderStars]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      starsRef.current = generateStars(width, height);
    };

    updateCanvasSize();
    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [generateStars, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
});

StarsBackground.displayName = 'StarsBackground';