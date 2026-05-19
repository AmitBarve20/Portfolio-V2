import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 text-white">
      <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
        404
      </p>
      <h2 className="text-3xl font-light">Page not found</h2>
      <Link
        href="/"
        className="mt-2 px-6 py-2 text-sm border border-white/10 rounded-full hover:border-white/30 transition-colors"
      >
        Go home
      </Link>
    </main>
  );
}
