"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import SwapText from "./animata/text/swap-text";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import Link from "next/link";
import Navbar from "./nav";

export default function HeaderComp() {
  const [isHidden, setIsHidden] = useState(false);
  const [isPastViewport, setIsPastViewport] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const { scrollY } = useScroll();
  const path = usePathname();

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (currScrollVal <= viewportHeight) {
      setIsHidden(false);
      setIsPastViewport(false);
      return;
    }

    setIsPastViewport(true);
    const prevScrollVal = scrollY.getPrevious()!;
    setIsHidden(currScrollVal > prevScrollVal);
  });

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          } else if (activeSection === entry.target.id) {
            // If this section is no longer intersecting and it was the active section, reset active state
            setActiveSection("");
          }
        });
      },
      { threshold: 0.3 },
    );

    links.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-[60] w-full"
    >
      <motion.div
        animate={{
          y: isPastViewport && isHidden ? "-100%" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`w-full ${isPastViewport ? "bg-[#ffffffa6] shadow-sm backdrop-blur-[7.6px]" : ""}`}
      >
        <nav
          className={`container flex max-w-[1300px] items-center justify-between ${
            isPastViewport ? "py-3" : "py-7"
          }`}
        >
          <Link className="logo" href="/">
            <Image
              src={logo}
              alt="agyweb logo"
              quality={100}
              className="size-10"
            />
          </Link>

          <div className="hidden items-center gap-x-7 sm:flex">
            {links.map((link, i) => {
              const isActive =
                path === `/${link.href}` || (path === "/" && link.href === "");
              return (
                <Link
                  key={i}
                  href={`${link.href}`}
                  className={`navLink ${
                    activeSection === link.href.slice(1) ? "activeLink" : ""
                  }`}
                >
                  <SwapText
                    className="text-inherit"
                    initialText={link.name}
                    finalText={link.name}
                    finalTextClassName="text-ornge"
                  />
                </Link>
              );
            })}
          </div>

          <div className="block sm:hidden">
            <Navbar />
          </div>
        </nav>
      </motion.div>
    </motion.div>
  );
}
