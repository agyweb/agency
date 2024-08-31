"use client";
import React from "react";

import { cn } from "@/lib/utils";

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  buttonOverlayColor?: string;
  iconColor?: string;
  className?: string;
}

export default function ArrowButton({
  textColor = "white",
  buttonOverlayColor = "#0D0E13",
  iconColor = "white",
  className,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex size-24 items-center justify-center overflow-hidden rounded-full bg-black font-medium shadow-md transition duration-300 ease-out sm:size-28 md:size-32 lg:size-36",
        className,
      )}
    >
      <span
        style={{ background: buttonOverlayColor }}
        className={cn(
          "ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-purple-400 text-white duration-300 group-hover:translate-x-0",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="34"
          viewBox="0 0 37 34"
          fill="none"
          className="it:size-8 size-6 sm:size-9 md:size-10 lg:size-12"
        >
          <path
            d="M1.17306 32.9588C1.17306 32.9588 19.2543 16.174 35.5617 1.03601M35.5617 1.03601C23.7813 11.9716 10.4339 1.9542 10.4339 1.9542M35.5617 1.03601C23.7813 11.9716 32.7798 26.0262 32.7798 26.0262"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </span>

      <span
        style={{ color: textColor }}
        className={cn(
          "absolute flex h-full w-full transform items-center justify-center font-bold transition-all duration-300 ease-in-out group-hover:translate-x-full",
        )}
      >
        <div className="flex flex-col items-center text-xs font-medium leading-tight tracking-wider sm:text-sm md:text-base lg:text-lg">
          <span>LET’S</span>
          <span>TALK</span>
        </div>
      </span>
    </button>
  );
}
