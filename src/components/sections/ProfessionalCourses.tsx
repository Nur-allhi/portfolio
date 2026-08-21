import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { courses as fallback } from "../../data/courses";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./ProfessionalCourses.css";

export function ProfessionalCourses() {
  const [rows, setRows] = useState(fallback);
  useEffect(() => {
    const q = query(collection(db, "courses"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) setRows(snap.docs.map(d => {
        const v = d.data() as { title: string; provider: string; year: string; status: string; desc: string };
        return { id: d.id, title: v.title, provider: v.provider, year: v.year, status: v.status as "completed"|"in-progress", description: v.desc };
      }));
    });
    return () => unsub();
  }, []);
  return (
    <section id="courses" className="section">
      <div className="wrap">
        <ScrollReveal>
          <div className="sec-head">
            <span className="kicker">03 · professional courses</span>
            <h2>Training &amp; certification</h2>
            <p className="sec-lead">Structured programs that bridge theory and practice.</p>
          </div>
        </ScrollReveal>
        <div className="course-grid">
          {rows.map((c, i) => (
            <ScrollReveal key={c.id} delay={i ? ".08s" : undefined}>
              <article className="course-card">
                <div className="course-top">
                  <Badge variant={c.status === "completed" ? "done" : "live"}>{c.status === "completed" ? "Completed" : "In progress"}</Badge>
                  <span className="tl-year">{c.year}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="course-org">{c.provider}</p>
                <p className="course-desc">{c.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
