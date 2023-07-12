"use client";
import lele from "@/public/lele jumbotron.png";
import Image from "next/image";
import { MotionConfig, Variants, motion } from "framer-motion";

const variant: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.5 } },
};
const textVariant: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export default function Jumbotron() {
  return (
    <MotionConfig
      transition={{ duration: 0.4, type: "tween", ease: "easeOut" }}
    >
      <div className="flex justify-between gap-10 px-[8vw] py-11">
        <motion.div
          className="w-5/12 pt-16"
          variants={variant}
          initial="initial"
          animate="animate"
        >
          <motion.p className="text-4xl leading-snug" variants={textVariant}>
            Mencegah peternak merugi melalui aplikasi pakar berkualitas
          </motion.p>
          <motion.button
            className="mt-14 rounded-full bg-black px-6 py-5 text-lg font-medium text-white"
            variants={textVariant}
            whileTap={{ scale: 0.97, backgroundColor: "var(--slate-950)" }}
            transition={{ duration: 0.1 }}
          >
            Mulai Konsultasi
          </motion.button>
        </motion.div>
        <div className="w-7/12">
          <motion.div
            className="relative h-96 w-full"
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image
              src={lele}
              fill
              style={{ objectFit: "contain" }}
              alt="lele icon"
            />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
