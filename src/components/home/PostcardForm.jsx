import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// handwriting on the card's own ruled lines — no boxes, no borders
const FIELD =
  "absolute m-0 appearance-none rounded-none border-0 bg-transparent p-0 font-handwriting text-postcard-ink outline-none ring-0 placeholder:text-postcard-ink/35";
const TEXT = { fontSize: "clamp(11px, 3.4cqw, 30px)", lineHeight: 1.08 };

export default function PostcardForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!values.name.trim()) return setError("Please write your name.");
    if (!EMAIL.test(values.email.trim())) return setError("Please check your e-mail address.");
    if (!values.message.trim()) return setError("Please write a wish.");
    setError("");
    setSent(true);
  };

  return (
    <form className="absolute inset-0" onSubmit={submit} noValidate>
      <input
        aria-label="Name"
        autoComplete="name"
        autoFocus
        value={values.name}
        onChange={set("name")}
        placeholder="Name"
        className={FIELD}
        style={{ ...TEXT, left: "59.1%", top: "46.4%", width: "33.6%", height: "6.2%" }}
      />
      <input
        aria-label="E-mail"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={set("email")}
        placeholder="E-mail"
        className={FIELD}
        style={{ ...TEXT, left: "59.1%", top: "56%", width: "33.2%", height: "6.2%" }}
      />
      <textarea
        aria-label="Message"
        value={values.message}
        onChange={set("message")}
        placeholder="Message"
        className={`${FIELD} resize-none overflow-y-auto`}
        style={{ ...TEXT, left: "59%", top: "63.4%", width: "33.4%", height: "9.7%" }}
      />

      {error && !sent && (
        <p
          role="alert"
          className="absolute font-handwriting text-background"
          style={{ left: "59%", top: "74.8%", width: "33.4%", fontSize: "clamp(9px, 2.4cqw, 19px)", lineHeight: 1.1 }}
        >
          {error}
        </p>
      )}

      {sent ? (
        <p
          role="status"
          className="absolute font-heading font-bold text-background"
          style={{ left: "59%", top: "78.5%", width: "33.4%", fontSize: "clamp(10px, 2.9cqw, 25px)", lineHeight: 1.2 }}
        >
          Your Christmas wish is ready!
        </p>
      ) : (
        <button
          type="submit"
          className="absolute flex items-center justify-center rounded-sm bg-background font-heading font-bold tracking-[0.08em] text-secondary transition-opacity hover:opacity-90 motion-reduce:transition-none"
          style={{ left: "59%", top: "80.5%", width: "23%", height: "6.4%", fontSize: "clamp(8px, 2.1cqw, 16px)" }}
        >
          SEND WISH
        </button>
      )}
    </form>
  );
}
