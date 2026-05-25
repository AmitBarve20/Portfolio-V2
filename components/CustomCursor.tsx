"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const springX = useSpring(0, { stiffness: 700, damping: 40, mass: 0.08 });
  const springY = useSpring(0, { stiffness: 700, damping: 40, mass: 0.08 });
  const trailX = useSpring(0, { stiffness: 200, damping: 30, mass: 0.4 });
  const trailY = useSpring(0, { stiffness: 200, damping: 30, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
    // Skip cursor on touch-primary devices (phones, tablets)
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      springX.set(e.clientX);
      springY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("a, button, [role='button']");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [springX, springY, trailX, trailY]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* dot — snaps fast */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          background: "#ffffff",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hovering ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.2 } }}
      />

      {/* ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/30"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ width: { duration: 0.25 }, height: { duration: 0.25 } }}
      />
    </>
  );
}
