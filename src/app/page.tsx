"use client";
import Hero from "@/components/hero";
import { motion, useMotionTemplate } from "framer-motion";

export default function page() {
  const backgroundImage = useMotionTemplate`radial-gradient(130% 138% at -6% -6%, #FFFFFF 80%, #ff63146e);`;

  return (
    <motion.div style={{ backgroundImage }}>
      <Hero />
    </motion.div>
  );
}
