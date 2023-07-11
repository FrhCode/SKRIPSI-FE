"use client";
import SunSvg from "@/Components/SunSvg";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import ColoredBorderRadiusSvg from "@/Components/ColoredBorderRadiusSvg";
import Image from "next/image";
import leleIcon from "@/public/image-260nw-2278720581.png";

export default function Header() {
  useEffect(() => {
    console.log("HI");
  });

  return (
    <div className="items-center flex justify-between px-[5vw] py-11">
      <p className="text-2xl font-medium tracking-wide">Dokter Lele</p>
      <ul className="flex font-medium gap-9 text-slate-600">
        <li>Blog</li>
        <li>Courses</li>
        <li>Discord</li>
        <li>Chats</li>
        <li>Calls</li>
        <li>Workshops</li>
        <li>About</li>
      </ul>
      <div className="flex gap-4">
        <motion.button
          className="flex items-center justify-center p-3 border-2 rounded-full border-slate-400"
          whileHover={{ borderColor: "var(--slate-900)" }}
        >
          <SunSvg className="h-7" />
        </motion.button>

        <AnimationButton />
      </div>
    </div>
  );
}

export function AnimationButton() {
  const rotationVariants: Variants = {
    rotateToleft: {
      rotate: -360,
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      },
    },
    rotateToRight: {
      rotate: 360,
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
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
      // whileHover={{ borderColor: "var(--slate-900)" }}
    >
      <div className="relative w-9 h-9">
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
        <ColoredBorderRadiusSvg className="w-full h-full" />
      </motion.div>
    </motion.button>
  );
}
