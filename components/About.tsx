"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ── Skill bars ─────────────────────────────────────────────────────────────────────────

const skills = [
  { label: "Figma", pct: 95 },
  { label: "Framer", pct: 93 },
  { label: "User Experience Design", pct: 90 },
  { label: "Design Systems", pct: 85 },
];

const stack = [
  "Figma", "Framer", "Wireframing", "Prototyping",
  "Design Systems", "Interaction Design", "UX Research", "Information Architecture",
  "Usability Testing", "Product Thinking", "AI Workflow","Adobe Creative Suite", "Figma Make", "Google Stitch", "Claude Design", "UX Pilot",
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

// ── Polaroid stack ─────────────────────────────────────────────────────────────────────

interface StackCard {
  src: string;
  caption: string;
  rotation: number;
}

const STACK: StackCard[] = [
  { src: "/DP.avif",          caption: "the maker",       rotation: -5   },
  { src: "/image%201.avif",   caption: "creative fuel",   rotation:  7.2 },
  { src: "/image%202.avif",   caption: "late nights",     rotation: -4   },
  { src: "/image%203.avif",   caption: "workspace",       rotation:  6   },
  { src: "/image%204.avif",   caption: "always shipping", rotation: -8   },
  { src: "/image%205.avif",   caption: "the process",     rotation:  5   },
  { src: "/image%207.avif",   caption: "always building", rotation: -6   },
];

// Visual transform applied per layer depth (0 = top card)
const LAYER_CFG = [
  { x:  0, y:  0, scale: 1,    opacity: 1   },
  { x: 11, y:  8, scale: 0.96, opacity: 1   },
  { x: -9, y: 15, scale: 0.91, opacity: 1   },
  { x:  6, y: 22, scale: 0.86, opacity: 0.6 },
] as const;

const HIDDEN_CFG = { x: 0, y: 28, scale: 0.82, opacity: 0 };
function PolaroidCard({
  card,
  isTop,
  cardW,
  priority,
}: {
  card: StackCard;
  isTop: boolean;
  cardW: number;
  priority?: boolean;
}) {
  return (
    <div
      style={{
        width: cardW,
        background: "linear-gradient(148deg, #faf8f3 0%, #f3efe5 100%)",
        padding: "9px",
        transition: "box-shadow 0.35s ease",
        boxShadow: isTop
          ? "0 24px 64px rgba(0,0,0,0.72), 0 8px 22px rgba(0,0,0,0.42)"
          : "0 6px 24px rgba(0,0,0,0.55)",
      }}
    >
      {/* Square image */}
      <div
        className="relative overflow-hidden bg-neutral-300"
        style={{ aspectRatio: "1 / 1" }}
      >
        <Image
          src={card.src}
          alt={card.caption}
          fill
          className="object-cover"
          sizes={`${cardW}px`}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>
    </div>
  );
}

function PolaroidStack() {
  const [count, setCount] = useState(0);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const [cardW, setCardW] = useState(218);
  const isDismissing = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const n = STACK.length;
  const topIdx = count % n;

  useEffect(() => {
    const update = () => {
      // Section has px-6 (24px) padding each side = 48px total
      const available = Math.min(window.innerWidth - 48, 300);
      setCardW(Math.max(150, Math.floor(available * (218 / 300))));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const stackW = Math.floor(cardW * (300 / 218));
  const stackH = Math.floor(cardW * (350 / 218));

  // Use effectiveTopIdx so beneath cards start moving the moment the top card exits
  const effectiveTopIdx = exitingIdx !== null ? (topIdx + 1) % n : topIdx;

  const dismiss = () => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    setExitingIdx(topIdx);
    setTimeout(() => {
      setCount((c) => c + 1);
      setExitingIdx(null);
      isDismissing.current = false;
    }, 440);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Dismiss on clear horizontal swipe; tap is handled by onClick
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dismiss();
    }
  };

  return (
    <div
      className="relative"
      style={{ width: stackW, height: stackH }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {STACK.map((card, physIdx) => {
        const isExiting = physIdx === exitingIdx;
        const layer = isExiting
          ? -1
          : (physIdx - effectiveTopIdx + n) % n;
        const isTop = layer === 0;

        const layerConf = layer >= 0 ? (LAYER_CFG[layer] ?? HIDDEN_CFG) : HIDDEN_CFG;
        const animConf = isExiting
          ? { x: stackW + 80, y: -55, scale: 1, opacity: 0, rotate: card.rotation + 26 }
          : { ...layerConf, rotate: card.rotation };

        return (
          <motion.div
            key={physIdx}
            className="absolute inset-0 flex items-center justify-center"
            initial={animConf}
            animate={animConf}
            transition={
              isExiting
                ? { duration: 0.42, ease: [0.36, 0, 0.66, -0.56] }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            style={{
              zIndex: isExiting ? 15 : Math.max(0, 10 - layer),
              pointerEvents: isTop ? "auto" : "none",
              cursor: isTop ? "pointer" : "default",
            }}
            onClick={isTop ? dismiss : undefined}
          >
            <PolaroidCard card={card} isTop={isTop} cardW={cardW} priority={physIdx === 0} />
          </motion.div>
        );
      })}

      {/* Progress dots */}
      <div className="absolute -bottom-9 inset-x-0 flex flex-col items-center gap-2">
        <div className="flex gap-[5px]">
          {STACK.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === effectiveTopIdx % n ? 14 : 5,
                height: 5,
                background:
                  i === effectiveTopIdx % n
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About section ──────────────────────────────────────────────────────────────────────

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative px-6 md:px-10 py-16 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

        {/* ── left: bio + polaroid stack ── */}
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
            style={{ fontSize: "clamp(2rem, 3vw, 2.4rem)" }}
          >
            Designing products where<br /> strategy, UX, and visual craft<br /> come together.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-sm leading-relaxed text-white/40 font-light"
          >
            <p>
              I am a Product Designer with 2+ years of experience delivering user-centered design solutions across mobile, web,
and SaaS products.{" "}
              <em className="text-white/60 not-italic">Specialized in </em>tokenized design systems, interaction design, and end-to-end product
ownership, with proven success in improving design consistency, reducing dev handoff time, and shipping
intuitive products at scale.
              Adept at cross-functional collaboration and leveraging AI-assisted design
workflows to accelerate delivery and innovation.
            </p>
          </motion.div>

          {/* Polaroid stack (replaces single static photo) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 pb-8"
          >
            <PolaroidStack />
          </motion.div>
        </div>

        {/* ── right: skills + stack ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase mb-8 font-medium text-white/20">
            Proficiency
          </p>
          <div className="mb-10">
            {skills.map((s, i) => (
              <SkillBar key={s.label} {...s} delay={0.1 + i * 0.1} />
            ))}
          </div>

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

          <div className="mt-8 flex items-center gap-3">
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
