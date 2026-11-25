import { useCallback, useRef, useState } from "react";
import { BIG, MID } from "./data";
import PostcardArt from "./PostcardArt";
import PostcardModal from "./PostcardModal";

export default function PostcardSection() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="postcard" className="mt-9 px-3 sm:px-[1.5%] lg:mt-14">
      <div className="mx-auto flex max-w-[1392px] flex-col items-center gap-10">
        <p data-scroll-reveal="0" className="text-center font-bold">
          <span className={MID}>
            but instead wasting your time with scrolling, <br />why not to send to your dearest
          </span>{" "}
          <br />
          <span className={BIG}>#CokePostcard?</span>
        </p>
        <div data-scroll-reveal="1" className="w-full max-w-[929px]">
          <div
            ref={triggerRef}
            role="button"
            tabIndex={0}
            aria-label="Open the Coca-Cola Christmas postcard"
            onClick={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className="cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary motion-reduce:transition-none"
          >
            <PostcardArt />
          </div>
        </div>
      </div>
      <PostcardModal open={open} onClose={close} />
    </section>
  );
}
