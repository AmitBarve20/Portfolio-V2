"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { label: "IDEA",      min: 0,  max: 25  },
  { label: "RESEARCH",  min: 25, max: 55  },
  { label: "PROTOTYPE", min: 55, max: 80  },
  { label: "LAUNCH",    min: 80, max: 100 },
];

/* ── Ambient particles ── */
function Particles() {
  const pts = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.8 + 0.4,
      dur: Math.random() * 9 + 6,
      delay: Math.random() * 5,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r, height: p.r }}
          animate={{ y: [0, -24, 0], opacity: [0.06, 0.22, 0.06] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Stage 1: IDEA ── */
function IdeaVisual() {
  return (
    <motion.div
      key="idea"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Concentric glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
      >
        {[120, 80, 48, 20].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#c8ff00]"
            style={{ width: size, height: size }}
            animate={{ opacity: [0.08 + i * 0.06, 0.2 + i * 0.08, 0.08 + i * 0.06] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
        <motion.div
          className="w-5 h-5 rounded-full bg-[#c8ff00]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: "0 0 16px 4px rgba(200,255,0,0.4)" }}
        />
        {/* Orbit dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c8ff00]/50"
            style={{
              top: `calc(50% + ${52 * Math.sin((deg * Math.PI) / 180)}px)`,
              left: `calc(50% + ${52 * Math.cos((deg * Math.PI) / 180)}px)`,
              transform: "translate(-50%,-50%)",
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Floating thought fragments */}
      {[
        { text: "What if…", x: -130, y: -55 },
        { text: "Why?",      x:  110, y: -70 },
        { text: "Insight",   x: -100, y:  70 },
        { text: "Vision",    x:  120, y:  55 },
      ].map((t, i) => (
        <motion.span
          key={i}
          className="absolute text-[10px] tracking-[0.18em] font-light text-white/25"
          style={{ x: t.x, y: t.y }}
          initial={{ opacity: 0, y: t.y + 8 }}
          animate={{ opacity: [0, 0.55, 0.4], y: t.y }}
          transition={{ delay: 0.3 + i * 0.35, duration: 0.8 }}
        >
          {t.text}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ── Stage 2: RESEARCH ── */
function ResearchVisual() {
  const nodes = [
    { x: "50%", y: "50%", label: "Core",       accent: true,  delay: 0   },
    { x: "20%", y: "22%", label: "Users",       accent: false, delay: 0.2 },
    { x: "78%", y: "22%", label: "Market",      accent: false, delay: 0.3 },
    { x: "15%", y: "68%", label: "Patterns",    accent: false, delay: 0.4 },
    { x: "82%", y: "68%", label: "Competitors", accent: false, delay: 0.5 },
    { x: "50%", y: "88%", label: "Insights",    accent: true,  delay: 0.6 },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  ];

  return (
    <motion.div
      key="research"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-[300px] h-[160px]">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {edges.map(([a, b], i) => {
            const na = nodes[a], nb = nodes[b];
            const x1 = parseFloat(na.x) / 100 * 300;
            const y1 = parseFloat(na.y) / 100 * 160;
            const x2 = parseFloat(nb.x) / 100 * 300;
            const y2 = parseFloat(nb.y) / 100 * 160;
            const len = Math.hypot(x2 - x1, y2 - y1);
            return (
              <motion.line key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(200,255,0,0.18)" strokeWidth="1"
                strokeDasharray={len} strokeDashoffset={len}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: n.x, top: n.y, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: n.delay + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={`rounded-full border ${n.accent ? "border-[#c8ff00]/70 bg-[#c8ff00]/15" : "border-white/20 bg-white/[0.04]"}`}
              style={{ width: n.accent ? 14 : 10, height: n.accent ? 14 : 10 }}
              animate={n.accent ? { boxShadow: ["0 0 0px rgba(200,255,0,0)", "0 0 10px 2px rgba(200,255,0,0.35)", "0 0 0px rgba(200,255,0,0)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[8px] tracking-[0.14em] font-medium whitespace-nowrap"
              style={{ color: n.accent ? "rgba(200,255,0,0.7)" : "rgba(255,255,255,0.28)" }}>
              {n.label}
            </span>
          </motion.div>
        ))}

        {/* Floating data pills */}
        {[
          { text: "12 interviews", x: "10%", y: "46%", delay: 0.8 },
          { text: "47 data pts",   x: "68%", y: "46%", delay: 0.95 },
        ].map((p, i) => (
          <motion.div key={i}
            className="absolute px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]"
            style={{ left: p.x, top: p.y, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: p.delay, duration: 0.4 }}
          >
            <span className="text-[8px] text-white/30 tracking-[0.12em]">{p.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Stage 3: PROTOTYPE ── */
function PrototypeVisual() {
  return (
    <motion.div
      key="prototype"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative w-[280px] h-[152px] rounded-xl border border-white/20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)", backdropFilter: "blur(12px)" }}
      >
        {/* Accent header */}
        <motion.div
          className="h-9 px-4 flex items-center justify-between border-b border-white/10"
          style={{ background: "linear-gradient(90deg, rgba(200,255,0,0.08), transparent)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c8ff00]/80" />
            <div className="h-1.5 w-20 bg-white/35 rounded-full" />
          </div>
          <div className="flex gap-1.5">
            {[18, 12].map((w, i) => (
              <div key={i} className="h-1 bg-white/20 rounded-full" style={{ width: w }} />
            ))}
          </div>
        </motion.div>
        {/* UI cards */}
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            { rows: 2, accent: true  },
            { rows: 2, accent: false },
            { rows: 2, accent: false },
            { rows: 1, accent: false },
            { rows: 1, accent: true  },
            { rows: 1, accent: false },
          ].map((c, i) => (
            <motion.div key={i}
              className={`rounded-lg border ${c.accent ? "border-[#c8ff00]/35 bg-[#c8ff00]/[0.06]" : "border-white/10 bg-white/[0.04]"}`}
              style={{ height: c.rows === 2 ? 42 : 20 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i + 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        {/* CTA */}
        <motion.div
          className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-[9px] font-semibold tracking-widest bg-[#c8ff00] text-black"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: "spring", stiffness: 300 }}
          style={{ boxShadow: "0 0 12px rgba(200,255,0,0.3)" }}
        >
          LAUNCH ↗
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Stage 4: LAUNCH ── */
function LaunchVisual() {
  return (
    <motion.div
      key="launch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Expanding rings */}
      {[0, 1, 2, 3].map(i => (
        <motion.div key={i}
          className="absolute rounded-full border border-[#c8ff00]/25"
          style={{ width: 60, height: 60 }}
          animate={{ scale: [0.6, 3.5 + i * 0.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, delay: i * 0.45, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      {/* Central orb */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(200,255,0,0.28) 0%, rgba(200,255,0,0.04) 70%)",
            boxShadow: "0 0 40px 8px rgba(200,255,0,0.12), 0 0 80px 16px rgba(200,255,0,0.05)",
          }}
        >
          <motion.span
            className="text-[#c8ff00] text-3xl font-light leading-none"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ↗
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const STAGE_VISUALS = [IdeaVisual, ResearchVisual, PrototypeVisual, LaunchVisual];

/* ── Main Preloader ── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      const step = cur < 90 ? 0.32 : 0.55;
      cur = Math.min(cur + step, 100);
      setProgress(parseFloat(cur.toFixed(1)));
      if (cur >= 100) {
        clearInterval(id);
        setTimeout(() => setExiting(true), 700);
        setTimeout(() => onComplete(), 1700);
      }
    }, 16);
    return () => clearInterval(id);
  }, [onComplete]);

  const stageIdx = STAGES.reduce((acc, s, i) => (progress >= s.min ? i : acc), 0);
  const StageVisual = STAGE_VISUALS[stageIdx];

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: "#0B0B0B" }}
        >
          {/* Grain overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.028] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,255,0,0.025), transparent)" }}
          />

          <Particles />

          {/* ── Content ── */}
          <div className="relative z-10 w-full max-w-[640px] px-10 flex flex-col items-center gap-10">

            {/* Stage label */}
            <div className="h-5 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stageIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] tracking-[0.3em] font-medium text-white/35 uppercase"
                >
                  {STAGES[stageIdx].label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Stage visual */}
            <div className="relative h-44 w-full">
              <AnimatePresence mode="wait">
                <StageVisual key={stageIdx} />
              </AnimatePresence>
            </div>

            {/* Timeline */}
            <div className="w-full flex flex-col gap-4">
              <div className="relative h-px w-full">
                {/* Track */}
                <div className="absolute inset-0 bg-white/[0.08]" />
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, rgba(200,255,0,0.9), rgba(200,255,0,0.4))",
                    boxShadow: "0 0 6px rgba(200,255,0,0.4)",
                  }}
                />
                {/* Nodes */}
                <div className="absolute -top-1 left-0 right-0 flex justify-between">
                  {STAGES.map((s, i) => {
                    const active = i === stageIdx;
                    const past = i < stageIdx;
                    return (
                      <motion.div key={s.label} className="flex flex-col items-center">
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          animate={{
                            backgroundColor: active
                              ? "rgba(200,255,0,1)"
                              : past
                              ? "rgba(200,255,0,0.45)"
                              : "rgba(255,255,255,0.12)",
                            boxShadow: active
                              ? "0 0 8px 2px rgba(200,255,0,0.55)"
                              : "none",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        {/* Sound-wave pulse on active */}
                        {active && (
                          <motion.div
                            className="absolute rounded-full border border-[#c8ff00]/40"
                            style={{ width: 8, height: 8 }}
                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Stage labels row */}
              <div className="flex justify-between">
                {STAGES.map((s, i) => {
                  const active = i === stageIdx;
                  const past = i < stageIdx;
                  return (
                    <motion.span
                      key={s.label}
                      className="text-[8px] tracking-[0.2em] font-medium"
                      animate={{
                        color: active ? "#c8ff00" : past ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      {s.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            {/* Progress number */}
            <div className="flex items-end gap-1 mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12 }}
                  className="tabular-nums font-extralight text-white/90 leading-none"
                  style={{ fontSize: 56, letterSpacing: "-0.04em" }}
                >
                  {Math.floor(progress).toString().padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-white/25 font-light mb-1.5">%</span>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-[9px] tracking-[0.35em] text-white/18 uppercase font-light -mt-4"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Portfolio Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
