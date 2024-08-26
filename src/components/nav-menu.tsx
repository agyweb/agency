"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import GridPattern from "./magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { useNav } from "@/store/nav-menu-slice";
import { useEffect, useState } from "react";
import { links } from "@/constants/links";
import { useLenisStore } from "@/store/lenis-slice";

const NavbarMenu = () => {
  const { isOpen, toggle } = useNav((state) => state);

  const [activeSection, setActiveSection] = useState("");

  const { lenis } = useLenisStore();

  useEffect(() => {
    if (isOpen && lenis) {
      lenis.stop();
    } else if (!isOpen && lenis) {
      lenis.start();
    }
  }, [isOpen, lenis]);

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
      { threshold: 0.15 },
    );

    links.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  // Menu Animation
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Conatiner Animation
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <nav className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 z-[200] h-dvh w-full origin-top bg-white px-8 py-[38px] text-black"
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "280px",
                background:
                  "linear-gradient(to top, #ff63146e 0%, rgba(255, 99, 20, 0.3) 40%, rgba(255, 99, 20, 0.1) 70%, rgba(255, 99, 20, 0) 100%)",
                pointerEvents: "none",
              }}
            />

            <GridPattern
              width={30}
              height={30}
              x={-1}
              y={-1}
              className={cn(
                "opacity-50 [mask-image:radial-gradient(circle_at_center,white_55%,transparent)]",
              )}
            />

            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-sm text-black">agyweb</h1>

                <p
                  className="cursor-pointer text-sm text-black"
                  onClick={toggle}
                >
                  Close
                </p>
              </div>

              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex h-full flex-col items-center justify-center gap-8"
              >
                {links.map((link) => {
                  return (
                    <div
                      className="overflow-hidden"
                      onClick={toggle}
                      key={link.href}
                    >
                      <MobileNavLink
                        state={activeSection}
                        name={link.name}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
              >
                <MobileNavEmailLink
                  title="agywebservices@gmail.com"
                  href="mailto:agywebservices@gmail.com"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarMenu;

// Links Animation
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      ease: [0.37, 0, 0.63, 1],
      delay: 0.2,
      duration: 0.8,
    },
  },

  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      delay: 0.2,
      duration: 0.8,
    },
  },
};

// Links Animation
const mobileEmailLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      ease: [0.37, 0, 0.63, 1],
      duration: 0.8,
    },
  },

  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      delay: 0.6,
      duration: 0.8,
    },
  },
};

// Links Style
const MobileNavLink = ({ name, href, state }: any) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="relative text-4xl uppercase"
    >
      <Link href={href} className="px-[10px]">
        {name}

        {state === href.slice(1) && (
          <div className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-black" />
        )}
      </Link>
    </motion.div>
  );
};

// Email Link Style
const MobileNavEmailLink = ({ title, href }: any) => {
  return (
    <motion.div variants={mobileEmailLinkVars} className="text-center">
      <Link className="relative text-base text-black" href={href}>
        {title}
        <div className="absolute -bottom-[4px] left-0 right-0 h-[1px] bg-black" />
      </Link>
    </motion.div>
  );
};
