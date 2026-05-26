"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────────── */

const TEXT_LINES: Array<Array<{ text: string; hi: boolean }>> = [
  [
    { text: "I design ", hi: false },
    { text: "production-ready digital products", hi: true },
  ],
  [
    { text: "backed by ", hi: false },
    { text: "2 years of experience", hi: true },
    { text: ", ", hi: false },
    { text: "working across", hi: false },
    { text: ",", hi: false },
  ],
  [
    { text: "SaaS platforms", hi: true },
    { text: ",", hi: true },
    { text: " AI tools", hi: true },
    { text: " & ", hi: true },
  { text: "mobile applications.", hi: true }],
];

// x/y are the CENTRE of each badge (translate(-50%,-50%) applied in the component)
const BADGES = [
  { label: "Product Thinking",   x: 19, y: 24, delay: 0.0 },  // top-left
  { label: "Design Systems",     x: 68, y: 20, delay: 0.5 },  // top-right
  { label: "UX Strategy",        x: 11, y: 42, delay: 1.0 },  // left-upper
  { label: "Interaction Design", x: 82, y: 40, delay: 0.3 },  // right-upper
  { label: "Prototyping",        x: 11, y: 58, delay: 0.8 },  // left-lower
  { label: "AI Workflows",       x: 82, y: 60, delay: 1.2 },  // right-lower
  { label: "SaaS Products",      x: 20, y: 76, delay: 0.6 },  // bottom-left
  { label: "Wireframing",        x: 68, y: 76, delay: 1.5 },  // bottom-right
  { label: "Usability Testing",  x: 30, y: 85, delay: 0.2 },  // bottom centre-left
  { label: "Motion Design",      x: 58, y: 85, delay: 0.9 },  // bottom centre-right
  { label: "Framer",             x: 36, y: 16, delay: 1.3 },  // top centre-left
  { label: "Figma",              x: 56, y: 14, delay: 0.4 },  // top centre-right
] as const;

/* ── SVG: Concentric Rings + Radial Spokes ────────────────────────── */

function ConcentricGrid() {
  const cx = 720;
  const cy = 450;

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {[100, 200, 310, 430, 560, 700, 850].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="white"
          strokeWidth={0.6}
          strokeOpacity={Math.max(0.008, 0.072 - i * 0.009)}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * 860}
            y2={cy + Math.sin(a) * 860}
            stroke="white"
            strokeWidth={0.35}
            strokeOpacity={0.032}
          />
        );
      })}
    </svg>
  );
}

/* ── Grain noise ──────────────────────────────────────────────────── */

function GrainOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <filter id="xp-noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#xp-noise)" opacity={0.038} />
    </svg>
  );
}

/* ── Ambient pulsing glow ─────────────────────────────────────────── */

function AmbientGlow({ visible }: { visible: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      animate={!reducedMotion && visible ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.8 }}
      transition={{ duration: 5, repeat: !reducedMotion && visible ? Infinity : 0, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse 52% 42% at 50% 50%, rgba(200,255,0,0.038) 0%, transparent 70%)",
      }}
    />
  );
}

/* ── Cursor-following glow ────────────────────────────────────────── */

function MouseGlow({
  mx,
  my,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const bg = useMotionTemplate`radial-gradient(680px circle at ${mx}px ${my}px, rgba(200,255,0,0.048) 0%, transparent 62%)`;
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: bg }}
    />
  );
}

/* ── Floating badge ───────────────────────────────────────────────── */

interface BadgeProps {
  label: string;
  x: number;
  y: number;
  delay: number;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  visible: boolean;
  sectionVisible: boolean;
}

function Badge({ label, x, y, delay, index, mouseX, mouseY, visible, sectionVisible }: BadgeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  /* Magnetic spring */
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 140, damping: 18 });
  const springY = useSpring(magY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    const update = () => {
      const el = elRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = mouseX.get() - (r.left + r.width / 2);
      const dy = mouseY.get() - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const PULL = 160;
      if (dist > 0 && dist < PULL) {
        const f = ((1 - dist / PULL) * 24) / dist;
        magX.set(dx * f);
        magY.set(dy * f);
      } else {
        magX.set(0);
        magY.set(0);
      }
    };
    const a = mouseX.on("change", update);
    const b = mouseY.on("change", update);
    return () => {
      a();
      b();
    };
  }, [mouseX, mouseY, magX, magY]);

  const floatAmt = 6 + (index % 3) * 3;
  const floatDur = 3.2 + (index % 5) * 0.45;

  /* Stop float animation when section is off-screen or user prefers reduced motion */
  const floatAnimate =
    !reducedMotion && sectionVisible
      ? { y: [0, -floatAmt, 0] }
      : { y: 0 };

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      {/* Entry + spring magnetic offset */}
      <motion.div
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.72 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72 }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          delay: reducedMotion ? 0 : delay * 0.38 + 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Continuous float — paused when offscreen */}
        <motion.div
          animate={floatAnimate}
          transition={{
            duration: floatDur,
            repeat: !reducedMotion && sectionVisible ? Infinity : 0,
            ease: "easeInOut",
            delay: delay * 0.25,
          }}
        >
          {/* Visual pill + hover glow */}
          <motion.div
            ref={elRef}
            whileHover={
              reducedMotion
                ? {}
                : {
                    scale: 1.1,
                    boxShadow:
                      "0 0 28px rgba(200,255,0,0.2), 0 0 48px rgba(200,255,0,0.08), 0 4px 24px rgba(0,0,0,0.6)",
                  }
            }
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            style={{
              padding: "7px 17px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              color: "rgba(255,255,255,0.62)",
              fontSize: "11.5px",
              letterSpacing: "0.06em",
              fontWeight: 400,
              whiteSpace: "nowrap",
              cursor: "default",
              boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
              userSelect: "none",
            }}
          >
            {label}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Text reveal ──────────────────────────────────────────────────── */

function TextReveal({ visible }: { visible: boolean }) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const line = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      style={{
        maxWidth: 660,
        textAlign: "center",
        fontSize: "clamp(1.05rem, 2vw, 1.28rem)",
        lineHeight: 1.88,
        fontWeight: 300,
        letterSpacing: "0.01em",
        margin: 0,
      }}
    >
      {TEXT_LINES.map((segments, i) => (
        <motion.span key={i} variants={line} style={{ display: "block" }}>
          {segments.map((seg, j) => (
            <span
              key={j}
              style={{
                color: seg.hi
                  ? "rgba(255,255,255,0.96)"
                  : "rgba(255,255,255,0.3)",
                fontWeight: seg.hi ? 400 : 300,
                transition: "color 0.3s",
              }}
            >
              {seg.text}
            </span>
          ))}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ── Main export ──────────────────────────────────────────────────── */

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.22 });

  /* Mouse position for glow + magnetic */
  const rawX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 720);
  const rawY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 450);
  const smoothX = useSpring(rawX, { stiffness: 48, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 48, damping: 22 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    },
    [rawX, rawY],
  );

  return (
    <section
      id="expertise"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Background layers ── */}
      <ConcentricGrid />
      <GrainOverlay />
      <AmbientGlow visible={visible} />
      <MouseGlow mx={smoothX} my={smoothY} />

      {/* Top + bottom edge fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #050505 0%, transparent 14%, transparent 86%, #0a0a0a 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Floating badges (desktop only) ── */}
      <div
        className="hidden lg:block"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {BADGES.map((b, i) => (
          <div key={b.label} style={{ pointerEvents: "auto" }}>
            <Badge
              {...b}
              index={i}
              mouseX={rawX}
              mouseY={rawY}
              visible={visible}
              sectionVisible={visible}
            />
          </div>
        ))}
      </div>

      {/* ── Centre content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "80px 24px",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              display: "block",
              width: 28,
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(200,255,0,0.7))",
            }}
          />
          <span
            style={{
              fontSize: "10.5px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#c8ff00",
              fontWeight: 500,
            }}
          >
            Expertise &amp; Craft
          </span>
          <span
            style={{
              display: "block",
              width: 28,
              height: "0.5px",
              background:
                "linear-gradient(to left, transparent, rgba(200,255,0,0.7))",
            }}
          />
        </motion.div>

        {/* Main paragraph */}
        <TextReveal visible={visible} />

        {/* Mobile badge row */}
        <motion.div
          className="flex lg:hidden flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          style={{ maxWidth: 500, marginTop: 8 }}
        >
          {BADGES.map((b) => (
            <span
              key={b.label}
              style={{
                padding: "5px 14px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)",
                fontSize: "11px",
                letterSpacing: "0.05em",
                fontWeight: 400,
                userSelect: "none",
              }}
            >
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
