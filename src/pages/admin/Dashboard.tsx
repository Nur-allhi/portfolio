import { Link } from "react-router-dom";

export function Dashboard() {
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 20 }}>Dashboard</h1>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{date}</span>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-icon">◫</div><div className="stat-num">3</div><div className="stat-label">Total Projects</div></div>
        <div className="stat-card"><div className="stat-icon">⬡</div><div className="stat-num">3</div><div className="stat-label">Education Entries</div></div>
        <div className="stat-card"><div className="stat-icon">▭</div><div className="stat-num">2</div><div className="stat-label">Courses</div></div>
        <div className="stat-card"><div className="stat-icon">✎</div><div className="stat-num">0</div><div className="stat-label">Blog Posts</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="panel">
          <div className="panel-header"><h3>Recent Activity</h3></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border-soft)" }}>
              <div><div style={{ fontSize: 14 }}>Edited <strong>Projects</strong></div><div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Updated MoneyFlows description</div></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>2 hours ago</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border-soft)" }}>
              <div><div style={{ fontSize: 14 }}>Added <strong>YardFlow</strong></div><div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", marginTop: 2 }}>New project card created</div></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>1 day ago</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
              <div><div style={{ fontSize: 14 }}>Edited <strong>Education</strong></div><div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Updated MBA status to In Progress</div></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>3 days ago</span>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header"><h3>Quick Actions</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/admin/projects" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>+ Add Project</Link>
            <Link to="/admin/blog" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>+ Add Blog Post</Link>
            <Link to="/admin/education" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>+ Manage Education</Link>
            <a href="/" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>View Public Site ↗</a>
          </div>
        </div>
      </div>
    </>
  );
}
