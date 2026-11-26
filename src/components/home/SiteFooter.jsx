import { useEffect, useRef } from "react";
import { footerSleigh, footerSnow, logo, signGif } from "@/lib/home-assets";

export default function SiteFooter() {
  const disclaimerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("footer-at-viewport-edge", entry.isIntersecting);
    });
    observer.observe(disclaimerRef.current);
    return () => {
      observer.disconnect();
      document.body.classList.remove("footer-at-viewport-edge");
    };
  }, []);

  return (
    <footer className="site-footer mt-[9px] max-sm:text-center lg:mt-8">
      <div className="relative z-10 flex items-end justify-between pl-[5.9%] pr-[2.4%]">
        <img
          src={footerSleigh}
          alt="Coca-Cola bottle on a sleigh"
          className="sleigh-sway mb-[-45px] h-auto w-[clamp(64px,7.43vw,107px)]"
        />
        {/* the slot keeps the original square footprint so the footer never shifts;
            the wide sign GIF fills it without distortion, anchored to its bottom edge */}
        <div className="relative mb-[-27px] aspect-square w-[clamp(96px,13.75vw,198px)]">
          <img
            src={signGif}
            loading="lazy"
            alt="Three gnomes holding a Merry Christmas sign"
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
      <img src={footerSnow} alt="" aria-hidden="true" className="block h-auto w-full" />
      <div className="footer-credits relative -mt-[min(7.3vw,105px)] flex flex-col gap-6 bg-secondary pb-6 pl-[3.3%] pr-[1.7%] text-background max-sm:px-[3.3%] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-[257px] max-w-full flex-col gap-4 max-sm:w-full">
          <div
            role="img"
            aria-label="The Coca-Cola Company"
            className="footer-logo aspect-[220/43] w-full bg-background max-sm:max-w-[257px] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            style={{ maskImage: `url("${logo}")` }}
          />
          <p className="text-[12px] font-semibold leading-[15.36px]">© 2026 Coca-Cola. All rights reserved.</p>
        </div>
        <p className="text-[12px] font-semibold leading-[15.36px]">Design by: Ary’s Web Design (Ariana M.)</p>
      </div>
      <p ref={disclaimerRef} className="footer-disclaimer bg-secondary px-[3.3%] pb-5 font-heading text-[12px] leading-4 text-background/90">
        Unofficial Coca-Cola Christmas website redesign. Independent creative project. Not affiliated with or endorsed by The Coca-Cola Company.
      </p>
    </footer>
  );
}
