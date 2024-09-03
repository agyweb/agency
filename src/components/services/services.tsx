"use client";

import { services } from "@/constants/services";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  DesktopHorizontallServiceCard,
  GridServiceCard,
} from "./service-cards";
import GridPattern from "../magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function Services() {
  const isLaptop = useMediaQuery(
    "(min-width: 1200px) and (min-height: 600px) and (max-height: 800px)",
  );
  const isDesktop = useMediaQuery("(min-width: 1420px)");

  return isLaptop || isDesktop ? (
    <DesktopHorizontallServices />
  ) : (
    <GridServices />
  );
}

function DesktopHorizontallServices() {
  const parentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: parentRef });
  const [transformValues, setTransformValues] = useState(["0%", "0%"]);
  const [leftPadding, setLeftPadding] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const itemCount = 6; // Number of colored boxes
      const itemWidth =
        viewportWidth < 640 ? 280 : viewportWidth < 1024 ? 320 : 350;
      const gap = viewportWidth < 640 ? 32 : viewportWidth < 1024 ? 36 : 40;
      const containerWidth = Math.min(viewportWidth, 1300);

      let extraPercentage;
      if (viewportWidth >= 1024) {
        extraPercentage = 2.8;
      } else if (viewportWidth >= 640) {
        extraPercentage = 3.15;
      } else {
        extraPercentage = 3.5;
      }

      const totalWidth = itemWidth * itemCount + gap * (itemCount - 1);
      const endPercentage = -(
        ((totalWidth - containerWidth) / totalWidth) * 100 +
        extraPercentage
      );

      setTransformValues(["0%", `${endPercentage}%`]);

      if (servicesRef.current) {
        const servicesRect = servicesRef.current.getBoundingClientRect();
        setLeftPadding(servicesRect.left);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], transformValues);

  const [isWorkVisible, setIsWorkVisible] = useState(true);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsWorkVisible(!entry.isIntersecting);
    }, options);

    const workSection = document.querySelector(".work");
    if (workSection) {
      observer.observe(workSection);
    }

    return () => {
      if (workSection) {
        observer.unobserve(workSection);
      }
    };
  }, []);

  return (
    <div
      className="services_container relative z-[100] bg-white"
      ref={parentRef}
      id="services"
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          height: "130px",
          background:
            "linear-gradient(to bottom, #ff63146e 0%, rgba(255, 99, 20, 0.3) 40%, rgba(255, 99, 20, 0.1) 70%, rgba(255, 99, 20, 0) 100%)",
          pointerEvents: "none",
        }}
        initial={{ y: 0 }}
        animate={isWorkVisible ? { y: 0 } : { y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "opacity-60 [mask-image:radial-gradient(ellipse_130%_180%_at_center_-15%,white_30%,transparent)]",
        )}
      />

      <div
        className="services_cards sticky top-0 flex flex-col"
        ref={containerRef}
      >
        <div className="box head flex w-full flex-col items-center justify-between gap-y-3 pt-[35px] text-center text-black sm:flex-row sm:pt-[70px] sm:text-left services_header">
          <h1
            ref={servicesRef}
            className="section_title w-full text-center font-swearDisplay font-bold leading-none tracking-wide sm:w-fit "
          >
            Services
          </h1>
          <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
            we provide a wide range of services, <br /> covering all your needs.
          </p>
        </div>

        <div
          className="flex flex-grow items-center overflow-hidden"
          style={{ paddingLeft: `${leftPadding}px` }}
        >
          <motion.div
            style={{ x }}
            className="flex gap-x-8 sm:gap-x-9 lg:gap-x-10"
          >
            {services.map((service, index) => (
              <DesktopHorizontallServiceCard
                key={index}
                service={service}
                index={index + 1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GridServices() {
  return (
    <div className="relative z-[100] bg-white sm:z-0" id="services">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          background:
            "linear-gradient(to bottom, #ff63146e 0%, rgba(255, 99, 20, 0.3) 40%, rgba(255, 99, 20, 0.1) 70%, rgba(255, 99, 20, 0) 100%)",
          pointerEvents: "none",
        }}
      />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "opacity-60 [mask-image:radial-gradient(ellipse_130%_180%_at_center_-15%,white_30%,transparent)]",
        )}
      />

      <div className="box relative py-[35px] pb-[50px] sm:py-[70px] sm:pb-[85px]">
        <div className="relative flex w-full flex-col items-center justify-between gap-y-3 text-center text-black sm:flex-row sm:text-left">
          <h1 className="w-full text-center font-swearDisplay font-bold leading-none tracking-wide sm:w-fit section_title">
            Services
          </h1>
          <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
            we provide a wide range of services, <br /> covering all your needs.
          </p>
        </div>

        {/* This is the part that will have work cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20 xl:grid-cols-3">
          {services.map((service, index) => (
            <GridServiceCard key={index} service={service} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
