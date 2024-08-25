import { Footer } from "@/components/footer";
import HeroComp from "@/components/hero";
import HeroServices from "@/components/hero-services";
import Services from "@/components/services/services";
import WhyUs from "@/components/why-us";
import Work from "@/components/work";

export default function Page() {
  return (
    <div className="relative bg-white">
      <HeroServices />
      <Work />
      <WhyUs />
      <Footer />
    </div>
  );
}
