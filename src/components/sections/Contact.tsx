import { ScrollReveal } from "../ui/ScrollReveal";
import "./Contact.css";

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <ScrollReveal><span className="kicker">05 · contact</span></ScrollReveal>
        <ScrollReveal delay=".06s"><h2>Let's build something that flows</h2></ScrollReveal>
        <ScrollReveal delay=".12s"><p className="sec-lead">Have a project, a role, or just want to talk shop about routers and React?</p></ScrollReveal>
        <ScrollReveal delay=".18s"><a className="email-big" href="mailto:nureallhi1@gmail.com">nureallhi1@gmail.com</a></ScrollReveal>
        <ScrollReveal delay=".24s">
          <div className="hero-cta">
            <a className="btn btn-primary" href="mailto:nureallhi1@gmail.com">Send an email <span>→</span></a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay=".3s">
          <div className="socials">
            <a className="soc" href="https://github.com/Nur-allhi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 16 16" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
            </a>
            <a className="soc" href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay=".36s"><p className="contact-note">Based in bangladesh · open to remote junior roles</p></ScrollReveal>
      </div>
    </section>
  );
}
