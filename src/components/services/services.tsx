"use client";

import { services } from "@/constants/services";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  HorizontallServiceCard,
  SmallHeightScreenServiceCard,
} from "./service-cards";
import { NeatGradient } from "@firecms/neat";

export default function Services() {
  const isSmallHeightScreens = useMediaQuery("(max-height: 710px)");

  return isSmallHeightScreens ? (
    <SmallHeightScreensServices />
  ) : (
    <>
      <HorizontallServices />
    </>
  );
}

// function HorizontallServices() {
//   const parentRef = useRef(null);
//   const servicesRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: parentRef });
//   const [transformValues, setTransformValues] = useState(["0%", "0%"]);
//   const [leftPadding, setLeftPadding] = useState(0);

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const gradientRef = useRef<NeatGradient | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       {
//         rootMargin: "400px", // Adjust this value to control when to start loading
//       },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible || !canvasRef.current) return;

//     gradientRef.current = new NeatGradient({
//       ref: canvasRef.current,
//       colors: [
//         {
//           color: "#FFFFFF",
//           enabled: true,
//         },
//         {
//           color: "#FF6314",
//           enabled: true,
//         },
//         {
//           color: "#FFFFFF",
//           enabled: true,
//         },
//         {
//           color: "#FF6314",
//           enabled: true,
//         },
//         {
//           color: "#FFFFFF",
//           enabled: true,
//         },
//       ],
//       speed: 4,
//       horizontalPressure: 2,
//       verticalPressure: 5,
//       waveFrequencyX: 2,
//       waveFrequencyY: 2,
//       waveAmplitude: 10,
//       shadows: 7,
//       highlights: 6,
//       colorBrightness: 1,
//       colorSaturation: 1,
//       wireframe: false,
//       colorBlending: 7,
//       backgroundColor: "#FFFFFF",
//       backgroundAlpha: 1,
//       resolution: 1,
//     });

//     return () => {
//       if (gradientRef.current) {
//         gradientRef.current.destroy();
//       }
//     };
//   }, [isVisible]);

//   const svgRef = useRef(null);
//   const isInView = useInView(svgRef);

//   const inView = useInView(parentRef, { once: true, amount: 0.15 });

//   useLayoutEffect(() => {
//     const handleResize = () => {
//       const viewportWidth = window.innerWidth;
//       const itemCount = 6; // Number of colored boxes
//       const itemWidth =
//         viewportWidth < 640 ? 280 : viewportWidth < 1024 ? 320 : 350; // w-[280px], w-80, w-[350px]
//       const gap = viewportWidth < 640 ? 32 : viewportWidth < 1024 ? 36 : 40; // gap-x-8, gap-x-9, gap-x-10
//       const containerWidth = Math.min(viewportWidth, 1300); // max-w-[1300px]

//       let extraPercentage;
//       if (viewportWidth >= 1024) {
//         // Desktop
//         extraPercentage = 2.8;
//       } else if (viewportWidth >= 640) {
//         // Tablet
//         extraPercentage = 3.15;
//       } else {
//         // Mobile
//         extraPercentage = 3.5;
//       }

//       const totalWidth = itemWidth * itemCount + gap * (itemCount - 1);
//       const endPercentage = -(
//         ((totalWidth - containerWidth) / totalWidth) * 100 +
//         extraPercentage
//       );

//       setTransformValues(["0%", `${endPercentage}%`]);

//       // Calculate left padding based on Services element position
//       if (servicesRef.current) {
//         const servicesRect = (
//           servicesRef.current as HTMLElement
//         ).getBoundingClientRect();
//         setLeftPadding(servicesRect.left);
//       }
//     };

//     handleResize(); // Initial call
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const x = useTransform(scrollYProgress, [0, 1], transformValues);

//   return (
//     <motion.div
//       className="services_container relative bg-white"
//       ref={parentRef}
//     >
//       {/* <ShootingStars
//         starColor="#0D0E13"
//         trailColor="#0D0E13"
//         minDelay={1500}
//         maxDelay={2500}
//       /> */}
//       {/* <StarsBackground
//         starDensity={0.0005}
//         allStarsTwinkle={false}
//         twinkleProbability={0.9}
//         minTwinkleSpeed={1}
//         maxTwinkleSpeed={1.3}
//       /> */}
//             {isVisible && (
//         <canvas
//           className={"absolute size-full bg-white"}
//           style={{
//             isolation: "isolate",
//           }}
//           ref={canvasRef}
//         />
//       )}

//       <div className="services_cards sticky top-0 flex flex-col" ref={containerRef}>
//         <div className="box flex w-full flex-col items-center justify-between gap-y-3 pt-[35px] text-center text-black sm:flex-row sm:pt-[70px] sm:text-left">
//           <h1
//             ref={servicesRef}
//             className="w-full text-center font-swearDisplay text-6xl font-bold leading-none tracking-wide sm:w-fit sm:text-7xl md:text-[76px] lg:text-[90px] xl:text-[95px]"
//           >
//             Services
//           </h1>
//           <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
//             we provide a wide range of services, <br /> covering all your needs.
//           </p>
//         </div>

//         <div
//           className="flex flex-grow items-center overflow-hidden"
//           style={{ paddingLeft: `${leftPadding}px` }}
//         >
//           <motion.div
//             style={{ x }}
//             className="flex gap-x-8 sm:gap-x-9 lg:gap-x-10"
//           >
//             {services.map((service, index) => (
//               <HorizontallServiceCard
//                 key={index}
//                 service={service}
//                 index={index + 1}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

function HorizontallServices() {
  const parentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: parentRef });
  const [transformValues, setTransformValues] = useState(["0%", "0%"]);
  const [leftPadding, setLeftPadding] = useState(0);
  const [isNearView, setIsNearView] = useState(false);

  const createGradient = () => {
    if (canvasRef.current && !gradientRef.current) {
      console.log("Creating NeatGradient for HorizontallServices");
      gradientRef.current = new NeatGradient({
        ref: canvasRef.current,
        colors: [
          {
            color: "#FF6314",
            enabled: true,
          },
          {
            color: "#FFFFFF",
            enabled: true,
          },
          {
            color: "#FFFFFF",
            enabled: true,
          },
          {
            color: "#FFFFFF",
            enabled: true,
          },
          {
            color: "#FFFFFF",
            enabled: true,
          },
        ],
        speed: 4,
        horizontalPressure: 3,
        verticalPressure: 3,
        waveFrequencyX: 2,
        waveFrequencyY: 2,
        waveAmplitude: 9,
        shadows: 0,
        highlights: 10,
        colorBrightness: 1,
        colorSaturation: -1,
        wireframe: false,
        colorBlending: 10,
        backgroundColor: "#FFFFFF",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }
  };

  const destroyGradient = () => {
    if (gradientRef.current) {
      console.log("Destroying NeatGradient for HorizontallServices");
      gradientRef.current.destroy();
      gradientRef.current = null;
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: "500px 0px 500px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsNearView(true);
          console.log("Component is near view");
        } else {
          setIsNearView(false);
          console.log("Component is far from view");
        }
      });
    }, options);

    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (isNearView) {
      createGradient();
    } else {
      destroyGradient();
    }
  }, [isNearView]);

  useEffect(() => {
    return () => {
      destroyGradient();
    };
  }, []);

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

  return (
    <div className="services_container relative bg-white" ref={parentRef}>
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isNearView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 size-full bg-white"
        style={{ isolation: "isolate" }}
      />

      <div
        className="services_cards sticky top-0 flex flex-col"
        ref={containerRef}
      >
        <div className="box flex w-full flex-col items-center justify-between gap-y-3 pt-[35px] text-center text-black sm:flex-row sm:pt-[70px] sm:text-left">
          <h1
            ref={servicesRef}
            className="w-full text-center font-swearDisplay text-6xl font-bold leading-none tracking-wide sm:w-fit sm:text-7xl md:text-[76px] lg:text-[90px] xl:text-[95px]"
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
              <HorizontallServiceCard
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

function SmallHeightScreensServices() {
  return (
    <div>
      <div className="box py-[35px] pb-[50px] sm:py-[70px] sm:pb-[85px]">
        <div className="flex w-full flex-col items-center justify-between gap-y-3 text-center text-black sm:flex-row sm:text-left">
          <h1 className="w-full text-center font-swearDisplay text-6xl font-bold leading-none tracking-wide sm:w-fit sm:text-7xl md:text-[76px] lg:text-[90px] xl:text-[95px]">
            Services
          </h1>
          <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
            we provide a wide range of services, <br /> covering all your needs.
          </p>
        </div>

        {/* This is the part that will have work cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20">
          {services.map((service, index) => (
            <SmallHeightScreenServiceCard
              key={index}
              service={service}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
