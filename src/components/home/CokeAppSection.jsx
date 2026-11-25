import { appButtons, gnomesGif, snowflake } from "@/lib/home-assets";
import Layered from "./Layered";
import ScrollRevealLine from "./ScrollRevealLine";
import { APP_DECO, BIG, MID, SNOW } from "./data";

const FLAKES = [
  ["8.75%", "15.3%"],
  ["79.4%", "18%"],
  ["6%", "60.4%"],
  ["78.6%", "56.5%"],
];

export default function CokeAppSection() {
  return (
    <section id="cokeapp" className="relative mt-9 lg:mt-14">
      {FLAKES.map(([l, t]) => (
        <img key={l} src={snowflake} alt="" aria-hidden="true" className={SNOW} style={{ left: l, top: t }} />
      ))}
      <div className="relative z-10 mx-auto flex max-w-[686px] flex-col items-center gap-10 px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-bold">
            <span className={MID}>stay tuned with every step on</span> <span className={BIG}>Coke App</span>
          </p>
          <p className="max-w-[444px] text-[16px] leading-[20.48px]">
            Win prizes, be notified with all news also follow Santa on his path - all this in one place - <span className="font-bold">Coke App</span>
          </p>
        </div>
        <div className="app-store-badges" style={{ "--badges-art": `url("${appButtons}")` }}>
          <span className="app-store-badge" role="img" aria-label="Download on the App Store">
            <span className="app-store-badge-shine" aria-hidden="true" />
          </span>
          <span className="app-store-badge" role="img" aria-label="Get it on Google Play">
            <span className="app-store-badge-shine" aria-hidden="true" />
          </span>
        </div>
        <img src={gnomesGif} width={512} height={341} loading="lazy" alt="Three Coca-Cola gnomes looking at the Coke App" className="h-auto w-full max-w-[613px]" />
      </div>
      <ScrollRevealLine className="relative z-10 -mt-[clamp(0px,3.9vw,56px)]">
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <defs>
            <filter id="coke-app-line-wave" x="-5%" y="-25%" width="110%" height="150%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.022" numOctaves={1} seed={8} result="wave" />
              <feDisplacementMap in="SourceGraphic" in2="wave" scale={0} xChannelSelector="R" yChannelSelector="G">
                <animate
                  attributeName="scale"
                  values="0;7;0;-7;0"
                  dur="8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
                />
              </feDisplacementMap>
            </filter>
          </defs>
        </svg>
        <Layered w={1440} h={174} items={APP_DECO} className="coke-app-lines" />
      </ScrollRevealLine>
    </section>
  );
}
