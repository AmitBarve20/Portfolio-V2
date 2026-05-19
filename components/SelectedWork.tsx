"use client";

import { useRef, useCallback } from "react";
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
}

const PROJECTS: Project[] = [
  {
    id: "bondxe",
    index: "01",
    title: "BondXe",
    subtitle: "App Design Case Study",
    tag: "Social Experience Platform",
    year: "2024",
    description:
      "Redefining social connections through shared experiences, group interactions, and intelligent matching systems.",
    accent: "#8b5cf6",
    glowRgb: "139,92,246",
    href: "https://www.behance.net/gallery/247840347/BondXe-Social-Event-Based-Networking-App",
  },
  {
    id: "mirrortrade",
    index: "02",
    title: "MirrorTrade",
    subtitle: "Fintech UX Case Study",
    tag: "Copy Trading Platform",
    year: "2024",
    description:
      "Designing a scalable and accessible trading experience focused on clarity, trust, and user confidence.",
    accent: "#d4a017",
    glowRgb: "212,160,23",
    href: "https://www.behance.net/gallery/228201027/MirrorTrade-Copy-trading-Platform-UIUx-case-study",
  },
];

/* ── BondXe mockup ────────────────────────────────────────────────── */

function BondXeVisual() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(145deg, #1c0d4a 0%, #0d0820 55%, #200d54 100%)",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "10%",
          width: "80%",
          height: "85%",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.32) 0%, transparent 70%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Avatar rings */}
      {[
        { left: "22%", top: "20%", size: 76, hex: "#7c3aed", op: 0.9 },
        { left: "47%", top: "13%", size: 65, hex: "#8b5cf6", op: 0.75 },
        { left: "41%", top: "37%", size: 60, hex: "#a78bfa", op: 0.82 },
      ].map((av, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: av.left,
            top: av.top,
            width: av.size,
            height: av.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 36% 36%, ${av.hex}88, ${av.hex}2a)`,
            border: `1.5px solid ${av.hex}55`,
            opacity: av.op,
            boxShadow: `0 0 28px ${av.hex}55, inset 0 0 16px ${av.hex}22`,
          }}
        />
      ))}

      {/* Dashed connector lines */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <line
          x1="36%" y1="32%" x2="53%" y2="24%"
          stroke="rgba(139,92,246,0.38)"
          strokeWidth={1}
          strokeDasharray="5 5"
        />
        <line
          x1="39%" y1="37%" x2="51%" y2="52%"
          stroke="rgba(139,92,246,0.28)"
          strokeWidth={1}
          strokeDasharray="5 5"
        />
      </svg>

      {/* Match score card */}
      <div
        style={{
          position: "absolute",
          bottom: "17%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          padding: "14px 18px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.055)",
          border: "1px solid rgba(139,92,246,0.38)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "rgba(167,139,250,0.85)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 7,
          }}
        >
          Compatibility Score
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          94%
        </p>
        <div
          style={{
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "94%",
              height: "100%",
              background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Floating notification pills */}
      {[
        { text: "💬  Group Chat", top: "11%", right: "5%" },
        { text: "🎯  14 Matches", top: "58%", right: "3%" },
      ].map((pill) => (
        <div
          key={pill.text}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: pill.top,
            right: pill.right,
            padding: "6px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 11,
            color: "rgba(255,255,255,0.68)",
            whiteSpace: "nowrap",
          }}
        >
          {pill.text}
        </div>
      ))}
    </div>
  );
}

/* ── MirrorTrade mockup ───────────────────────────────────────────── */

function MirrorTradeVisual() {
  const pts: [number, number][] = [
    [0, 172], [40, 148], [82, 153], [128, 120], [170, 98],
    [212, 104], [254, 76], [296, 55], [332, 43], [372, 23], [400, 14],
  ];
  const lineD = pts.map(([x, y]) => `${x},${y}`).join(" L ");
  const fillD = `M ${lineD} L 400,180 L 0,180 Z`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(160deg, #0e0900 0%, #1c1300 48%, #090700 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0",
          left: "5%",
          width: "90%",
          height: "65%",
          background:
            "radial-gradient(ellipse, rgba(212,160,23,0.14) 0%, transparent 70%)",
          filter: "blur(52px)",
          pointerEvents: "none",
        }}
      />

      {/* Metric cards */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "7%",
          right: "7%",
          display: "flex",
          gap: 10,
        }}
      >
        {[
          { label: "Portfolio", value: "+18.4%", gold: true },
          { label: "Win Rate", value: "76%" },
          { label: "Trades", value: "243" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 13,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.32)",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: s.gold ? "#d4a017" : "rgba(255,255,255,0.88)",
              }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "3%",
          right: "3%",
          height: "33%",
        }}
      >
        <svg
          viewBox="0 0 400 180"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sw-chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4a017" stopOpacity={0.34} />
              <stop offset="100%" stopColor="#d4a017" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={fillD} fill="url(#sw-chart-grad)" />
          <path
            d={`M ${lineD}`}
            fill="none"
            stroke="#d4a017"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={400} cy={14} r={4} fill="#d4a017" />
          <circle cx={400} cy={14} r={9} fill="rgba(212,160,23,0.2)" />
        </svg>
      </div>

      {/* Top traders list */}
      <div
        style={{
          position: "absolute",
          bottom: "7%",
          left: "7%",
          right: "7%",
        }}
      >
        <p
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 9,
          }}
        >
          Top Traders
        </p>
        {[
          { name: "Alex K.", ret: "+34.2%" },
          { name: "Marie L.", ret: "+28.7%" },
        ].map((t) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px 0",
              borderBottom: "1px solid rgba(255,255,255,0.055)",
            }}
          >
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
              {t.name}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d4a017" }}>
              {t.ret}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Project card ─────────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

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

  /* Mockup parallax */
  const mockX = useMotionValue(0);
  const mockY = useMotionValue(0);
  const mockXSp = useSpring(mockX, { stiffness: 110, damping: 28 });
  const mockYSp = useSpring(mockY, { stiffness: 110, damping: 28 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const rx = (e.clientX - r.left) / r.width - 0.5;
      const ry = (e.clientY - r.top) / r.height - 0.5;
      rotXRaw.set(-ry * 10);
      rotYRaw.set(rx * 10);
      glowX.set(((e.clientX - r.left) / r.width) * 100);
      glowY.set(((e.clientY - r.top) / r.height) * 100);
      mockX.set(rx * 20);
      mockY.set(ry * 20);
    },
    [rotXRaw, rotYRaw, glowX, glowY, mockX, mockY],
  );

  const onLeave = useCallback(() => {
    rotXRaw.set(0);
    rotYRaw.set(0);
    glowX.set(50);
    glowY.set(50);
    mockX.set(0);
    mockY.set(0);
  }, [rotXRaw, rotYRaw, glowX, glowY, mockX, mockY]);

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
      <motion.div
        ref={cardRef}
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
          minHeight: 620,
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
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

        {/* ── Mockup visual area (top 58%) ── */}
        <div
          style={{
            position: "relative",
            height: "58%",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: "-12%",
              x: mockXSp,
              y: mockYSp,
            }}
          >
            {project.id === "bondxe" ? <BondXeVisual /> : <MirrorTradeVisual />}
          </motion.div>

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
              View Case Study
            </span>

            {/* CTA arrow circle */}
            <motion.a
              href={project.href}
              aria-label={`View ${project.title} case study`}
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
                textDecoration: "none",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              →
            </motion.a>
          </div>
        </div>
      </motion.div>
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
      className="relative overflow-hidden py-28 md:py-36"
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
      <div className="text-center mb-16 md:mb-20 px-6">
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
            fontSize: "clamp(3rem, 9vw, 8.5rem)",
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
      <div className="flex justify-center mt-14 md:mt-16 px-6">
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
