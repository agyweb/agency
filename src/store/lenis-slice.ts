import Lenis from "@studio-freight/lenis";
import { create } from "zustand";

type LenisStore = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis) => void;
};

export const useLenisStore = create<LenisStore>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}));
