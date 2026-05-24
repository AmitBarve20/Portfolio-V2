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

            {/* Progress number */}
            <div className="flex items-end gap-1">
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
              className="text-[9px] tracking-[0.35em] text-white/18 uppercase font-light -mt-6"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Portfolio Loading
            </motion.p>

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
                <div className="absolute left-0 right-0 flex justify-between" style={{ top: -5 }}>
                  {STAGES.map((s, i) => {
                    const active = i === stageIdx;
                    const past = i < stageIdx;
                    return (
                      <motion.div key={s.label} className="flex flex-col items-center">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          animate={{
                            backgroundColor: active
                              ? "rgba(200,255,0,1)"
                              : past
                              ? "rgba(200,255,0,0.45)"
                              : "rgba(255,255,255,0.12)",
                            boxShadow: active
                              ? "0 0 10px 3px rgba(200,255,0,0.55)"
                              : "none",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        {/* Sound-wave pulse on active */}
                        {active && (
                          <motion.div
                            className="absolute rounded-full border border-[#c8ff00]/40"
                            style={{ width: 12, height: 12 }}
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

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
