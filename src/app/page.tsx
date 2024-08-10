import { MyComponent } from "@/components/contact";
import Hero from "@/components/hero";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import Services from "@/components/services/services";
import WhyUs from "@/components/why-us";
import Work from "@/components/work";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function Page() {
  return (
    <div className="relative bg-white">
      <Hero />
      <Services />
      <Work />
      <WhyUs />
      {/* <MyComponent /> */}
      <div
        className="relative h-svh"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 z-[100] grid h-svh w-full place-items-center bg-black text-white">
        <MyComponent />
        </div>
      </div>
    </div>
  );
}
