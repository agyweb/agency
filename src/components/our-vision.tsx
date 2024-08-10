"use client";

import { motion, Transition, useInView, Variants } from "framer-motion";
import {} from "framer-motion";
import { useRef } from "react";
import TypingAnimation from "./magicui/typing-animation";

const transition: Transition = {
  delay: 1.2,
  duration: 1,
  ease: "easeInOut",
};

const variants: Variants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
  },
};

export default function OurVision() {
  const parentRef = useRef(null);
  const isInView = useInView(parentRef);

  return (
    <div className="relative h-screen bg-black grid place-items-center">
      <div className="box h-[90%] text-white bg-red-500 flex justify-between flex-col" ref={parentRef}>
        <div className="flex gap-x-3 text-[17px] uppercase">
          <TypingAnimation text={isInView ? "Our vision" : ""} duration={100} />
          <div className="relative top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="57"
              viewBox="0 0 54 57"
              fill="none"
            >
              <motion.path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M 0.7099 3.7576 C 20 1 46 35 43.8285 52.6787 C 43.896 53.0885 44.2831 53.3683 44.6929 53.3008 C 45.1028 53.2333 45.3825 52.8463 45.315 52.4364 C 43 29 20 3 0.8608 2.2595 C 0.448 2.2168 0.0789 2.5184 0.0363 2.9331 C -0.0064 3.3459 0.2952 3.715 0.7099 3.7576 Z"
                fill="transparent"
                stroke="white"
                strokeWidth={"1.5"}
                transition={transition}
                variants={variants}
                initial={"initial"}
                animate={isInView ? "animate" : "initial"}
              />
              <motion.path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M 45 53 C 43.6721 51.0764 45 53 42.5276 49.6239 C 39 46 35.5608 42.4826 31.2626 39.7002 C 30.914 39.4739 30.4466 39.5744 30.2204 39.923 C 29.9941 40.2716 30.0946 40.7389 30.4432 40.9652 C 36 43 42 50 41 50 C 43 51 43.8545 53.7508 44.3642 54.3105 C 44.5722 54.541 44.7615 54.6068 44.8077 54.6181 C 45.0504 54.6873 45.2363 54.6316 45.3702 54.561 C 45.5207 54.4802 45.7367 54.2862 45.8349 53.9242 C 45.9361 53.545 45.9527 52.711 45.9739 52.5008 C 46 49 46 48 47 43 C 47.865 39.3615 49 37 52.0089 34.5735 C 52.3525 34.3397 52.4402 33.8697 52.2063 33.5262 C 51.9724 33.1826 51.5025 33.0948 51.1589 33.3287 C 49 36 47 39 46 43 C 44.9292 45.4053 44.8147 48.9411 45 53 Z"
                fill="transparent"
                stroke="white"
                strokeWidth={"1.5"}
                transition={{ ...transition, delay: 2 }}
                variants={variants}
                initial={"initial"}
                animate={isInView ? "animate" : "initial"}
              />
            </svg>
          </div>
        </div>

        <div className=" text-[100%] text-balance font-bold leading-normal tracking-tight text-white lg:text-[72px] xl:text-[89px]">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </div>
      </div>
    </div>
  );
}
