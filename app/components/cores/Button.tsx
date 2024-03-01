"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ForwardRefRenderFunction } from "react";

type TButton = {
  hoverScale?: number | string | undefined;
  tapScale?: number | string | undefined;
};

export const Button: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & TButton
> = ({ className, children, onClick, hoverScale, tapScale }, ref) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      ref={ref}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ opacity: 0.8, scale: hoverScale }}
      whileTap={{ opacity: 1, scale: tapScale }}
    >
      {children}
    </motion.button>
  );
};
