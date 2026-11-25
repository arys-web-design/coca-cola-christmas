import { treeGif } from "@/lib/home-assets";
import Layered from "./Layered";
import { BOTTLE_MASK } from "./bottleShape";
import { TREE_BOX } from "./data";

const [canvasWidth, canvasHeight] = [664, 592];
const [sectionWidth, sectionHeight] = TREE_BOX;
const treeScale = 0.82;
const treeHeight = sectionHeight * treeScale;
const treeWidth = treeHeight * canvasWidth / canvasHeight;
const treeCenter = 651;

// Bottle bounds measured in pixels on the original 664 × 592 GIF canvas.
const BOTTLES = [
  { x: 325, y: 78, w: 78, h: 176, tint: "0 0% 100%", flavour: "Zero Sugar Zero Caffeine" },
  { x: 255, y: 195, w: 80, h: 208, tint: "48 95% 58%", flavour: "Zero Sugar Lemon" },
  { x: 391, y: 217, w: 79, h: 188, tint: "342 90% 58%", flavour: "Zero Sugar Cherry" },
  { x: 323, y: 307, w: 85, h: 202, tint: "205 60% 90%", flavour: "Zero Sugar" },
];

export default function TreeGlow({ items }) {
  return (
    <div className="relative">
      <Layered
        w={sectionWidth}
        h={sectionHeight}
        items={items}
        className="tree-snow pointer-events-none"
      />
      <div
        className="absolute"
        style={{
          left: `${((treeCenter - treeWidth / 2) / sectionWidth) * 100}%`,
          top: `${(1 - treeScale) * 50}%`,
          width: `${(treeWidth / sectionWidth) * 100}%`,
        }}
      >
        <img
          src={treeGif}
          alt="Christmas tree decorated with Coca-Cola bottles and gnomes"
          width={canvasWidth}
          height={canvasHeight}
          loading="lazy"
          className="pointer-events-none block h-auto w-full"
        />
        {BOTTLES.map((b, i) => (
          <div
            key={i}
            className="group absolute z-10"
            aria-label={`${b.flavour} bottle`}
            style={{
              left: `${(b.x / canvasWidth) * 100}%`,
              top: `${(b.y / canvasHeight) * 100}%`,
              width: `${(b.w / canvasWidth) * 100}%`,
              height: `${(b.h / canvasHeight) * 100}%`,
            }}
          >
            {/* the glow itself is cut to the bottle outline */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                backgroundImage: `radial-gradient(62% 58% at 50% 56%, hsl(${b.tint} / 1), hsl(${b.tint} / 0.5) 58%, hsl(${b.tint} / 0) 84%)`,
                WebkitMaskImage: BOTTLE_MASK,
                maskImage: BOTTLE_MASK,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                mixBlendMode: "screen",
              }}
            />
            {/* a soft spill of light around it */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-34%] rounded-full opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(closest-side, hsl(${b.tint} / 0.5), hsl(${b.tint} / 0) 72%)`,
                mixBlendMode: "screen",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
