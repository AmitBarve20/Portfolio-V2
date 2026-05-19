import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil Gawa — Creative Developer",
  description:
    "Bridging design and engineering. Building cinematic digital experiences that matter.",
  openGraph: {
    title: "Sahil Gawa — Creative Developer",
    description: "Building cinematic digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
