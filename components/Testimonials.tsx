"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TestimonialsEditorial from "@/components/ui/editorial-testimonial";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative px-6 md:px-10 py-16 md:py-32" style={{ background: "#0a0a0a" }}>
      {/* top edge — blends from Expertise's #000000 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 140,
          background: "linear-gradient(to bottom, #000000, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 flex items-center gap-4"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase font-medium"
          style={{ color: "var(--accent)" }}
        >
          Kind Words
        </p>
        <div className="h-px flex-1 max-w-[60px] bg-white/[0.06]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <TestimonialsEditorial />
      </motion.div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
