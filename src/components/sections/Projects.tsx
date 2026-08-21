import { projects } from "../../data/projects";
import { Chip } from "../ui/Chip";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./Projects.css";

export function Projects() {
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
          {projects.map((p, i) => (
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
