import Link from "next/link";
import { useState } from "react";
// import AnimatedLink from "./AnimatedLink";
import { AnimatePresence, motion } from "framer-motion";
import GridPattern from "./magicui/grid-pattern";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Services", href: "#services" },
  { title: "Works", href: "#works" },
  { title: "Why us", href: "#why-us" },
  { title: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer text-sm text-black lg:hidden"
          onClick={toggleMenu}
        >
          Menu
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full origin-top bg-white px-8 py-[38px] text-black"
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
                  onClick={toggleMenu}
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
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}>
                      <MobileNavLink
                        key={index}
                        title={link.title}
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

export default Navbar;

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
const MobileNavLink = ({ title, href }: any) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="relative text-4xl uppercase"
    >
      <Link href={href} className="px-[10px]">
        {title}
        {title === "Services" && (
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
