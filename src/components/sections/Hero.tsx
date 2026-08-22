import { ScrollReveal } from "../ui/ScrollReveal";
import { Typewriter } from "../ui/Typewriter";
import { SocialIcons } from "../ui/SocialIcons";
import "./Hero.css";

export function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="hero-inner">
        <ScrollReveal><span className="hero-kicker"><span className="k-dot" />status: available for junior roles</span></ScrollReveal>
        <ScrollReveal delay=".06s"><h1>Nur E <span className="accent-word">Allhi</span></h1></ScrollReveal>
        <ScrollReveal delay=".12s"><Typewriter /></ScrollReveal>
        <ScrollReveal delay=".18s">
          <p className="hero-lead">I build clean, responsive interfaces — and I'm studying the networks that carry them. From routing tables to the browser, I work the whole path.</p>
        </ScrollReveal>
        <ScrollReveal delay=".24s">
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">View My Work <span>→</span></a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay=".3s"><SocialIcons /></ScrollReveal>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>scroll</span><span className="cue-line" /></div>
    </section>
  );
}
