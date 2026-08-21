import { courses } from "../../data/courses";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./ProfessionalCourses.css";

export function ProfessionalCourses() {
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
          {courses.map((c, i) => (
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
