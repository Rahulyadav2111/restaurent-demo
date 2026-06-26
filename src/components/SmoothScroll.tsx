"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.8,
        smoothWheel: true,
        wheelMultiplier: 0.75,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
