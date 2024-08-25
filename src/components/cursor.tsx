"use client";

import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "./hooks/use-mouse-position";
import { useEffect, useState } from "react";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const [overWork, setWork] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [overLink, setOverLink] = useState(false);

  const springConfig = { damping: 60, stiffness: 1000, duration: 0.3 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseEnter = () => setWork(true);
    const handleMouseLeave = () => setWork(false);

    const imgs = document.querySelectorAll(".workCard");
    imgs.forEach((img) => {
      img?.addEventListener("mouseenter", handleMouseEnter);
      img?.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      imgs.forEach((img) => {
        img?.removeEventListener("mouseenter", handleMouseEnter);
        img?.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setOverFooter(true);
    const handleMouseLeave = () => setOverFooter(false);

    const footer = document.querySelector(".ftr");
    footer?.addEventListener("mouseenter", handleMouseEnter);
    footer?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer?.removeEventListener("mouseenter", handleMouseEnter);
      footer?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setOverLink(true);
    const handleMouseLeave = () => setOverLink(false);

    const lnks = document.querySelectorAll(".lnk");
    lnks.forEach((lnk) => {
      lnk?.addEventListener("mouseenter", handleMouseEnter);
      lnk?.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      lnks.forEach((lnk) => {
        lnk?.removeEventListener("mouseenter", handleMouseEnter);
        lnk?.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] grid place-items-center rounded-full border cursor"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: `-50%`,
        translateY: `-50%`,
        borderColor: overWork ? "transparent" : "#fff",
        backgroundColor: overWork ? "#000000c6" : "transparent",
      }}
      animate={{
        width: overWork ? 80 : overLink ? 30 : 16,
        height: overWork ? 80 : overLink ? 30 : 16,
        mixBlendMode: overWork || overFooter ? "normal" : "difference",
        backdropFilter: overWork ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "backOut" }}
    >
      {overWork && (
        <p className="font-satoshi text-[15px] font-medium text-white">View</p>
      )}
    </motion.div>
  );
}
