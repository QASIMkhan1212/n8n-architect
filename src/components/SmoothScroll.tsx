import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    let rafId: number;
    let lenis: Lenis | null = null;
    let cancelled = false;

    // Use requestIdleCallback to defer Lenis init and avoid forced reflow during first paint
    const init = () => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(init)
      : (setTimeout(init, 150) as unknown as number);

    return () => {
      cancelled = true;
      if (window.requestIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
