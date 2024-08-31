import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from "@/components/smooth-scroll";
import HeaderComp from "@/components/header";
import Cursor from "@/components/cursor";
import NavbarMenu from "@/components/nav-menu";
import { Analytics } from '@vercel/analytics/react';

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--satoshi-font",
});

const swearDisplay = localFont({
  src: [
    {
      path: "../fonts/Swear-Display-Medium-Cilati.otf",
      weight: "500",
    },
    {
      path: "../fonts/Swear-Display-Bold-Cilati.otf",
      weight: "700",
    },
  ],
  variable: "--swear-display-font",
});

export const metadata: Metadata = {
  title: "Agyweb | Web & Design Agency",
  description:
    "Agyweb crafts cutting-edge websites and web applications tailored for businesses and individuals. Transform your online presence with our expert team's modern, responsive, and user-centric solutions.",
  keywords: [
    "web development agency",
    "web design",
    "responsive design",
    "SEO",
    "web applications",
    "digital solutions",
    "web agency",
    "design agency",
  ],
  // openGraph: {
  //   title: "Agyweb | Web & Design Agency",
  //   description:
  //     "Agyweb crafts cutting-edge websites and web applications tailored for businesses and individuals. Transform your online presence with our expert team's modern, responsive, and user-centric solutions.",
  //   images: [
  //     {
  //       url: "/public/opengraph-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Agyweb | Web & Design Agency",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${satoshi.variable} ${swearDisplay.variable} scrollbar-hidden relative overflow-x-hidden font-satoshi`}
      >
        <HeaderComp />
        <NavbarMenu />
        {children}
        <Cursor />
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
