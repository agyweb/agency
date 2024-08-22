"use client";

import { cn } from "@/lib/utils";
import GridPattern from "./magicui/grid-pattern";
import ArrowButton from "./hero-button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import GradientText from "./gradiantText";

export default function HeroComp() {
  const backgroundY = useMotionValue("100%");
  const backgroundImage = useMotionTemplate`radial-gradient(150% 105% at -6% -6%, #FFFFFF 80%, #ff63146e)`;

  useEffect(() => {
    backgroundY.set("100%");
    setTimeout(() => backgroundY.set("0%"), 10);
  }, [backgroundY]);

  return (
    <div className="relative h-dvh overflow-hidden pt-[120px]">
      <motion.div
        style={{
          backgroundImage,
          y: backgroundY,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
        )}
      />
      <div className="heroHeight container relative z-10 max-w-[1300px]">
        <div className="relative z-50 w-full">
          <div className="heroContainer flex flex-col justify-center gap-y-14">
            <motion.div
              className="mt-4 sm:mt-14"
              initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
            >
              <div className="heroTitle select-none text-[40px] font-bold !leading-normal sm:text-[52px] md:text-[62px] lg:text-[72px] xl:text-[80px]">
                Transforming ideas into{" "}
                <GradientText
                  colors={[
                    "#702b08",
                    "#ff6314",
                    "#702b08",
                    "#ff6314",
                    "#702b08",
                  ]} // Custom gradient colors
                  animationSpeed={6} // Custom animation speed in seconds
                  showBorder={false} // Show or hide border
                  className="custom-class" // Add one or more custom classes
                >
                  Websites
                </GradientText>{" "}
                {/* <span className="hero_text bg-clip-text font-swearDisplay text-transparent">
                  Websites
                </span>{" "} */}
                that drive results, build trust
              </div>
            </motion.div>

            <motion.p
              className="heroSubTitle select-none text-sm font-medium sm:text-base md:text-lg lg:text-xl xl:text-[1.375rem]"
              initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            >
              &quot;GENERATE YOUR VISION WITH OUR APPROACH&quot;
            </motion.p>

            <motion.div
              className="heroButton"
              initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.7 }}
            >
              <ArrowButton />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
