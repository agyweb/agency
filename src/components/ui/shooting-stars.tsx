"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useEffect } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const ShootingStars: React.FC<ShootingStarsProps> = React.memo(({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const starsRef = useRef<ShootingStar[]>([]);
  const requestRef = useRef<number>();

  const getRandomStartPoint = useCallback(() => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
      case 0: return { x: offset, y: 0, angle: 45 };
      case 1: return { x: window.innerWidth, y: offset, angle: 135 };
      case 2: return { x: offset, y: window.innerHeight, angle: 225 };
      case 3: return { x: 0, y: offset, angle: 315 };
      default: return { x: 0, y: 0, angle: 45 };
    }
  }, []);

  const createStar = useCallback(() => {
    const { x, y, angle } = getRandomStartPoint();
    const newStar: ShootingStar = {
      id: Date.now(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    };
    starsRef.current.push(newStar);

    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(createStar, randomDelay);
  }, [getRandomStartPoint, maxSpeed, minSpeed, maxDelay, minDelay]);

  const moveStar = useCallback((star: ShootingStar): ShootingStar | null => {
    const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
    const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
    const newDistance = star.distance + star.speed;
    const newScale = 1 + newDistance / 100;

    if (
      newX < -20 ||
      newX > window.innerWidth + 20 ||
      newY < -20 ||
      newY > window.innerHeight + 20
    ) {
      return null;
    }

    return {
      ...star,
      x: newX,
      y: newY,
      distance: newDistance,
      scale: newScale,
    };
  }, []);

  const updateStars = useCallback(() => {
    starsRef.current = starsRef.current.reduce<ShootingStar[]>((acc, star) => {
      const updatedStar = moveStar(star);
      if (updatedStar) acc.push(updatedStar);
      return acc;
    }, []);

    if (svgRef.current) {
      const svg = svgRef.current;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      starsRef.current.forEach(star => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', star.x.toString());
        rect.setAttribute('y', star.y.toString());
        rect.setAttribute('width', (starWidth * star.scale).toString());
        rect.setAttribute('height', starHeight.toString());
        rect.setAttribute('fill', 'url(#gradient)');
        rect.setAttribute('transform', `rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`);
        svg.appendChild(rect);
      });
    }

    requestRef.current = requestAnimationFrame(updateStars);
  }, [moveStar, starWidth, starHeight]);

  useEffect(() => {
    createStar();
    requestRef.current = requestAnimationFrame(updateStars);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [createStar, updateStars]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
});

ShootingStars.displayName = 'ShootingStars';

export { ShootingStars };