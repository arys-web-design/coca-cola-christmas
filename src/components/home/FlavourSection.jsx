import { heroSleigh } from "@/lib/home-assets";
import Layered from "./Layered";
import SleighScroll from "./SleighScroll";
import TreeGlow from "./TreeGlow";
import { BIG, MID, SLEIGH_BOX, SLEIGH_CONTACT, SLEIGH_PATH_ITEMS, SLEIGH_SIZE, SLEIGH_TRACE, TREE_ITEMS } from "./data";

const [BW, BH] = SLEIGH_BOX;
const [[, pathLeft, pathTop]] = SLEIGH_PATH_ITEMS;
const [endX, endY] = SLEIGH_TRACE.at(-1);
const [contactX, contactY] = SLEIGH_CONTACT;
const bLeft = pathLeft + endX - SLEIGH_SIZE * contactX;
const bTop = pathTop + endY - SLEIGH_SIZE * contactY;

export default function FlavourSection() {
  return (
    <section id="flavours" className="px-3 sm:px-[1.5%]">
      <div className="mx-auto -mt-[clamp(0px,2.3vw,33px)] flex max-w-[1412px] flex-col items-center gap-6 md:flex-row md:items-end md:justify-center md:gap-[clamp(24px,5.1vw,74px)] lg:mt-0">
        <div className="w-[min(359px,70%)] shrink-0 md:w-[clamp(220px,25vw,359px)]">
          <div className="relative" style={{ aspectRatio: `${BW} / ${BH}` }}>
            {/* the white drawn path never moves */}
            <Layered w={BW} h={BH} items={SLEIGH_PATH_ITEMS} />
            {/* only the bottle riding it travels along the path */}
            <div
              className="absolute"
              style={{
                left: `${(bLeft / BW) * 100}%`,
                top: `${(bTop / BH) * 100}%`,
                width: `${(SLEIGH_SIZE / BW) * 100}%`,
                height: `${(SLEIGH_SIZE / BH) * 100}%`,
              }}
            >
              <SleighScroll>
                <img src={heroSleigh} alt="Coca-Cola bottle riding a sleigh" className="block h-full w-full object-contain" />
              </SleighScroll>
            </div>
          </div>
        </div>
        <p className="min-w-0 text-center font-bold md:max-w-[800px] md:flex-1 md:text-left">
          <span className={MID}>for everyone, there is</span> <span className={BIG}>a flavour</span>
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-[1320px] lg:mt-14">
        <TreeGlow items={TREE_ITEMS} />
      </div>
    </section>
  );
}
