import Image from "next/image";
import leleIcon from "@/public/image-260nw-2278720581.png";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import ColoredBorderRadiusSvg from "@/Components/ColoredBorderRadiusSvg";

export default function AnimationButton() {
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
