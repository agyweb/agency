"use client";

import HeroComp from "./hero";
import Services from "./services/services";

export default function HeroServices() {
  return (
    <div className="relative">
      <div className="sticky top-0">
        <HeroComp />
      </div>
      <Services />
    </div>
  );
}
