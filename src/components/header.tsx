"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import SwapText from "./animata/text/swap-text";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function HeaderComp() {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (currScrollVal) => {
    const prevScrollVal = scrollY.getPrevious()!;

    if (currScrollVal > prevScrollVal) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
      animate={{
        y: isHidden ? "-100%" : 0,
        opacity: isHidden ? 0 : 1,
        filter: isHidden ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-[60] w-full"
    >
      <motion.nav className="bg-blur container flex max-w-[1300px] items-center justify-between py-10">
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
      </motion.nav>
    </motion.div>
  );
}
