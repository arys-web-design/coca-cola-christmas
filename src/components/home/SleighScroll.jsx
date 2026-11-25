import { useEffect, useRef, useState } from "react";

import { SLEIGH_CONTACT, SLEIGH_SIZE, SLEIGH_TRACE } from "./data";

const TRAVEL = 46;

const at = (back) => {
  let rest = back;
  for (let i = SLEIGH_TRACE.length - 1; i > 0; i--) {
    const [x1, y1] = SLEIGH_TRACE[i];
    const [x0, y0] = SLEIGH_TRACE[i - 1];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (rest <= len) {
      const f = rest / len;
      return [x1 - dx * f, y1 - dy * f];
    }
    rest -= len;
  }
  return SLEIGH_TRACE[0];
};

/**
 * Moves only its children — the bottle — along the drawn path. Progress is read straight
 * from the scroll position, so scrolling down runs forward and scrolling up runs back.
 */
export default function SleighScroll({ children }) {
  const ref = useRef(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 while the sleigh is still entering, 1 once it has settled on the path
      setP(Math.min(1, Math.max(0, (vh - top) / (vh * 0.7))));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const [px, py] = at((1 - p) * TRAVEL);
  const [ex, ey] = SLEIGH_TRACE[SLEIGH_TRACE.length - 1];
  const x = ((px - ex) / SLEIGH_SIZE) * 100;
  const y = ((py - ey) / SLEIGH_SIZE) * 100;
  const tilt = -7 * (1 - p);
  const [contactX, contactY] = SLEIGH_CONTACT;

  return (
    <div ref={ref} className="h-full w-full">
      <div
        className="h-full w-full"
        style={{ transform: `translate3d(${x}%, ${y}%, 0) rotate(${tilt}deg)`, transformOrigin: `${contactX * 100}% ${contactY * 100}%`, willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
