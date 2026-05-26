"use client";

import { useRef, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useInView,
} from "framer-motion";

/* ── Types & Data ─────────────────────────────────────────────────── */

interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  description: string;
  accent: string;
  glowRgb: string;
  href: string;
  cta?: string;
}

const PROJECTS: Project[] = [
  {
    id: "Doot",
    index: "",
    title: "Doot",
    subtitle: "",
    tag: "AI-POWERED EMAIL AUTOMATION PLATFORM",
    year: "",
    description:
      "Designed an AI-driven email automation platform that enables users to create campaigns, generate personalized email templates, and send customized emails at scale through intelligent automation workflows.",
    accent: "#22c55e",
    glowRgb: "34,197,94",
    href: "https://main.d2sfg7151tie0h.amplifyapp.com/",
    cta: "View Platform",
  },
  {
    id: "bondxe",
    index: "",
    title: "BondXe",
    subtitle: "",
    tag: "Social Networking Application",
    year: "",
    description:
      "Designed a social experience application that helps users discover communities, build meaningful connections, and engage through shared real-world experiences.",
    accent: "#8b5cf6",
    glowRgb: "139,92,246",
    href: "https://www.behance.net/gallery/247840347/BondXe-Social-Event-Based-Networking-App",
  },
  {
    id: "mirrortrade",
    index: "",
    title: "MirrorTrade",
    subtitle: "",
    tag: "Copy Trading Application",
    year: "",
    description:
      "Designed a copy trading application that enables users to follow experienced traders, track performance transparently, and invest with confidence.",
    accent: "#d4a017",
    glowRgb: "212,160,23",
    href: "https://www.behance.net/gallery/228201027/MirrorTrade-Copy-trading-Platform-UIUx-case-study",
  },
  {
    id: "match-scheduling",
    index: "",
    title: "Scheduling System",
    subtitle: "",
    tag: "SPORTS SCHEDULING Dashboard",
    year: "",
    description:
      "I designed a grid-based scheduling system that makes conflicts visually obvious, enables drag-and-drop assignment, and provides auto-scheduling with human oversight.",
    accent: "#8b5cf6",
    glowRgb: "139,92,246",
    href: "#",
  },
];

/* ── Lazy video: loads & plays only when in viewport ─────────────── */

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Assign src only on first intersection to trigger the network load
          if (!video.src) {
            video.src = src;
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

/* ── Visuals ──────────────────────────────────────────────────────── */

function BondXeVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <LazyVideo src="/BondXe.webm" />
    </div>
  );
}

function MirrorTradeVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* GIF: lazy loaded natively; convert to .webm for further savings */}
      <img
        src="/Mirror%20Trade.gif"
        alt="MirrorTrade app preview"
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function DootVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <LazyVideo src="/Doot.webm" />
    </div>
  );
}

function MatchSchedulingVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <LazyVideo src="/Match%20Scheduling.webm" />
    </div>
  );
}

/* ── Project card ─────────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  /* 3-D tilt */
  const rotXRaw = useMotionValue(0);
  const rotYRaw = useMotionValue(0);
  const rotX = useSpring(rotXRaw, { stiffness: 220, damping: 34 });
  const rotY = useSpring(rotYRaw, { stiffness: 220, damping: 34 });

  /* Cursor glow position */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rgb = project.glowRgb;
  const glowBg = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(${rgb},0.15), transparent 68%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const rx = (e.clientX - r.left) / r.width - 0.5;
      const ry = (e.clientY - r.top) / r.height - 0.5;
      rotXRaw.set(-ry * 10);
      rotYRaw.set(rx * 10);
      glowX.set(((e.clientX - r.left) / r.width) * 100);
      glowY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [rotXRaw, rotYRaw, glowX, glowY],
  );

  const onLeave = useCallback(() => {
    rotXRaw.set(0);
    rotYRaw.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotXRaw, rotYRaw, glowX, glowY]);

  const entryVariant = {
    hidden: { opacity: 0, y: 64, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.95,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={entryVariant} style={{ perspective: "1400px" }}>
      <motion.a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{
          y: -16,
          boxShadow: `0 0 90px rgba(${rgb},0.16), 0 36px 72px rgba(0,0,0,0.65)`,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          borderRadius: 32,
          overflow: "hidden",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* Dynamic cursor glow */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: glowBg,
            pointerEvents: "none",
            zIndex: 4,
            borderRadius: 32,
          }}
        />

        {/* ── Mockup visual area ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {project.id === "bondxe" ? (
              <BondXeVisual />
            ) : project.id === "Doot" ? (
              <DootVisual />
            ) : project.id === "match-scheduling" ? (
              <MatchSchedulingVisual />
            ) : (
              <MirrorTradeVisual />
            )}
          </div>

          {/* Gradient fade into card body */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(to top, #0d0d0d 15%, rgba(13,13,13,0.6) 60%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Index badge top-left */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 28,
              zIndex: 5,
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.14em",
            }}
          >
            {project.index}
          </div>

          {/* Year badge top-right */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              zIndex: 5,
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            {project.year}
          </div>
        </div>

        {/* ── Text content (bottom 42%) ── */}
        <div
          style={{
            padding: "26px 32px 32px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Tag pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 18,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: project.accent,
                flexShrink: 0,
                boxShadow: `0 0 10px ${project.accent}bb`,
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 500,
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Title + description */}
          <div>
            <h3
              style={{
                fontSize: "clamp(1.9rem, 3vw, 2.75rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: 7,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.045em",
                marginBottom: 16,
              }}
            >
              {project.subtitle}
            </p>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.74,
                color: "rgba(255,255,255,0.48)",
                fontWeight: 300,
                maxWidth: "92%",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Footer: divider + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.08em",
              }}
            >
              {project.cta ?? "View Case Study"}
            </span>

            {/* CTA arrow circle */}
            <motion.div
              aria-hidden="true"
              whileHover={{ scale: 1.14, rotate: -45 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: `1px solid rgba(${rgb},0.38)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `rgba(${rgb},0.1)`,
                color: project.accent,
                fontSize: 20,
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              →
            </motion.div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:pt-28 md:pb-36"
      style={{ background: "#050505" }}
    >
      {/* top edge — blends from ScrollySection's #121212 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(to bottom, #121212, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* bottom edge — fades into Expertise's #000000 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(to top, #000000, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Grain texture */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <filter id="sw-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sw-grain)" opacity={0.038} />
      </svg>

      {/* Subtle radial top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Section header ── */}
      <div className="text-center mb-10 md:mb-20 px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 10.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#c8ff00",
            fontWeight: 500,
            marginBottom: 22,
          }}
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(3rem, 7vw, 8.5rem)",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          FEATURED
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
            }}
          >
            PROJECTS
          </span>
        </motion.h2>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── Show all projects CTA ── */}
      <div className="flex justify-center mt-8 md:mt-16 px-6">
        <motion.a
          href="https://www.behance.net/amitbarve"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 32px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "rgba(255,255,255,0.72)",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.07em",
            textDecoration: "none",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,255,0,0.35)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)";
          }}
        >
          <span>View All Projects</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            style={{ opacity: 0.6 }}
          >
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>

      {/* Bottom divider */}
      <div
        style={{
          marginTop: 72,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </section>
  );
}
