import { Footer } from "@/components/footer";
import HeroServices from "@/components/hero-services";
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
