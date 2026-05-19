"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  /* fade-in nav opacity on first 80px scroll */
  const navBg = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* backdrop blur pill when scrolled */}
      <motion.div
        className="absolute inset-0 rounded-none border-b border-white/5"
        style={{
          opacity: navBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(10,10,10,0.7)",
        }}
      />

      {/* logo */}
      <a href="/" className="relative z-10 flex items-center gap-2 group">
        <span className="text-sm font-semibold tracking-tight text-white">
          Amit<span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </a>

      {/* nav links */}
      <nav className="relative z-10 hidden md:flex items-center gap-8">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300 font-medium"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="mailto:amitbarve2003@gmail.com"
        className="relative z-10 hidden md:flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-black px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(200,255,0,0.4)]"
        style={{ background: "var(--accent)" }}
      >
        Contact Me
      </a>

      {/* mobile hamburger placeholder */}
      <button className="relative z-10 md:hidden flex flex-col gap-1.5 p-1"
        aria-label="Menu">
        <span className="block w-5 h-px bg-white/60" />
        <span className="block w-3.5 h-px bg-white/40" />
      </button>
    </motion.header>
  );
}
