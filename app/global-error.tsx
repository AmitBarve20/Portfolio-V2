"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            color: "#fff",
            fontFamily: "sans-serif",
          }}
        >
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8ff00" }}>
            Something went wrong
          </p>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 300, margin: 0 }}>
            {error.message || "Unexpected error"}
          </h2>
          <button
            onClick={reset}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.5rem",
              fontSize: "0.875rem",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
