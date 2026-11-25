import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import FlavourSection from "@/components/home/FlavourSection";
import HistorySection from "@/components/home/HistorySection";
import CokeAppSection from "@/components/home/CokeAppSection";
import PostcardSection from "@/components/home/PostcardSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function HomepageContent({ introFinished }) {
  return (
    <main id="top" className="bg-background font-heading text-secondary">
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
