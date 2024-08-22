"use client";

import React, { useEffect, useRef, useState } from "react";
import { NeatGradient } from "@firecms/neat";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../public/logo-white.png";

export const Footer = () => {
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
    <div
      className="relative h-svh"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 z-[100] grid h-svh w-full place-items-center">
        <div ref={containerRef} className="relative h-svh w-full text-black">
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isNearView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute size-full bg-white"
            style={{ isolation: "isolate" }}
          />

          <div className="box relative z-50 h-full w-full overflow-x-hidden">
            <div className="h-full w-full py-20 lg:py-24 text-left text-white">
              <div className="flex h-full w-full flex-col justify-center bg-red-500 max-w-full">
                <div className="flex h-full w-full flex-col justify-between">



                  <div className="flex items-center flex-wrap justify-between">
                    <div className="flex items-center gap-x-1">
                      {" "}
                      <Image
                        src={logo}
                        alt="agyweb logo"
                        quality={100}
                        width={28}
                        height={28}
                        className={"!size-7"}
                      />
                      agyweb
                    </div>

                    <div className="flex items-center gap-x-5">
                      <div className="underline_hover after:-bottom-1 after:h-[1px]">
                        LinkedIn
                      </div>
                      <div className="underline_hover after:-bottom-1 after:h-[1px]">
                        Instagram
                      </div>
                      <div className="underline_hover after:-bottom-1 after:h-[1px]">
                        Dribble
                      </div>
                      <div className="underline_hover after:-bottom-1 after:h-[1px]">
                        X/Twitter
                      </div>
                    </div>
                  </div>


                  <div className="underline_hover group relative flex cursor-pointer items-end justify-between bg-green-500">
                    <div className="space-y-5 lg:space-y-7">
                      <p className="lg:pl-[6px] font-satoshi text-[13px] lg:text-[15px] tracking-tighter">
                        Got a project in mind ?
                      </p>
                      <div className="text-3xl lg:text-8xl font-bold tracking-tight">
                        CONTACT US
                      </div>
                    </div>

                    <div className="mb-3 size-10 transition-all duration-300 group-hover:-translate-x-2 group-hover:rotate-[40deg]">
                      <svg
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

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
