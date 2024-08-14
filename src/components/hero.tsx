"use client";

import { cn } from "@/lib/utils";
import GridPattern from "./magicui/grid-pattern";
import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import ArrowButton from "./hero-button";
import SwapText from "./animata/text/swap-text";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionTemplate,
} from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (currScrollVal) => {
    const prevScrollVal = scrollY.getPrevious()!;

    if (currScrollVal > prevScrollVal) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const backgroundImage = useMotionTemplate`radial-gradient(160% 110% at -6% -6%, #FFFFFF 80%, #ff63146e)`;

  return (
    <motion.div style={{ backgroundImage }}>
      <div className="container h-dvh max-w-[1300px]">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
          )}
        />

        <motion.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={isHidden ? "hidden" : "visible"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-blur sticky top-0 z-[60] flex w-full items-center justify-between py-10"
        >
          <a href="/">
            <Image
              src={logo}
              alt="agyweb logo"
              quality={100}
              className={"size-10"}
            />
          </a>

          <div className="hidden items-center gap-x-7 sm:flex">
            {links.map((link, i) => (
              <a key={i} href={`/${link.href}`}>
                <SwapText
                  initialText={link.name}
                  finalText={link.name}
                  textClassName="text-black"
                  finalTextClassName="text-ornge"
                />
              </a>
            ))}
          </div>

          <div className="block sm:hidden">
            <SwapText
              initialText="Menu"
              finalText="Menu"
              textClassName="text-black"
              finalTextClassName="text-ornge"
            />
          </div>
        </motion.nav>

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
