"use client";

import { whyUs } from "@/constants/why-us";
import { cn } from "@/lib/utils";
import { useInView, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import design from "../../public/why-us/design.svg";
import responsive from "../../public/why-us/responsive.svg";
import solutions from "../../public/why-us/solutions.svg";
import support from "../../public/why-us/support.svg";
import tech from "../../public/why-us/tech.svg";
import expertise from "../../public/why-us/expertise.svg";
import { Tilt } from "react-tilt";

const tiltOptions = {
  reverse: false, // reverse the tilt direction
  max: 25, // max tilt rotation (degrees)
  perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

export default function WhyUs() {
  return (
    <div className="relative bg-white" id="why-us">
      <div className="box py-[35px] pb-[50px] sm:py-[70px] sm:pb-[85px] section">
        <div className="flex w-full flex-col items-center justify-between gap-y-3 text-center text-black sm:flex-row sm:text-left">
          <h1 className="w-full text-center font-swearDisplay section_title font-bold leading-none tracking-wide sm:w-fit ">
            Why us
          </h1>
          <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
            discover why we&apos;re the top choice <br /> to bring your visions
            to life.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20 xl:grid-cols-3">
          {whyUs.map((item, index) => (
            <WhyUsCard key={index} index={index + 1} whyUs={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyUsCard({
  whyUs: { description, img, title },
  index,
}: {
  index: number;
  whyUs: CardType;
}) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.1 });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      filter: "blur(5px)",
    },

    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.1, // Cap the delay at 0.6 seconds
      },
    },
  };

  return (
    <Tilt options={tiltOptions}>
      <motion.div
        ref={cardRef}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ transform: "scale(1) !important" }}
        className={`relative h-auto shrink-0 rounded-lg bg-gry px-7 py-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] sm:px-7 md:px-8`}
      >
        <span className="font-swearDisplay text-xl font-bold sm:text-[22px]">
          0{index}.
        </span>

        <div className="mt-5 flex flex-col gap-y-10">
          <Image
            src={
              img === "design"
                ? design
                : img === "responsive"
                  ? responsive
                  : img === "solutions"
                    ? solutions
                    : img === "support"
                      ? support
                      : img === "tech"
                        ? tech
                        : expertise
            }
            className={cn(
              "relative mx-auto object-cover object-top 5m:h-[260px]",
            )}
            alt={title}
            priority
          />

          <div>
            <h3 className="relative card-title text-[21px] font-bold uppercase leading-none tracking-tighter text-black sm:text-[20px] md:text-[25px] 1m:text-[24px] xl:text-[28px]">
              {title}
            </h3>

            <p className="mt-[16px] hyphens-auto text-[14px] leading-[2.2] text-black opacity-90 sm:text-[15px] lg:text-[16px]">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}
