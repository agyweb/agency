import { cn } from "@/lib/utils";
import GridPattern from "./magicui/grid-pattern";
import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import ArrowButton from "./hero-button";
import SwapText from "./animata/text/swap-text";

export default function Hero() {
  return (
    <div className="container relative h-screen max-w-[1300px] pt-10">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
        )}
      />

      <div className="relative z-50 h-full w-full">
        <div className="flex items-center justify-between">
          <a href="/">
            <Image
              src={logo}
              alt="agyweb logo"
              quality={100}
              className={"size-10"}
            />
          </a>

          <div className="hidden items-center gap-x-7 sm:flex">
            {links.map((link, i) => (
              <a key={i} href={`/${link.href}`}>
                <SwapText
                  initialText={link.name}
                  finalText={link.name}
                  textClassName="text-black"
                  finalTextClassName="text-ornge"
                />
              </a>
            ))}
          </div>

          <div className="block sm:hidden">
            <SwapText
              initialText="Menu"
              finalText="Menu"
              textClassName="text-black"
              finalTextClassName="text-ornge"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-y-14">
          <div className="mt-14">
            <p className="test-p text-[42px] font-bold !leading-normal">
              Transforming ideas into{" "}
              <span className="hero_text bg-clip-text font-swearDisplay text-transparent">
                Websites
              </span>{" "}
              that drive results, build trust
            </p>
          </div>

          <p className="text-xs font-medium">
            “GENERATE YOUR VISON WITH OUR APPROACH”
          </p>

          <ArrowButton />
        </div>
      </div>
    </div>
  );
}
