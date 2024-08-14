"use client";

import { cn } from "@/lib/utils";
import GridPattern from "./magicui/grid-pattern";
import ArrowButton from "./hero-button";

import { motion, useMotionTemplate } from "framer-motion";

export default function HeroComp() {
  const backgroundImage = useMotionTemplate`radial-gradient(150% 105% at -6% -6%, #FFFFFF 80%, #ff63146e)`;

  return (
    <motion.div style={{ backgroundImage }}>
      <div className="heroHeight container max-w-[1300px]">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
          )}
        />

        <motion.div className="relative z-50 w-full">
          <div className="heroContainer flex flex-col justify-center gap-y-14">
            <div className="mt-4 sm:mt-14">
              <p className="heroTitle text-[40px] font-bold !leading-normal sm:text-[52px] md:text-[62px] lg:text-[72px] xl:text-[80px]">
                Transforming ideas into{" "}
                <span className="hero_text bg-clip-text font-swearDisplay text-transparent">
                  Websites
                </span>{" "}
                that drive results, build trust
              </p>
            </div>

            <p className="heroSubTitle text-sm font-medium sm:text-base md:text-lg lg:text-xl xl:text-[1.375rem]">
              “GENERATE YOUR VISON WITH OUR APPROACH”
            </p>

            <ArrowButton className="heroButton" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
