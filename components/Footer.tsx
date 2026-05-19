"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 md:px-10 pt-20 pb-10 overflow-hidden">

      {/* big contact line */}
      <div className="mb-16">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ color: "var(--accent)" }}>
          Get In Touch
        </p>
        <a
          href="mailto:amitbarve2003@gmail.com"
          className="group inline-flex items-end gap-4"
        >
          <span
            className="font-black leading-none tracking-[-0.04em] text-white/10 hover:text-white transition-colors duration-500 block"
            style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
          >
            Let&apos;s work
            <br />
            <span className="text-white group-hover:text-white/80 transition-colors">
              together
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </a>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-10" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xs text-white/20 tracking-wider">
          © 2025 Sahil Gawa — Built with Next.js &amp; Framer Motion
        </p>

        <div className="flex items-center gap-6">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-white/20 hover:text-white transition-colors duration-300 font-medium"
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
