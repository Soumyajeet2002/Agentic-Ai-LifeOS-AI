"use client";

import {
  motion,
  Variants,
} from "motion/react";

import { ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.2, 0, 0, 1],
    },
  },
};

export function Stagger({
  children,
}: StaggerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div variants={item}>
      {children}
    </motion.div>
  );
}