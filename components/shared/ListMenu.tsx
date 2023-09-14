"use client";
import { cn } from "@/lib/utils";
import { motion, MotionConfig } from "framer-motion";
import { ReactNode, useState } from "react";

interface ListMenuProps {
  children: ReactNode;
  className?: string;
}

export default function ListMenu({ children, className }: ListMenuProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <MotionConfig transition={{ duration: 0.1 }}>
      <motion.li
        className={cn("group relative cursor-pointer text-lg", className)}
        animate={isHovering ? { color: "var(--slate-950)" } : {}}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {children}
        <motion.div
          className="h-[2px] rounded bg-black duration-150"
          initial={{ width: 0 }}
          animate={isHovering ? { width: "100%" } : { width: "0%" }}
        ></motion.div>
      </motion.li>
    </MotionConfig>
  );
}
