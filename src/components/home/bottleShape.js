// One continuous Coca-Cola bottle contour, used as an alpha mask so a glow takes the
// silhouette of the bottle instead of a rectangle. Same drawing as the preloader portal.
const PATH =
  "M16.6 0.5C16.6 0.2 16.8 0 17.1 0L21.9 0C22.2 0 22.4 0.2 22.4 0.5L22.4 5.2C22.4 5.8 22.2 6.1 21.9 6.4C22.1 12 22.2 19 22 26C21.9 30.5 22.4 33 25.2 36.5C28.4 40.5 32.2 43.5 32.7 49C33.1 54 32.3 60 32.5 66C32.7 72 32.2 79 32.4 86C32.6 94 31.6 99.5 28.6 103.5C26.2 106.8 23 108.6 19.5 108.6C16 108.6 12.8 106.8 10.4 103.5C7.4 99.5 6.4 94 6.6 86C6.8 79 6.3 72 6.5 66C6.7 60 5.9 54 6.3 49C6.8 43.5 10.6 40.5 13.8 36.5C16.6 33 17.1 30.5 17 26C16.8 19 16.9 12 17.1 6.4C16.8 6.1 16.6 5.8 16.6 5.2Z";

export const BOTTLE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 112" preserveAspectRatio="none"><path fill="#000" d="${PATH}"/></svg>`,
)}")`;
