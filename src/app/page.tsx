import { Footer } from "@/components/footer";
import Services from "@/components/services/services";
import WhyUs from "@/components/why-us";
import Work from "@/components/work";

export default function Page() {
  return (
    <div className="relative bg-white">
      <div className="h-screen bg-white"></div>
      <Services />
      <Work />
      <WhyUs />
      <Footer />
    </div>
  );
}
