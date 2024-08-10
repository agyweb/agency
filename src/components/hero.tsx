"use client";

import { cn } from "@/lib/utils";
import GridPattern from "./magicui/grid-pattern";
import { motion, useTransform } from "framer-motion";
import { useState } from "react";
import { on } from "events";

export default function Hero() {
  return (
    <motion.div className="sticky top-0 h-screen">
      <div className="box">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
          )}
        />
      </div>
    </motion.div>
  );
}

