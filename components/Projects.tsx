"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Nebula",
    category: "Data Visualisation Platform",
    description:
      "A 3D interactive analytics dashboard for a Series-B SaaS startup. Real-time WebGL charts, custom shader effects, and a design system built from scratch.",
    tags: ["Next.js", "Three.js", "D3.js", "TypeScript"],
    year: "2024",
    color: "#6366f1",
    href: "#",
  },
  {
    num: "02",
    title: "Pulse",
    category: "Health Tech · Mobile + Web",
    description:
      "End-to-end health monitoring experience with live biosensor data streams, animated vitals UI, and cross-platform React Native parity.",
    tags: ["React Native", "Node.js", "WebSockets", "Framer"],
    year: "2024",
    color: "#ec4899",
    href: "#",
  },
  {
    num: "03",
    title: "Forma",
    category: "AI Design Tool",
    description:
      "Generative UI builder powered by OpenAI. Drag-and-drop canvas with AI-suggested components, live code export, and Figma token sync.",
    tags: ["Next.js", "OpenAI API", "Fabric.js", "Tailwind"],
    year: "2025",
    color: "var(--accent)",
    href: "#",
  },
  {
    num: "04",
    title: "Drift",
    category: "E-Commerce · Immersive",
    description:
      "Luxury fashion storefront with WebGL product viewer, scroll-driven transitions, and a custom Shopify headless storefront achieving sub-1s LCP.",
    tags: ["Next.js", "GSAP", "Shopify", "GLSL"],
    year: "2023",
    color: "#f97316",
    href: "#",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      variants={item}
      className="group relative flex flex-col justify-between h-full rounded-2xl p-7 overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
      }}
      whileHover={{
        borderColor: `${project.color}33`,
        boxShadow: `0 0 48px ${project.color}12, inset 0 0 24px ${project.color}06`,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      {/* subtle colour bleed top-right */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ background: project.color }}
      />

      <div>
        {/* number + year */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-xs font-mono tracking-widest"
            style={{ color: project.color }}
          >
            {project.num}
          </span>
          <span className="text-xs text-white/20 tracking-wider">{project.year}</span>
        </div>

        {/* title */}
        <h3 className="text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-xs tracking-widest uppercase text-white/30 mb-5">
          {project.category}
        </p>

        {/* description */}
        <p className="text-sm leading-relaxed text-white/40 font-light">
          {project.description}
        </p>
      </div>

      <div>
        {/* tags */}
        <div className="flex flex-wrap gap-2 my-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/[0.07] text-white/25 font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* view link */}
        <a
          href={project.href}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group/link"
          style={{ color: project.color }}
        >
          <span>View Case Study</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            →
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="relative px-6 md:px-10 py-24 md:py-36">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end gap-6 md:gap-0 justify-between"
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
            style={{ color: "var(--accent)" }}>
            Selected Work
          </p>
          <h2
            className="font-bold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            Case Studies
          </h2>
        </div>
        <p className="text-sm text-white/30 max-w-xs leading-relaxed md:text-right">
          A curated set of case studies across product design, engineering,
          and creative development.
        </p>
      </motion.div>

      {/* grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </motion.div>

      {/* subtle divider */}
      <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
