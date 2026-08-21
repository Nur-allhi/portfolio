import { academics } from "../../data/academics";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./Academics.css";

export function Academics() {
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
          {academics.map((a, i) => (
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
