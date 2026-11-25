// Artwork group laid out in the design's own proportions: scales fluidly, keeps every piece's place.
// items: [src, left, top, width, height, alt?, fit?, imageClass?] in design px relative to (w x h)
const imageFit = {
  cover: "object-cover",
  fill: "object-fill",
};

export default function Layered({ w, h, items, className = "", style, loading }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      {items.map(([src, l, t, iw, ih, alt, fit, imageClass = ""], i) => (
        <img
          key={i}
          src={src}
          loading={loading}
          alt={alt || ""}
          aria-hidden={alt ? undefined : true}
          className={`absolute max-w-none ${imageFit[fit] ?? "object-contain"} ${imageClass}`}
          style={{
            left: `${(l / w) * 100}%`,
            top: `${(t / h) * 100}%`,
            width: `${(iw / w) * 100}%`,
            height: `${(ih / h) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
