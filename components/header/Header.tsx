"use client";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "@/zustand/store";
import AnimationButton from "./AnimationButton";
import ListMenu from "../shared/ListMenu";
import MiniNav from "./MiniNav";
import SunSvg from "../SunSvg";
import HamburgerSvg from "../HamburgerSvg";
import Link from "next/link";

export default function Header() {
  const isNavOpen = useStore((state) => state.isNavOpen);
  const toggleIsNavOpen = useStore((state) => state.toggleIsNavOpen);

  const toogleButtonMiniNavRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative px-[5vw] py-11">
      <div className="mx-auto flex max-w-[95rem] items-center justify-between">
        <Link href={"/"}>
          <p className="text-2xl font-medium leading-4 tracking-wide">
            Dokter Lele
          </p>
        </Link>
        <ul className="hidden gap-9 font-medium text-slate-500 lg:flex">
          <ListMenu>
            <p className="leading-4">Blog</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">Courses</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">Discord</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">Chats</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">Calls</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">Workshops</p>
          </ListMenu>
          <ListMenu>
            <p className="leading-4">About</p>
          </ListMenu>
        </ul>
        <div className="flex gap-4">
          <motion.button
            className="hidden items-center justify-center rounded-full border-2 border-slate-200 p-3 lg:flex"
            whileHover={{ borderColor: "var(--slate-900)" }}
          >
            <SunSvg className="h-7" />
          </motion.button>

          <motion.button
            ref={toogleButtonMiniNavRef}
            className="flex items-center justify-center rounded-full border-2 border-slate-200 p-3 transition hover:border-slate-900 focus:border-slate-900 lg:hidden"
            onClick={(e) => toggleIsNavOpen()}
            // whileHover={{ borderColor: "var(--slate-900)" }}
          >
            <HamburgerSvg className="h-7" />
          </motion.button>
          <Link href={"/login"}>
            <AnimationButton />
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isNavOpen && <MiniNav toogleButtonRef={toogleButtonMiniNavRef} />}
      </AnimatePresence>
    </div>
  );
}
