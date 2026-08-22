import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 820) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link className="brand" to="/"><span className="brand-tilde">~/</span>nur-e-allhi</Link>
          <ul className="nav-links">
            <li><Link to="/" className={isHome ? "is-active" : ""}>Portfolio</Link></li>
            <li><Link to="/blog" className={location.pathname.startsWith("/blog") ? "is-active" : ""}>Blog</Link></li>
            <li><a href={isHome ? "#contact" : "/#contact"}>Contact</a></li>
          </ul>
          <button className={`burger ${open ? "x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`overlay ${open ? "show" : ""}`} onClick={close} />
      <nav className={`drawer ${open ? "open" : ""}`} aria-label="Mobile menu">
        <div className="drawer-header">
          <span className="drawer-brand">~/nur-e-allhi — menu</span>
          <button className="drawer-close" aria-label="Close menu" onClick={close}>×</button>
        </div>
        <div className="drawer-links">
          <Link to="/" onClick={close} className={isHome && location.pathname === "/" ? "active" : ""}><span className="dl-num">01</span> Portfolio</Link>
          <Link to="/blog" onClick={close} className={location.pathname.startsWith("/blog") ? "active" : ""}><span className="dl-num">02</span> Blog</Link>
          <a href={isHome ? "#contact" : "/#contact"} onClick={close}><span className="dl-num">03</span> Contact</a>
        </div>
        <div className="drawer-footer">
          <p>nureallhi1@gmail.com</p>
          <span>Available for junior roles · BD / Remote</span>
        </div>
      </nav>
    </>
  );
}
