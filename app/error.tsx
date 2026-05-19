"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 text-white">
      <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
        Something went wrong
      </p>
      <h2 className="text-3xl font-light">{error.message || "Unexpected error"}</h2>
      <button
        onClick={reset}
        className="mt-2 px-6 py-2 text-sm border border-white/10 rounded-full hover:border-white/30 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
