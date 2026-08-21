import { useEffect, useState } from "react";
import "./Typewriter.css";

const PHRASES = ["Junior Web Developer", "Networking Student", "Building Solutions That Flow"];

export function Typewriter() {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(PHRASES[0]);
      return;
    }
    const phrase = PHRASES[pi];
    let timeout: number;
    if (deleting) {
      if (ci === 0) {
        setDeleting(false);
        setPi((p) => (p + 1) % PHRASES.length);
      } else {
        timeout = window.setTimeout(() => {
          setCi((c) => c - 1);
          setText(phrase.slice(0, ci - 1));
        }, 36);
      }
    } else {
      if (ci === phrase.length) {
        timeout = window.setTimeout(() => setDeleting(true), 1500);
      } else {
        timeout = window.setTimeout(() => {
          setCi((c) => c + 1);
          setText(phrase.slice(0, ci + 1));
        }, 68);
      }
    }
    return () => clearTimeout(timeout);
  }, [ci, pi, deleting]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (text === "" && pi === 0 && ci === 0 && !deleting) {
        // initial trigger already handled
      }
    }, 500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  return (
    <div className="type-line" aria-label={PHRASES.join(", ")}>
      <span className="prompt">&gt;</span>
      <span>{text}</span>
      <span className="caret" aria-hidden="true" />
    </div>
  );
}
