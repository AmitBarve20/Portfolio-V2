"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/* ─── constants ─────────────────────────────────────────────────── */
const FRAME_COUNT = 144;

const frameUrl = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.055s.webp`;

/* ─── canvas draw helper ────────────────────────────────────────── */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(cw / iw, ch / ih);
  const dx = (cw - iw * scale) / 2;
  const dy = (ch - ih * scale) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
}

/* ─── overlay text panels ───────────────────────────────────────── */
function OverlayTexts({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  /* Section 1 — 0 → 22 % — centre */
  const s1Op = useTransform(scrollYProgress, [0, 0.04, 0.18, 0.26], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.26], ["0px", "-32px"]);

  /* Section 2 — 28 → 52 % — left */
  const s2Op = useTransform(scrollYProgress, [0.28, 0.34, 0.48, 0.56], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.28, 0.56], ["-20px", "0px"]);

  /* Section 3 — 58 → 82 % — right */
  const s3Op = useTransform(scrollYProgress, [0.58, 0.64, 0.78, 0.86], [0, 1, 1, 0]);
  const s3X = useTransform(scrollYProgress, [0.58, 0.86], ["20px", "0px"]);

  /* Scroll cue fades out immediately */
  const ctaOp = useTransform(scrollYProgress, [0, 0.03, 0.09], [1, 1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none select-none">

      {/* ── scroll cue ── */}
      <motion.div
        style={{ opacity: ctaOp }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-medium">
          Scroll
        </span>
        <div className="relative w-px h-10 overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent to-white/50"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── section 1: hero name (centre) ── */}
      <motion.div
        style={{ opacity: s1Op, y: s1Y }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          className="text-[11px] tracking-[0.35em] uppercase mb-5 font-medium"
          style={{ color: "var(--accent)" }}
        >
          Creative Product Designer
        </motion.p>

        <h1 className="font-black leading-none tracking-[-0.0em] text-white"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", 
                  textShadow: "0 2px 10px rgba(0,0,0,0.25)"
          }}>
          Amit Barve
        </h1>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-xs text-white/30 tracking-widest uppercase">
            Portfolio 2026
          </span>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </motion.div>

      {/* ── section 2: what I do (left) ── */}
      <motion.div
        style={{ opacity: s2Op, x: s2X }}
        className="absolute left-[7%] top-1/2 -translate-y-1/2 max-w-[min(420px,44vw)]"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3 font-medium"
          style={{ color: "var(--accent)" }}>
          — PRODUCT DESIGN
        </p>
        <h2
          className="font-bold leading-[1.1] tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
        >
          Designing products
<br /> that scale.
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-white/60 font-light">
          I design products that solve real problems, not just create beautiful screens
        </p>
        <div className="mt-8 flex gap-3">
          {["SaaS Products", "User Experience", "Scalable Systems"].map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-widest uppercase border border-white/30 px-3 py-1.5 rounded-full text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── section 3: craft (right) ── */}
      <motion.div
        style={{ opacity: s3Op, x: s3X }}
        className="absolute right-[7%] top-1/2 -translate-y-1/2 max-w-[min(420px,44vw)] text-right"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3 font-medium"
          style={{ color: "var(--accent)" }}>
          MY APPROACH —
        </p>
        <h2
          className="font-bold leading-[1.1] tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
        >
          2+ years building<br /> user-centered products.
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-white/80 font-light">
      Creating seamless, functional, and visually refined digital products.

        </p>
        <div className="mt-8 flex gap-3 justify-end">
          {["Figma", "Design Systems", "Google Stitch"].map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-widest uppercase border border-white/30 px-3 py-1.5 rounded-full text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── main export ───────────────────────────────────────────────── */
export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  /* draw a single frame at physical-pixel resolution */
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  /* resize canvas buffer to match CSS size × DPR */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  /* observe CSS size changes */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);
    resizeCanvas();
    return () => ro.disconnect();
  }, [resizeCanvas]);

  /* preload all frames — prioritise first frame */
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    /* load frame 0 first for instant first-paint */
    const first = new Image();
    first.src = frameUrl(0);
    first.onload = () => {
      images[0] = first;
      imagesRef.current = images;
      renderFrame(0);

      /* then batch-load the rest */
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = frameUrl(i);
        images[i] = img;
      }
    };
    images[0] = first;
    imagesRef.current = images;
  }, [renderFrame]);

  /* sync scroll → frame */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.max(Math.round(latest), 0), FRAME_COUNT - 1);
    currentFrameRef.current = idx;
    renderFrame(idx);
  });

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#121212" }}
        />

        {/* vignette overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        <OverlayTexts scrollYProgress={scrollYProgress} />

        {/* bottom edge — fades into SelectedWork's #050505 background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "22%",
            background: "linear-gradient(to bottom, transparent, #050505)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
}
