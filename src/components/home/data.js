import { appDecoration, heroFrame, heroGif, postcard, postcardFrame, sleighPath, snowflake } from "@/lib/home-assets";

export const MID = "text-[clamp(22px,4.2vw,40px)] leading-[1.057]";
export const BIG = "text-[clamp(44px,9vw,88px)] leading-[1.057]";
export const SNOW = "pointer-events-none absolute z-0 w-[clamp(56px,10.55vw,152px)] decorative-snowflake";

export const HERO_ITEMS = [
  [heroGif, 26.3057, 33, 1245, 596, "Two hands toasting Coca-Cola bottles in a snowy garden", "cover"],
  [heroFrame, 0, 0, 1322, 1322 * 706 / 1325],
];

// The local export is cropped closer to the painted stroke than the Figma layer.
export const SLEIGH_PATH_ITEMS = [[sleighPath, -0.2, -12, 360, 185]];
export const SLEIGH_SIZE = 121;
// The runner touches the white stroke at this point in the square sleigh image.
export const SLEIGH_CONTACT = [0.5, 0.85];
// Center of the painted stroke, measured in the original 360 × 185 PNG.
export const SLEIGH_TRACE = [
  [215, 95], [220, 96], [225, 96], [230, 98], [235, 100], [240, 104],
  [245, 108], [250, 112], [255, 115], [260, 120], [265, 125], [270, 130],
];
export const SLEIGH_BOX = [359, 235];

export const TREE_BOX = [1320, 1347];
export const TREE_ITEMS = [
  [snowflake, 0, 0, 152, 163, "", undefined, "decorative-snowflake"],
  [snowflake, 1035, 163, 152, 163, "", undefined, "decorative-snowflake"],
  [snowflake, 0, 592, 152, 163, "", undefined, "decorative-snowflake"],
  [snowflake, 1168, 956, 152, 163, "", undefined, "decorative-snowflake"],
];

export const APP_DECO = [[appDecoration, 0, 17, 1440, 1440 * 159 / 1425]];

export const POSTCARD_ITEMS = [
  [postcard, 73.4644, 71.0898, 787, 525, "Vintage Coca-Cola postcard with a polar bear"],
  [postcardFrame, 0, 0, 929, 929 * 719 / 936],
];
