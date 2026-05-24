"use client";

import { useState } from "react";
import Preloader from "./Preloader";

export default function PreloaderController() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <Preloader onComplete={() => setDone(true)} />;
}
