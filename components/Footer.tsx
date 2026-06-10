"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amitt-barve/" },
  { label: "Instagram", href: "https://www.instagram.com/amit.barve_/" },
  { label: "Behance", href: "https://www.behance.net/amitbarve" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 md:px-10 pt-16 pb-10 overflow-hidden">

      {/* big contact line */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ color: "var(--accent)" }}>
          Get In Touch
        </p>
        <p className="text-sm tracking-[0.15em] uppercase text-white/30 mb-3 font-medium">
          Let&apos;s work together
        </p>
        <a
          href="mailto:amitbarve2003@gmail.com"
          className="group inline-block hover:opacity-80 transition-opacity duration-300"
        >
          <span
            className="font-black leading-none tracking-[-0.04em] text-white block"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
          >
            amitbarve2003@gmail.com<span style={{ color: "var(--accent)" }}> :)</span>
          </span>
        </a>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-10" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xs text-white/60 tracking-wider">
          © 2026 Amit Barve -  Made with 💓
        </p>

        <div className="flex items-center gap-6">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300 font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none blur-[100px] opacity-[0.04]"
        style={{ background: "var(--accent)" }}
      />
    </footer>
  );
}
