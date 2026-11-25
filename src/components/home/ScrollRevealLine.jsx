import { useEffect, useRef } from "react";

export default function ScrollRevealLine({ children, className }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = null;

    function measure() {
      frame = null;
      if (motion.matches) return;

      const { top } = line.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (height * 0.95 - top) / (height * 0.43)));
      line.style.setProperty("--line-hidden", `${(1 - progress) * 100}%`);
    }

    function requestMeasure() {
      if (frame === null) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    window.addEventListener("load", requestMeasure);
    motion.addEventListener("change", requestMeasure);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener("load", requestMeasure);
      motion.removeEventListener("change", requestMeasure);
    };
  }, []);

  return (
    <div ref={lineRef} aria-hidden="true" className={`scroll-reveal-line ${className}`}>
      {children}
    </div>
  );
}
