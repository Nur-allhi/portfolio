import { ScrollReveal } from "../ui/ScrollReveal";
import { SocialIcons } from "../ui/SocialIcons";
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
        <ScrollReveal delay=".3s"><SocialIcons /></ScrollReveal>
        <ScrollReveal delay=".36s"><p className="contact-note">Based in bangladesh · open to remote junior roles</p></ScrollReveal>
      </div>
    </section>
  );
}
