import Layered from "./Layered";
import { POSTCARD_ITEMS } from "./data";

// The postcard artwork with its decorative frame. `children` are dropped exactly on the
// card itself (the 787 x 525 picture inside the 929 x 712 composition), so anything
// positioned in percent sits on the postcard's own proportions at every size.
export default function PostcardArt({ children }) {
  return (
    <div className="relative">
      <Layered w={929} h={712} items={POSTCARD_ITEMS} loading={children ? "eager" : "lazy"} />
      <div
        className="absolute"
        style={{
          left: "7.907%",
          top: "9.984%",
          width: "84.715%",
          height: "73.736%",
          containerType: "inline-size",
        }}
      >
        {children}
      </div>
    </div>
  );
}
