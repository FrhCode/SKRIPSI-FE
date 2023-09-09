import SunSvg from "@/Components/SunSvg";
import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

let miniNavVariant: Variants = {
  open: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
};

export default function MiniNav() {
  return (
    <motion.div
      className="absolute left-0 right-0 top-full z-10 bg-white"
      variants={miniNavVariant}
      initial="close"
      animate="open"
      exit="close"
      transition={{ type: "tween", ease: "linear" }}
    >
      <ul>
        <ListMenuMobile text="Blog" />
        <ListMenuMobile text="Courses" />
        <ListMenuMobile text="Discord" />
        <ListMenuMobile text="Chats" />
        <ListMenuMobile text="Calls" />
        <ListMenuMobile text="Workshops" />
        <ListMenuMobile text="About" />
      </ul>

      <div className="flex h-36 items-center justify-center">
        <motion.button
          className="hidden items-center justify-center gap-3 rounded-full border-2 border-slate-200 px-6 py-3 lg:flex"
          whileHover={{ borderColor: "var(--slate-900)" }}
        >
          <SunSvg className="h-6" />
          <p className="text-xs">Berganti ke mode gelap</p>
        </motion.button>
      </div>
    </motion.div>
  );
}
type ListMenuMobileProps = {
  text: string;
};

function ListMenuMobile({ text }: ListMenuMobileProps) {
  return (
    <motion.li
      whileHover={{ backgroundColor: "var(--gray-100)" }}
      className="flex h-20 cursor-pointer items-center border-b bg-white px-10 text-sm first-of-type:border-t"
    >
      {text}
    </motion.li>
  );
}
