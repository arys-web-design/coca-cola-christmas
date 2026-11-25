import { useLayoutEffect, useRef } from "react";
import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import FlavourSection from "@/components/home/FlavourSection";
import HistorySection from "@/components/home/HistorySection";
import CokeAppSection from "@/components/home/CokeAppSection";
import PostcardSection from "@/components/home/PostcardSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function HomepageContent({ introFinished }) {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    if (!introFinished || !("IntersectionObserver" in window)) return;

    const main = mainRef.current;
    const targets = main.querySelectorAll("[data-scroll-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        if (target.dataset.revealState === "pending") target.dataset.revealState = "revealed";
        observer.unobserve(target);
      }
    }, { rootMargin: "0px 0px -6% 0px" });

    function showOnFocus(event) {
      const target = event.target.closest("[data-scroll-reveal]");
      if (target?.dataset.revealState !== "pending") return;
      delete target.dataset.revealState;
      observer.unobserve(target);
    }

    for (const target of targets) {
      if (target.contains(document.activeElement)) continue;
      target.dataset.revealState = "pending";
      observer.observe(target);
    }
    main.addEventListener("focusin", showOnFocus);

    return () => {
      observer.disconnect();
      main.removeEventListener("focusin", showOnFocus);
      for (const target of targets) delete target.dataset.revealState;
    };
  }, [introFinished]);

  return (
    <main ref={mainRef} id="top" className="bg-background font-heading text-secondary">
      <SiteHeader />
      <Hero introFinished={introFinished} />
      <FlavourSection />
      <HistorySection />
      <CokeAppSection />
      <PostcardSection />
      <SiteFooter />
    </main>
  );
}
