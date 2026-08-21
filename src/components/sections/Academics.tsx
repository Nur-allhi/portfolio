import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { academics as fallback } from "../../data/academics";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./Academics.css";

export function Academics() {
  const [rows, setRows] = useState(fallback);
  useEffect(() => {
    const q = query(collection(db, "academics"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) setRows(snap.docs.map(d => {
        const v = d.data() as { title: string; sub: string; year: string; status: string; inst: string };
        return { id: d.id, title: v.title, subtitle: v.sub, year: v.year, status: v.status as "completed"|"in-progress", institution: v.inst };
      }));
    });
    return () => unsub();
  }, []);
  return (
    <section id="academics" className="section">
      <div className="wrap">
        <ScrollReveal>
          <div className="sec-head">
            <span className="kicker">04 · academics</span>
            <h2>Education path</h2>
            <p className="sec-lead">From school through to postgraduate study — the academic thread behind the work.</p>
          </div>
        </ScrollReveal>
        <div className="timeline">
          {rows.map((a, i) => (
            <ScrollReveal key={a.id} delay={i ? `${i * 0.06}s` : undefined}>
              <div className="tl-item">
                <h3>{a.title}</h3>
                <p className="tl-sub">{a.subtitle}</p>
                <div className="tl-meta">
                  <span className="tl-year">{a.year}</span>
                  <Badge variant={a.status === "completed" ? "done" : "live"}>{a.status === "completed" ? "Completed" : "In progress"}</Badge>
                </div>
                <p className="tl-place">{a.institution}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
