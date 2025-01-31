"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import ConnectBtn from "./ConnectBtn";

export const FloatingNav = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Ensures visibility on initial load
  useEffect(() => {
    setVisible(true);
  }, []);

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (current) => {
      if (typeof current === "number") {
        // Mark that we've started scrolling
        if (!hasScrolled && current > 0) {
          setHasScrolled(true);
        }
        // Only check direction if we've scrolled at least once
        if (hasScrolled) {
          const direction =
            current! - scrollYProgress.getPrevious()!;
          if (scrollYProgress.get() < 0.05) {
            setVisible(true);
          } else {
            if (direction < 0) {
              setVisible(true);
            } else {
              setVisible(false);
            }
          }
        }
      }
    }
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed top-0 inset-x-0  h-[8.62rem] max-[730px]:h-[8rem] max-[600px]:h-[7.5rem] bg-[#081425] z-[40] items-center",
          className
        )}
      >
        <div className="max-w-[120rem] w-[90%] mx-auto flex items-center justify-between">
          <div className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-text-accent via-text-primary to-text-secondary  font-bold text-4xl">
            CoolCats
          </div>

          <ConnectBtn onClick={onClick}>
            connect wallet
          </ConnectBtn>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
