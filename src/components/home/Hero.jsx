import { snowflake } from "@/lib/home-assets";
import Layered from "./Layered";
import { HERO_ITEMS, MID } from "./data";

const flake = "h-auto w-[28px] shrink-0 sm:w-[41px] lg:w-[min(41px,2.7vw)]";
const phrase = `hero-phrase font-bold ${MID} lg:whitespace-nowrap lg:text-[min(40px,2.72vw)]`;

export default function Hero({ introFinished }) {
  return (
    <section id="hero" data-intro-finished={introFinished} className="px-3 sm:px-[1.5%]">
      <div className="mx-auto flex max-w-[1305px] flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-10 lg:flex-nowrap lg:gap-x-[min(40px,2.78vw)]">
        <p className={phrase}>Take a Break</p>
        <img src={snowflake} alt="" aria-hidden="true" className={flake} />
        <p className={phrase}>Call your dearest</p>
        <img src={snowflake} alt="" aria-hidden="true" className={flake} />
        <p className={phrase}>Have a #CokeChristmas</p>
      </div>
      <div className="mx-auto mt-6 max-w-[1322px] lg:mt-14">
        <Layered w={1322} h={698} items={HERO_ITEMS} />
      </div>
    </section>
  );
}
