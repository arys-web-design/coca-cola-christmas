import { useState } from "react";
import { flushSync } from "react-dom";
import { Menu, X } from "lucide-react";
import { logo } from "@/lib/home-assets";
import Layered from "./Layered";
import { headerSnow, LANGUAGE_CHEVRON } from "./headerArtwork";

const LINKS = [
  ["Home", "#hero"],
  ["Flavours", "#flavours"],
  ["CokeHistory", "#cokehistory"],
  ["CokeApp", "#cokeapp"],
];
const linkCls = "text-[20px] font-bold leading-[25.6px] text-secondary";

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (!el) return;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function Eng() {
  return (
    <div className="flex items-center gap-4">
      <span className={linkCls}>Eng</span>
      <Layered w={23} h={12} items={LANGUAGE_CHEVRON} className="pointer-events-none w-[23px]" />
    </div>
  );
}

// the hand-drawn white line from the Figma artwork, revealed left to right on hover
function NavLink({ label, href }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(href);
      }}
      className={`group relative inline-block ${linkCls}`}
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-[6px] left-0 h-[8px] w-full overflow-visible [clip-path:inset(0_100%_0_0)] transition-[clip-path] [transition-duration:0ms] group-hover:ease-out group-hover:[transition-duration:400ms] group-hover:[clip-path:inset(0_0_0_0)]"
      >
        <path
          d="M2 5.4C12.5 3.8 24 3 37.5 3.5C49 3.9 61 4.9 73 4.3C83 3.8 92 4.5 98 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M6.5 7C18 6.2 30 5.6 43 5.8C56 6 68 6.5 82 6.1"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
      </svg>
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  function navigateFromMenu(event, href) {
    event.preventDefault();
    flushSync(() => setOpen(false));
    scrollToSection(href);
  }

  return (
    <header className="relative mb-[min(5vw,72px)] w-full lg:mb-[min(6vw,86px)]">
      <img
        src={headerSnow}
        alt=""
        className="pointer-events-none absolute inset-x-0 z-10 h-[min(5.34vw,76.43px)] w-full"
        style={{ top: "max(-11px,-0.79vw)" }}
      />
      <div className="bg-background shadow-[0px_4px_4px_0px_rgba(4,0,0,0.20)]">
        <div className="flex items-center justify-between gap-3 px-4 pb-6 pt-[min(5vw,72px)] sm:gap-6 sm:px-6 lg:grid lg:min-h-[139px] lg:grid-cols-[1fr_auto_1fr]">
          <img src={logo} alt="The Coca-Cola Company" className="h-auto w-[150px] sm:w-[220px]" />
          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {LINKS.map(([label, href]) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </nav>
          <div className="hidden lg:block lg:justify-self-end"><Eng /></div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 pb-6 text-center lg:hidden">
            {LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(e) => navigateFromMenu(e, href)}
                className={`${linkCls} py-2`}
              >
                {label}
              </a>
            ))}
            <div className="self-center pt-6"><Eng /></div>
          </nav>
        )}
      </div>
    </header>
  );
}
