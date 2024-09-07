"use client";

import { useLenisStore } from "@/store/lenis-slice";
import Lenis from "@studio-freight/lenis";
import  { useEffect } from "react";



export default function SmoothScroll() {
  const { setLenis } = useLenisStore();

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e: any) => {
      // Your scroll event handling here
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store the Lenis instance in the global store
    setLenis(lenis);

    const handleLogoClick = (e: any) => {
      e.preventDefault();
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.sin((t * Math.PI) / 2),
      });
    }

    document.querySelector('.logo')?.addEventListener('click', handleLogoClick);

    document.querySelectorAll('.navLink').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (!target) return;

        let offsetTop = (target as HTMLElement).offsetTop;

        if (href === "#services" && window.innerWidth >= 1300) {
          offsetTop += 130;
        }

        if (href === "#services" && window.innerWidth >= 1420) {
          offsetTop += 120;
        }

        lenis.scrollTo(offsetTop, {
          duration: 1.2,
          easing: (t) => Math.sin((t * Math.PI) / 2),
        });
      });
    });

    // Clean up
    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return null;
}