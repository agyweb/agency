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


    const handleLogoClick = (e:any) => {

      e.preventDefault();

      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.sin((t * Math.PI) / 2),
        
      });

      // window.scrollTo({top:0,behavior:'instant'})
    }

    document.querySelector('.logo')?.addEventListener('click',handleLogoClick)


    document.querySelectorAll('.navLink').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (!target) return;
    
        let offsetTop = (target as HTMLElement).offsetTop;
    
        // Add 50px offset for the services section
        if (href === "#services" && window.innerWidth >= 1420) {
          offsetTop += 120;
        }
    
        lenis.scrollTo(offsetTop, {
          duration: 1.2,
          easing: (t) => Math.sin((t * Math.PI) / 2),
        });
      });
    });


  });



  return <></>;
}
