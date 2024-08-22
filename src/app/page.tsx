import { Footer } from "@/components/footer";
import HeroComp from "@/components/hero";
import Services from "@/components/services/services";
import WhyUs from "@/components/why-us";
import Work from "@/components/work";

export default function Page() {
  return (
    <div className="relative bg-white">
      <HeroComp />
      <Services />
      <Work />
      <WhyUs />
      <Footer />
    </div>
  );
}
