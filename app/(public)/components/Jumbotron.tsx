"use client";
import lele from "@/public/lele jumbotron.png";
import Image from "next/image";
import { MotionConfig, Variants, motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/container/Container";

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
      <Container.Root className="flex h-[calc(100dvh-144px)] items-center overflow-hidden lg:h-[calc(100dvh-144px-120px)]">
        <Container.Content className="flex h-full flex-col gap-0 md:gap-10 lg:flex-row">
          <motion.div
            className="relative h-2/4 w-full lg:order-1 lg:h-full"
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
          <motion.div
            className="h-2/4 py-0 lg:h-full lg:pt-16"
            variants={variant}
            initial="initial"
            animate="animate"
          >
            <motion.p
              className="text-3xl md:text-4xl md:leading-[3.5rem]"
              variants={textVariant}
            >
              Mencegah peternak merugi melalui aplikasi pakar berkualitas
            </motion.p>
            <Link href={"/consultation"}>
              <motion.button
                className="mt-14 rounded-full bg-black px-7 py-6 font-medium text-white lg:mt-7"
                variants={textVariant}
                whileTap={{ scale: 0.97, backgroundColor: "var(--slate-950)" }}
                transition={{ duration: 0.1 }}
              >
                Mulai Konsultasi
              </motion.button>
            </Link>
          </motion.div>
        </Container.Content>
      </Container.Root>
    </MotionConfig>
  );
}
