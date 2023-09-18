import Symptom from "@/types/Symptom";
import { Variants, motion } from "framer-motion";

interface Props {
  symptom: Symptom;
  checked?: boolean;
  onClick: () => void;
}

const containerVariant: Variants = {
  active: {
    border: "2px solid var(--blue-600)",
  },
  inActive: {
    border: "2px solid var(--transparent)",
  },
};

const dotContainerVariant: Variants = {
  active: {
    border: "2px solid var(--blue-600)",
  },
  inActive: {
    border: "2px solid var(--slate-200)",
  },
};
const dotVariant: Variants = {
  active: {
    scale: 1,
  },
  inActive: {
    scale: 0,
  },
};

export default function SymptomCheckBox({
  symptom: { name, code },
  checked,
  onClick,
}: Props) {
  const state = checked ? "active" : "inActive";

  return (
    <motion.div
      variants={containerVariant}
      initial="inActive"
      animate={state}
      className="flex cursor-pointer items-center justify-between gap-5 rounded-lg px-4 py-3 shadow-sm transition"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <span>{name}</span>
        <span className="text-sm text-gray-400">{code}</span>
      </div>
      <div>
        <motion.div
          variants={dotContainerVariant}
          initial="inActive"
          animate={state}
          className="flex h-5 w-5 items-center justify-center rounded-full"
        >
          <motion.div
            variants={dotVariant}
            initial="inActive"
            animate={state}
            className="h-[8px] w-[8px] rounded-full bg-blue-600"
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
