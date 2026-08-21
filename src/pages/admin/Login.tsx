import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import "../../components/admin/AdminLayout.css";
import "./Login.css";

export function Login() {
  const { isLoggedIn, login } = useAdminAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  if (isLoggedIn) return <Navigate to="/admin" replace />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !pass) { setErr("Both fields are required."); return; }
    if (login(email.trim(), pass)) nav("/admin");
    else { setErr("Invalid credentials — try again."); setPass(""); }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 className="login-title">Admin Access</h1>
        <p className="login-sub">Sign in to manage portfolio</p>
        <form onSubmit={onSubmit} style={{ marginTop: 28 }} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email <span className="req">*</span></label>
            <input className={`form-input ${err && !email ? "error" : ""}`} type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@nureallhi.dev" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="pass">Password <span className="req">*</span></label>
            <input className={`form-input ${err ? "error" : ""}`} type="password" id="pass" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter password" required autoComplete="current-password" />
          </div>
          {err && <div className="form-error" style={{ marginBottom: 16 }}>{err}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Sign In</button>
        </form>
        <p className="login-footer">Hidden access — no public link</p>
      </div>
    </main>
  );
}
