import { Chip } from "../ui/Chip";
import { ScrollReveal } from "../ui/ScrollReveal";
import "./Objectives.css";

export function Objectives() {
  return (
    <section id="objectives" className="section">
      <div className="wrap">
        <ScrollReveal>
          <div className="sec-head">
            <span className="kicker">01 · objectives</span>
            <h2>Where I'm heading</h2>
            <p className="sec-lead">Two tracks, one direction — the network is the core, the web is the vehicle that carries it.</p>
          </div>
        </ScrollReveal>
        <div className="goal-grid">
          <ScrollReveal>
            <article className="card featured">
              <div className="card-head">
                <svg className="net" viewBox="0 0 140 96" width="120" height="82" fill="none" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="1.2" strokeOpacity=".5">
                    <path d="M70 46 14 22M70 46 34 12M70 46 104 14M70 46 128 30M70 46 22 78M70 46 96 86M70 46 70 84" />
                  </g>
                  <g fill="currentColor" fillOpacity=".7">
                    <circle cx="14" cy="22" r="3" /><circle cx="34" cy="12" r="3" />
                    <circle cx="104" cy="14" r="3" /><circle cx="128" cy="30" r="3" />
                    <circle cx="22" cy="78" r="3" /><circle cx="96" cy="86" r="3" /><circle cx="70" cy="84" r="3" />
                  </g>
                  <circle cx="70" cy="46" r="5" fill="#4FD1C5" />
                </svg>
                <div>
                  <span className="card-tag">primary track</span>
                  <h3>Networking &amp; Systems Administration</h3>
                </div>
              </div>
              <p>My main path — configuring, securing and keeping infrastructure running: addressing, routing, switching and the services that stay up.</p>
              <div className="chips">
                <Chip>TCP/IP</Chip><Chip>Routing</Chip><Chip>Switching</Chip><Chip>DNS/DHCP</Chip><Chip>Security</Chip>
              </div>
            </article>
          </ScrollReveal>
          <ScrollReveal delay=".08s">
            <article className="card">
              <span className="card-tag">supporting skill</span>
              <h3>Web Development</h3>
              <p>The craft I ship today — responsive, accessible interfaces that put data where people need it.</p>
              <div className="chips">
                <Chip>HTML/CSS</Chip><Chip>JavaScript</Chip><Chip>React</Chip><Chip>Responsive UI</Chip>
              </div>
            </article>
          </ScrollReveal>
        </div>
        <ScrollReveal>
          <div className="flow-strip">
            <span className="fs-line" aria-hidden="true" />
            <p>"Every request you make rides a network — I work both ends of the wire."</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
