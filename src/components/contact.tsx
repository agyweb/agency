"use client";

import React, { useEffect, useRef, useState } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";
import {
  Transition,
  Variants,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import Image from "next/image";

const variants: Variants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
  },
};

const transition: Transition = {
  duration: 1,
  ease: "easeInOut",
};

export const MyComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const [isNearView, setIsNearView] = useState(false);

  const createGradient = () => {
    if (canvasRef.current && !gradientRef.current) {
      console.log("Creating NeatGradient for MyComponent");
      gradientRef.current = new NeatGradient({
        ref: canvasRef.current,
        colors: [
          {
            color: "#0D0E13",
            enabled: true,
          },
          {
            color: "#FF6314",
            enabled: true,
          },
          {
            color: "#0D0E13",
            enabled: true,
          },
          {
            color: "#FF6314",
            enabled: true,
          },
          {
            color: "#FF6314",
            enabled: true,
          },
        ],
        speed: 4,
        horizontalPressure: 2,
        verticalPressure: 2,
        waveFrequencyX: 1,
        waveFrequencyY: 2,
        waveAmplitude: 7,
        shadows: 4,
        highlights: 5,
        colorBrightness: 1,
        colorSaturation: 2,
        wireframe: false,
        colorBlending: 5,
        backgroundColor: "#FF6314",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }
  };

  const destroyGradient = () => {
    if (gradientRef.current) {
      console.log("Destroying NeatGradient for MyComponent");
      gradientRef.current.destroy();
      gradientRef.current = null;
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: "500px 0px 500px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsNearView(true);
          console.log("Component is near view");
        } else {
          setIsNearView(false);
          console.log("Component is far from view");
        }
      });
    }, options);

    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (isNearView) {
      createGradient();
    } else {
      destroyGradient();
    }
  }, [isNearView]);

  useEffect(() => {
    return () => {
      destroyGradient();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-svh w-full text-black">
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isNearView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute size-full bg-white"
        style={{ isolation: "isolate" }}
      />
      <div className="box relative z-50 h-full">
        <div className="h-full py-24 text-left text-white">
          <div className="flex h-full w-full flex-col justify-center">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                  {" "}
                  <Image
                    src={"/logo-white.png"}
                    alt="agyweb logo"
                    quality={100}
                    width={20}
                    height={20}
                    className={"!size-7"}
                  />
                  agyweb
                </div>

                <div className="flex items-center gap-x-5">
                  <div className="underline_hover after:h-[1px] after:-bottom-1">LinkedIn</div>
                  <div className="underline_hover after:h-[1px] after:-bottom-1">Instagram</div>
                  <div className="underline_hover after:h-[1px] after:-bottom-1">Dribble</div>
                  <div className="underline_hover after:h-[1px] after:-bottom-1">X/Twitter</div>
                </div>
              </div>
              <div className="group relative flex cursor-pointer items-end justify-between underline_hover">
                <div className="space-y-7 ">
                  <p className="pl-[6px] font-satoshi text-[15px] tracking-tighter">
                    Got a project in mind ?
                  </p>
                  <div className="text-8xl font-bold tracking-tight">
                    {/* LET&apos;S TALK */}
                    CONTACT US
                  </div>
                </div>
                <div className="mb-3 group-hover:rotate-[40deg] group-hover:-translate-x-2 transition-all duration-300 ">
                  <svg
                    width="85"
                    height="74"
                    viewBox="0 0 85 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.20399 69.3437C4.20399 69.3437 44.5769 35.961 80.9889 5.85356M80.9889 5.85356C54.6851 27.603 27.6258 4.76412 27.6258 4.76412M80.9889 5.85356C54.6851 27.603 72.0338 58.4712 72.0338 58.4712"
                      stroke="#fff"
                      strokeWidth="11"
                    />
                  </svg>
                </div>
                {/* <div className="absolute -bottom-3 left-0 h-[5px] w-0 origin-left bg-white transition-all group-hover:w-full" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatedWaveSeparator />
    </div>
  );
};

const AnimatedWaveSeparator = () => {
  return (
    <div>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
          fill="white"
        />
      </svg>
    </div>
  );
};
