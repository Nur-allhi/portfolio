import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { projects as fallback } from "../../data/projects";
import { Chip } from "../ui/Chip";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./Projects.css";

export function Projects() {
  const [rows, setRows] = useState<typeof fallback | null>(null);
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) setRows([]);
      else setRows(snap.docs.map(d => {
        const v = d.data() as { title: string; num: string; desc: string; stack: string[]; repo: string; live: string; status: string };
        return { id: d.id, number: v.num, title: v.title, description: v.desc, stack: v.stack, repoUrl: v.repo, liveUrl: v.live, status: v.status };
      }));
    }, () => setRows([]));
    return () => unsub();
  }, []);
  if (rows === null) return (
    <section id="projects" className="section"><div className="wrap"><div className="sec-head"><span className="kicker">02 · projects</span><h2>Things I've shipped</h2></div><div className="project-grid">{[0, 1, 2].map(i => <div key={i} className="project-card" style={{ opacity: .4 }}><div style={{ height: 14, background: "var(--border)", borderRadius: 6 }} /></div>)}</div></div></section>
  );
  if (rows.length === 0) return null;
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <ScrollReveal>
          <div className="sec-head">
            <span className="kicker">02 · projects</span>
            <h2>Things I've shipped</h2>
            <p className="sec-lead">Apps built end-to-end — from a dark financial dashboard to a remote-first TV interface.</p>
          </div>
        </ScrollReveal>
        <div className="project-grid">
          {rows.map((p, i) => (
            <ScrollReveal key={p.id} delay={i ? `${i * 0.08}s` : undefined}>
              <article className="project-card">
                <div className="project-top">
                  <span className="pnum">{p.number}</span>
                  {p.status && <span className="pstatus">{p.status}</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="pdesc">{p.description}</p>
                <div className="chips">
                  {p.stack.map((s) => <Chip key={s}>{s}</Chip>)}
                </div>
                <div className="p-links">
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">repo <svg className="arrow" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9 9 3M9 3H4.5M9 3v4.5" /></svg></a>
                  {p.liveUrl && p.liveUrl !== "#" && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">live <svg className="arrow" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9 9 3M9 3H4.5M9 3v4.5" /></svg></a>}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
