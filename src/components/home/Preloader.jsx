import { useEffect, useRef, useState } from "react";
import { preloaderBottle, preloaderSnowflake } from "@/lib/home-assets";

// bottle silhouette proportions (39 x 112) — the portal keeps them at every size
const RATIO = 39 / 112;

// one continuous, fully filled bottle silhouette: a single closed path with no
// internal gaps, label cut-outs or transparent regions, so the page is revealed
// through the whole shape as it grows
const BOTTLE_PATH =
  "M16.6 0.5C16.6 0.2 16.8 0 17.1 0L21.9 0C22.2 0 22.4 0.2 22.4 0.5L22.4 5.2C22.4 5.8 22.2 6.1 21.9 6.4C22.1 12 22.2 19 22 26C21.9 30.5 22.4 33 25.2 36.5C28.4 40.5 32.2 43.5 32.7 49C33.1 54 32.3 60 32.5 66C32.7 72 32.2 79 32.4 86C32.6 94 31.6 99.5 28.6 103.5C26.2 106.8 23 108.6 19.5 108.6C16 108.6 12.8 106.8 10.4 103.5C7.4 99.5 6.4 94 6.6 86C6.8 79 6.3 72 6.5 66C6.7 60 5.9 54 6.3 49C6.8 43.5 10.6 40.5 13.8 36.5C16.6 33 17.1 30.5 17 26C16.8 19 16.9 12 17.1 6.4C16.8 6.1 16.6 5.8 16.6 5.2Z";

// how much of the reveal the headline and snowflake take to fade away
const FADE = 0.3;
const MOBILE_LAYOUT = "(max-width: 767.98px), (max-width: 1023.98px) and (max-height: 500px) and (pointer: coarse)";

function PreloaderDots() {
  return (
    <span className="preloader-dots" aria-hidden="true">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
}

export default function Preloader({ onDone }) {
  const curtainRef = useRef(null);
  const bottleRef = useRef(null);
  const doneRef = useRef(false);
  const targetRef = useRef(0);
  const [p, setP] = useState(0);
  const [hole, setHole] = useState({ cx: -9999, cy: -9999, max: 4000 });

  // the portal opens exactly on the bottle drawn inside the snowflake, and expands
  // until the silhouette covers every corner of the viewport
  useEffect(() => {
    const curtain = curtainRef.current;
    const mobile = window.matchMedia(MOBILE_LAYOUT);
    const measure = () => {
      const r = bottleRef.current?.getBoundingClientRect();
      if (!r) return;
      const bounds = mobile.matches ? curtain.getBoundingClientRect() : null;
      const vw = bounds?.width ?? window.innerWidth;
      const vh = bounds?.height ?? window.innerHeight;
      const cx = r.left + r.width / 2 - (bounds?.left ?? 0);
      const cy = r.top + r.height / 2 - (bounds?.top ?? 0);
      const dx = Math.max(cx, vw - cx);
      const dy = Math.max(cy, vh - cy);
      // the silhouette is a bottle: narrow at the cap, full width around its body,
      // so the height needed to clear every corner is far larger than the viewport
      const taper = (dx + 0.2214 * cy) / 0.1629;
      setHole({ cx, cy, max: Math.max(taper, 2 * dy) * 1.15 });
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(() => {
      if (mobile.matches) measure();
    });
    observer.observe(curtain);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    // reduced motion: no portal animation, straight to the page
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const step = Math.max(window.innerHeight * 0.9, 520);
    const pull = (delta) => {
      targetRef.current = Math.min(1, Math.max(0, targetRef.current + delta / step));
    };

    const onWheel = (e) => {
      e.preventDefault();
      pull(e.deltaY);
    };
    const lastY = { current: 0 };
    const onTouchStart = (e) => {
      lastY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (e.cancelable) e.preventDefault();
      const y = e.touches[0].clientY;
      pull((lastY.current - y) * 2);
      lastY.current = y;
    };
    const onKey = (e) => {
      const fwd = ["ArrowDown", "PageDown", " ", "Spacebar", "End"].includes(e.key);
      const back = ["ArrowUp", "PageUp", "Home"].includes(e.key);
      if (!fwd && !back) return;
      e.preventDefault();
      pull(fwd ? 220 : -220);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    // the silhouette follows the scroll input with a short ease, so the reveal
    // is one continuous motion instead of a jump per scroll tick
    let shown = 0;
    let frame = 0;
    const loop = () => {
      shown += (targetRef.current - shown) * 0.16;
      if (Math.abs(targetRef.current - shown) < 0.002) shown = targetRef.current;
      setP(shown);
      if (shown >= 1) {
        // let the fully open silhouette paint before the curtain goes, so the last
        // frame of red is never the one that gets removed
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(finish);
        });
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  const h = 1 + p * (hole.max - 1);
  const w = h * RATIO;
  const fade = Math.max(0, 1 - p / FADE);

  return (
    <div ref={curtainRef} className="preloader fixed inset-0 z-[100] overflow-hidden" data-revealing={p > 0}>
      {/* the solid red curtain with one bottle silhouette cut out of it, drawn by an
          SVG mask: no CSS mask compositing, so the hole can never fragment or stripe */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <mask id="coke-portal" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <path
              d={BOTTLE_PATH}
              fill="#000"
              transform={`translate(${hole.cx - w / 2} ${hole.cy - h / 2}) scale(${h / 112})`}
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          style={{ fill: "rgb(var(--background))" }}
          mask="url(#coke-portal)"
        />
      </svg>
      <div
        className="preloader-content pointer-events-none absolute inset-0 flex flex-col items-center px-6"
        style={{ opacity: fade }}
      >
        <p className="preloader-title text-center text-3xl font-bold leading-[1.057] text-secondary font-heading sm:text-5xl lg:whitespace-nowrap lg:text-figma-56">
          <PreloaderDots />let’s have #CokeChristmas<PreloaderDots />
        </p>
        <div className="preloader-mark relative shrink-0">
          <img className="absolute inset-0 h-full w-full" src={preloaderSnowflake} alt="" aria-hidden="true" />
          <img
            ref={bottleRef}
            className="absolute left-[36.842%] top-[12.865%] h-[65.497%] w-[25.658%]"
            src={preloaderBottle}
            alt="Coca-Cola bottle"
          />
        </div>
      </div>
    </div>
  );
}
