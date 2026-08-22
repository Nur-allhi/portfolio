import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import "./AdminLayout.css";

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { logout } = useAdminAuth();
  const nav = useNavigate();

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
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const doLogout = async () => { await logout(); nav("/admin/login"); };

  return (
    <div className="admin-wrap">
      <aside className={`sidebar ${open ? "open" : ""}`} id="sidebar" aria-label="Admin navigation">
        <div className="sidebar-brand"><span className="ba">~/</span>nur-e-allhi <span style={{ opacity: .4 }}>· admin</span></div>
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink>
          <NavLink to="/admin/education" className={({ isActive }) => isActive ? "active" : ""}>Education</NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => isActive ? "active" : ""}>Blog</NavLink>
          <NavLink to="/admin/socials" className={({ isActive }) => isActive ? "active" : ""}>Socials</NavLink>
        </nav>
        <div className="sidebar-footer"><button onClick={doLogout} className="logout-btn">Logout</button></div>
      </aside>
      <div className={`overlay ${open ? "show" : ""}`} id="overlay" onClick={() => setOpen(false)} />
      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className={`burger ${open ? "x" : ""}`} id="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>admin · nureallhi1@gmail.com</span>
          </div>
          <div className="topbar-actions">
            <a href="/" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>View site ↗</a>
          </div>
        </div>
        <div className="admin-content"><Outlet /></div>
      </div>
      <div id="toasts" className="toast-wrap" />
    </div>
  );
}
