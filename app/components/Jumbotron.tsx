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
      <div className="overflow-x-hidden px-[10vw] py-11">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-1 md:gap-0">
          <motion.div
            className="pt-16 lg:order-1 lg:py-0"
            variants={variant}
            initial="initial"
            animate="animate"
          >
            <motion.p className="text-4xl leading-snug" variants={textVariant}>
              Mencegah peternak merugi melalui aplikasi pakar berkualitas
            </motion.p>
            <motion.button
              className="mt-14 rounded-full bg-black px-7 py-6 font-medium text-white lg:mt-7"
              variants={textVariant}
              whileTap={{ scale: 0.97, backgroundColor: "var(--slate-950)" }}
              transition={{ duration: 0.1 }}
            >
              Mulai Konsultasi
            </motion.button>
          </motion.div>
          <div className="">
            <motion.div
              className="relative aspect-[4/3] w-full"
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
      </div>
    </MotionConfig>
  );
}
