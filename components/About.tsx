"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const skills = [
  { label: "Frontend Engineering", pct: 95 },
  { label: "Creative Development", pct: 90 },
  { label: "UI / UX Design", pct: 80 },
  { label: "Backend & APIs", pct: 72 },
];

const stack = [
  "Next.js", "React", "TypeScript", "Framer Motion",
  "Three.js", "GSAP", "Tailwind CSS", "Node.js",
  "Figma", "WebGL / GLSL", "Prisma", "PostgreSQL",
];

function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/60 font-medium">{label}</span>
        <span className="text-xs text-white/20 font-mono">{pct}%</span>
      </div>
      <div className="h-px w-full bg-white/[0.06] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: "var(--accent)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative px-6 md:px-10 py-24 md:py-36">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── left: bio ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.3em] uppercase mb-5 font-medium"
            style={{ color: "var(--accent)" }}
          >
            About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-[1.1] tracking-tight text-white mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            Designing at the<br />intersection of code<br />&amp; craft.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-sm leading-relaxed text-white/40 font-light"
          >
            <p>
              I&apos;m Sahil — a creative developer who sits at the boundary between
              design and engineering. I believe the best digital products feel
              effortless because they were <em className="text-white/60 not-italic">built</em> effortlessly, with obsessive
              attention to every interaction.
            </p>
            <p>
              With 4+ years of experience shipping products for startups and
              established brands, I specialise in scroll-driven experiences,
              WebGL visuals, and high-performance React architectures that
              scale without sacrificing beauty.
            </p>
          </motion.div>

          {/* photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 relative w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden border border-white/[0.07]"
          >
            <Image
              src="/DP.jpeg"
              alt="Sahil Gawa"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>

        {/* ── right: skills + stack ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* skill bars */}
          <p className="text-[10px] tracking-[0.3em] uppercase mb-8 font-medium text-white/20">
            Proficiency
          </p>
          <div className="mb-14">
            {skills.map((s, i) => (
              <SkillBar key={s.label} {...s} delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* tech stack grid */}
          <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-medium text-white/20">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((t) => (
              <span
                key={t}
                className="text-[11px] tracking-wide px-3.5 py-2 rounded-full font-medium transition-all duration-200 hover:border-white/20 hover:text-white/60"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* availability badge */}
          <div className="mt-12 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span className="text-xs text-white/40 tracking-wider">
              Available for new projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
