"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e: any) => {
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return <></>;
}
