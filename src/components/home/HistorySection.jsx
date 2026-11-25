import { snowflake, historyLineTop, historyLineBottom, historyOrnament, historyString, historySleigh } from "@/lib/home-assets";
import ScrollRevealLine from "./ScrollRevealLine";
import { BIG, MID, SNOW } from "./data";

const line = "block h-auto w-full";

export default function HistorySection() {
  return (
    <section id="cokehistory" className="relative mt-9 lg:-mt-6">
      <img src={snowflake} alt="" aria-hidden="true" className={SNOW} style={{ left: "6%", top: "8.4%" }} />
      <img src={snowflake} alt="" aria-hidden="true" className={SNOW} style={{ left: "44.7%", top: "60%" }} />
      <ScrollRevealLine className="relative z-10">
        <img src={historyLineTop} alt="" width={1369} height={57} className={line} />
      </ScrollRevealLine>
      <div className="relative z-10 mx-auto mt-9 flex max-w-[1380px] flex-col items-center gap-16 px-4 lg:flex-row lg:justify-between lg:gap-[7.5%] lg:px-[0.7%]">
        <div className="lg:w-[49.7%]">
          <p data-scroll-reveal="0" className="font-bold">
            <span className={MID}>same taste and bringing feelings</span> <span className={BIG}>since 1886</span>
          </p>
          <p data-scroll-reveal="1" className="mt-6 max-w-[444px] text-[16px] leading-[20.48px]">
            <span className="font-bold">Dr. John Stith Pemberton</span> was experimenting with a new syrup in Atlanta. Add some carbonated water, give it a name, and suddenly — Coca-Cola. What started behind a pharmacy counter became a taste recognized around the world. He created a legend of drinks.
          </p>
        </div>
        <div data-scroll-reveal="2" className="relative w-[min(572px,92%)] shrink-0 lg:w-[41.4%]">
          <div className="ornament-swing relative">
            <img
              src={historyOrnament}
              loading="lazy"
              alt="Dr. John Stith Pemberton, inventor of Coca-Cola, 1886"
              className="ornament-glow block aspect-square h-auto w-full"
            />
            <img
              src={historyString}
              alt=""
              aria-hidden="true"
              className="absolute h-auto"
              style={{ left: "56.6%", top: "-11.4%", width: "4%" }}
            />
          </div>
          <img
            src={historySleigh}
            alt="Coca-Cola bottle on a sleigh"
            className="absolute aspect-square h-auto"
            style={{ left: "2.6%", top: "-1.1%", width: "22%" }}
          />
        </div>
      </div>
      <ScrollRevealLine className="relative z-10 mt-9">
        <img src={historyLineBottom} alt="" width={1369} height={57} className={line} />
      </ScrollRevealLine>
    </section>
  );
}
