import { useMotionValue } from "framer-motion";
import { useCallback, useEffect } from "react";

export const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [x, y],
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  return { x, y };
};
