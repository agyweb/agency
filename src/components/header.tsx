"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import SwapText from "./animata/text/swap-text";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./nav";

export default function HeaderComp() {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isTopPage, setIsTopPage] = useState<boolean>(true);
  const { scrollY } = useScroll();
  const path = usePathname();

  useEffect(() => {
    const navLinks = document.querySelectorAll(".navLink");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelector(".activeLink")?.classList.remove("activeLink");
        link.classList.add("activeLink");
      });
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (currScrollVal) => {
    const prevScrollVal = scrollY.getPrevious()!;

    if (currScrollVal > prevScrollVal) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    if (currScrollVal === 0) {
      setIsTopPage(true);
    } else {
      setIsTopPage(false);
    }
  });

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{
        y: isHidden ? "-100%" : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 z-[60] w-full ${isTopPage ? "" : "bg-blur"}`}
    >
      <motion.nav
        className={`container flex max-w-[1300px] items-center justify-between ${isTopPage ? "py-7" : "py-4"}`}
      >
        <a href="/">
          <Image
            src={logo}
            alt="agyweb logo"
            quality={100}
            className={"size-10"}
          />
        </a>

        <div className="hidden items-center gap-x-7 sm:flex">
          {links.map((link: any, i) => {
            const isActive =
              path === `/${link.href}` || (path === "/" && link.href === "");
            return (
              <a key={i} href={`/${link.href}`} className="navLink">
                <SwapText
                  className="text-inherit"
                  initialText={link.name}
                  finalText={link.name}
                  finalTextClassName="text-ornge"
                />
              </a>
            );
          })}
        </div>

        <div className="block sm:hidden">
          <Navbar />
        </div>
      </motion.nav>
    </motion.div>
  );
}
