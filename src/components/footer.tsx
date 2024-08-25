"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";
import Image from "next/image";
import logo from "../../public/logo-white.png";

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

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

    return gradientRef.current.destroy;
  }, []);

  const openEmail = () => {
    window.location.href = `mailto:agywebservices@gmail.com`;
  };

  return (
    <div
      className="ftr relative z-[100] h-dvh"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      id="contact"
    >
      <div className="fixed bottom-0 z-[100] grid h-dvh w-full place-items-center">
        <div ref={containerRef} className="relative h-dvh w-full text-black">
          <canvas
            ref={canvasRef}
            className="absolute size-full bg-white"
            style={{ isolation: "isolate" }}
          />

          <div className="box relative z-50 h-full w-full overflow-x-hidden">
            <div className="h-full w-full py-20 text-left text-white lg:py-24">
              <div className="flex h-full w-full max-w-full flex-col justify-center">
                <div className="flex h-full w-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-y-5">
                    <div className="flex items-center gap-x-1">
                      {" "}
                      <Image
                        src={logo}
                        alt="agyweb logo"
                        quality={100}
                        className={"size-7 lg:size-9"}
                      />
                      <span className="hidden sm:inline">agyweb</span>
                    </div>

                    <div className="flex items-center gap-x-5 text-[14px] md:gap-x-7 md:text-[15px] 9m:gap-x-8 lg:text-[16px]">
                      <div className="underline_hover lnk after:-bottom-1 after:h-[1px] cursor-pointer">
                        Instagram
                      </div>
                      <div className="underline_hover lnk after:-bottom-1 after:h-[1px] cursor-pointer">
                        LinkedIn
                      </div>
                      <div className="underline_hover lnk after:-bottom-1 after:h-[1px] cursor-pointer">
                        X/Twitter
                      </div>
                    </div>
                  </div>

                  <div
                    className="underline_hover group relative flex cursor-pointer items-end justify-between"
                    onClick={openEmail}
                  >
                    <div className="space-y-5 lg:space-y-7">
                      <p className="font-satoshi text-[13px] tracking-tighter sm:text-[13.5px] md:text-[14px] 9m:text-[14.5px] lg:pl-[3px] lg:text-[16px]">
                        Got a project in mind ?
                      </p>
                      <div className="text-4xl font-bold tracking-tight 5m:text-5xl sm:text-6xl md:text-[67px] 9m:text-[83px] lg:text-8xl">
                        CONTACT US
                      </div>
                    </div>

                    <div className="mb-[2px] size-8 transition-all duration-300 group-hover:-translate-x-1 group-hover:rotate-[40deg] 5m:mb-0 5m:size-[40px] 5m:group-hover:-translate-x-[5px] sm:size-[50px] md:size-[58px] md:group-hover:-translate-x-[7px] 9m:mb-[2px] 9m:size-[69px] 9m:group-hover:-translate-x-[8px] lg:mb-0 lg:mt-[1px] lg:size-[82px] lg:group-hover:-translate-x-[10px]">
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
