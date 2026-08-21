import { useEffect, useState } from "react";
import "./FlowLine.css";

const SECTIONS = ["home", "objectives", "projects", "courses", "academics", "contact"];

export function FlowLine() {
  const [active, setActive] = useState("home");
  const [positions, setPositions] = useState<Record<string, number>>({});

  useEffect(() => {
    const place = () => {
      const pos: Record<string, number> = {};
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) pos[id] = el.offsetTop;
      });
      setPositions(pos);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const secs = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const p = window.scrollY + window.innerHeight * 0.32;
        let cur = secs[0];
        secs.forEach((s) => { if (s.offsetTop <= p) cur = s; });
        if (cur) setActive(cur.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flow-track" aria-hidden="true">
      <div className="flow-rail" />
      {SECTIONS.map((id) => (
        <span
          key={id}
          className={`flow-node ${active === id ? "active" : ""}`}
          data-sec={id}
          style={{ top: positions[id] ? `${positions[id]}px` : undefined }}
        />
      ))}
    </div>
  );
}
