"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const CV_HREF =
  "https://docs.google.com/document/d/1usAEBP37pGR95JOsTO5JfTN985KiGm9H_wc9uoObvzg/edit?tab=t.0";

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], [0, 1]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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

        {/* nav links — desktop */}
        <nav className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-8">
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

        {/* CTA — desktop */}
        <a
          href={CV_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 hidden md:flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-black px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(200,255,0,0.4)]"
          style={{ background: "var(--accent)" }}
        >
          <DownloadIcon />
          Download CV
        </a>

        {/* Hamburger — mobile */}
        <button
          className="relative z-[60] md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <motion.span
            className="block w-5 h-px bg-white/70 origin-center"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="block w-3.5 h-px bg-white/40 origin-center"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-px bg-white/70 origin-center"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col px-8 pt-24 pb-12 md:hidden"
            style={{
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {links.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="text-4xl font-light tracking-tight text-white/70 hover:text-white active:text-white transition-colors py-3 border-b border-white/[0.05]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={CV_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center gap-2.5 text-xs tracking-widest uppercase font-semibold text-black px-6 py-3.5 rounded-full transition-all duration-300 active:scale-95"
                style={{ background: "var(--accent)" }}
              >
                <DownloadIcon />
                Download CV
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
