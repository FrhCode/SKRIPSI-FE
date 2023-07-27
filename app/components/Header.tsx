"use client";
import SunSvg from "@/Components/SunSvg";
import React, { useEffect, useState } from "react";
import { motion, MotionConfig, Variants } from "framer-motion";
import ColoredBorderRadiusSvg from "@/Components/ColoredBorderRadiusSvg";
import Image from "next/image";
import leleIcon from "@/public/image-260nw-2278720581.png";

export default function Header() {
  return (
    <div className="px-[5vw] py-11">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-2xl font-medium tracking-wide">Dokter Lele</p>
        <ul className="flex gap-9 font-medium text-slate-500">
          <ListMenu text="Blog" />
          <ListMenu text="Courses" />
          <ListMenu text="Discord" />
          <ListMenu text="Chats" />
          <ListMenu text="Calls" />
          <ListMenu text="Workshops" />
          <ListMenu text="About" />
        </ul>
        <div className="flex gap-4">
          <motion.button
            className="flex items-center justify-center rounded-full border-2 border-slate-200 p-3"
            whileHover={{ borderColor: "var(--slate-900)" }}
          >
            <SunSvg className="h-7" />
          </motion.button>

          <AnimationButton />
        </div>
      </div>
    </div>
  );
}

type ListMenuProps = {
  text: string;
};

function ListMenu({ text }: ListMenuProps) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <MotionConfig transition={{ duration: 0.1 }}>
      <motion.li
        className="group relative cursor-pointer text-lg"
        animate={isHovering ? { color: "var(--slate-950)" } : {}}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {text}
        <motion.div
          className="h-[2px] rounded bg-black duration-150"
          initial={{ width: 0 }}
          animate={isHovering ? { width: "100%" } : { width: "0%" }}
        ></motion.div>
      </motion.li>
    </MotionConfig>
  );
}

function AnimationButton() {
  const rotationVariants: Variants = {
    rotateToleft: {
      rotate: [360, 0],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    rotateToRight: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const [rotationDirection, setRotationDirection] = useState<
    "rotateToleft" | "rotateToRight"
  >("rotateToleft");

  return (
    <motion.button
      className="relative p-2"
      onHoverStart={() => {
        setRotationDirection("rotateToRight");
      }}
      onHoverEnd={() => {
        setRotationDirection("rotateToleft");
      }}
    >
      <div className="relative h-9 w-9">
        <Image
          src={leleIcon}
          fill
          style={{ objectFit: "cover" }}
          alt="lele icon"
        />
      </div>
      <motion.div
        className="absolute inset-0"
        variants={rotationVariants}
        animate={rotationDirection}
      >
        <ColoredBorderRadiusSvg className="h-full w-full" />
      </motion.div>
    </motion.button>
  );
}
