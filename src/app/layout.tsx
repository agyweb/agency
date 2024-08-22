import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from "@/components/smooth-scroll";

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
  title: "Agency",
  description: "A website for an agency.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${swearDisplay.variable} scrollbar-hidden relative overflow-x-hidden font-satoshi`}
      >
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
