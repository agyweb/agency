"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const workCardVariants: Variants = {
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
    },
  },
};

export default function WorkCard({
  work: { categories, img, title },
  children,
}: {
  work: WorkType;
  children?: React.ReactNode;
}) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      className="w-full workCard"
      variants={workCardVariants}
      initial={"initial"}
      animate={inView ? "visible" : "hidden"}
      ref={cardRef}
    >
      <div className="space-y-4 text-black">
        {children}
        <p className="text-[26px] font-medium tracking-tight sm:text-3xl">
          {title}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-4">
          {categories.map((category) => (
            <span
              key={category}
              className="grid place-items-center rounded-full border border-[#969594]/30 px-5 py-[6px] text-[11px] font-medium uppercase leading-none tracking-tight text-black/95 sm:text-[12px]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
