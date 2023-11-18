import React, { RefObject, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import useStore from "@/zustand/store";
import SunSvg from "../SunSvg";

let miniNavVariant: Variants = {
  open: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
};

interface miniNavProps {
  toogleButtonRef: RefObject<HTMLButtonElement>;
}

export default function MiniNav({}: miniNavProps) {
  const toggleIsNavOpen = useStore((state) => state.toggleIsNavOpen);

  useEffect(() => {
    const miniNavHandler = () => {
      toggleIsNavOpen(false);
    };

    document.addEventListener("click", miniNavHandler);

    return () => {
      document.removeEventListener("click", miniNavHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="absolute left-0 right-0 top-full z-10 h-[calc(100vh-144px)] overflow-y-auto bg-white"
      variants={miniNavVariant}
      initial="close"
      animate="open"
      exit="close"
      transition={{ type: "tween", ease: "linear" }}
    >
      <ul>
        <ListMenuMobile text="Artikel" />
        <ListMenuMobile text="Discord" />
        <ListMenuMobile text="Tentang" />
        <ListMenuMobile text="Statistik" />
        <ListMenuMobile text="Kontak" />
        <ListMenuMobile text="FAQ" />
      </ul>

      <div className="flex h-36 items-center justify-center">
        <motion.button
          className="flex items-center justify-center gap-3 rounded-full border-2 border-slate-200 px-6 py-3 transition focus:border-slate-900"
          whileHover={{ borderColor: "var(--slate-900)" }}
          role="button"
          tabIndex={0}
        >
          <SunSvg className="h-6" />
          <p className="text-xs">Berganti ke mode gelap</p>
        </motion.button>
      </div>
    </motion.div>
  );
}
interface ListMenuMobileProps {
  text: string;
}

function ListMenuMobile({ text }: ListMenuMobileProps) {
  return (
    <motion.li
      whileHover={{ backgroundColor: "var(--slate-100)" }}
      className="flex h-20 cursor-pointer items-center border-b bg-white px-10 text-sm first-of-type:border-t"
    >
      {text}
    </motion.li>
  );
}
