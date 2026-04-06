"use client";

import { useLayoutEffect } from "react";

export default function HomePageClientEffects() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return null;
}
