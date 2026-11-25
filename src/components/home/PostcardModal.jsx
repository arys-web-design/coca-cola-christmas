import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PostcardArt from "./PostcardArt";
import PostcardForm from "./PostcardForm";

export default function PostcardModal({ open, onClose }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }

    const frame = requestAnimationFrame(() => setShown(true));
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    // keep the page still behind the overlay, without a sideways jump
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: document.body.style.overflow, pad: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    if (gap) document.body.style.paddingRight = `${gap}px`;
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pad;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Coca-Cola Christmas postcard">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: shown ? 0.62 : 0 }}
      />
      <div className="pointer-events-none relative flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="pointer-events-auto relative w-[min(92vw,1180px)] transition duration-300 ease-out motion-reduce:transition-none"
          style={{ opacity: shown ? 1 : 0, transform: shown ? "scale(1)" : "scale(0.92)" }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close postcard"
            className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-background shadow-lg transition-opacity hover:opacity-80 motion-reduce:transition-none sm:-right-4 sm:-top-4"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
          <PostcardArt>
            <PostcardForm />
          </PostcardArt>
        </div>
      </div>
    </div>
  );
}
