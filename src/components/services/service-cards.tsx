import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
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

export function GridServiceCard({
  service: { description, img, title },
  index,
}: {
  service: CardType;
  index: number;
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
        className={`relative h-auto w-full shrink-0 rounded-lg bg-gry px-7 py-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]`}
        variants={variants}
        initial={"initial"}
        animate={inView ? "visible" : "hidden"}
        ref={cardRef}
      >
        {/* <div className="absolute w-1 left-1/2 h-full bg-red-500 top-0 -translate-x-1/2"></div> */}
        <span className="font-swearDisplay text-xl font-bold sm:text-[22px]">
          0{index}.
        </span>

        <Image
          src={`/services/${img}.png`}
          className={cn(
            "relative bottom-[49px] mx-auto",
            `${img === "design" && "left-[14px]"} ${img === "seo" && "left-1 rotate-[15deg]"}`,
          )}
          alt={title}
          width={280}
          height={280}
          priority
        />

        <div className="-mt-[70px]">
          <h3 className="relative card-title text-[21px] font-bold uppercase leading-none tracking-tighter text-black sm:text-[20px] md:text-[25px] 1m:text-[24px] xl:text-[28px]">
            {title}
          </h3>

          <p className="mt-[16px] hyphens-auto text-[14px] leading-[2.2] text-black opacity-90 sm:text-[15px] lg:text-[16px]">
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
}

export function DesktopHorizontallServiceCard({
  service: { description, img, title },
  index,
}: {
  service: CardType;
  index: number;
}) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.1 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 150 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: Math.min((index - 1) * 0.18, 0.3), // Cap the delay at 0.3 seconds
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative ${index === 0 && "theone"} h-auto w-[280px] shrink-0 rounded-lg bg-gry px-7 py-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] sm:w-80 sm:px-8 lg:w-[350px]`}
    >
      {/* <div className="absolute w-1 left-1/2 h-full bg-red-500 top-0 -translate-x-1/2"></div> */}
      <span className="font-swearDisplay text-xl font-bold sm:text-[22px]">
        0{index}.
      </span>

      <Image
        src={`/services/${img}.png`}
        className={cn(
          "relative bottom-[49px] mx-auto sm:bottom-[60px]",
          `${img === "design" && "left-[14px]"} ${img === "seo" && "left-1 rotate-[15deg]"}`,
        )}
        alt={title}
        width={280}
        height={280}
        priority
      />

      <h3 className="relative card-title -mt-[71px] text-[21px] font-bold uppercase leading-none tracking-tighter text-black sm:-mt-[95px] sm:text-[25px] md:text-[26px] lg:text-[28px]">
        {title}
      </h3>
      <p className="mt-[16px] text-[14px] leading-[2.2] text-black opacity-90 sm:text-[15px] lg:text-[16px]">
        {description}
      </p>
    </motion.div>
  );
}
