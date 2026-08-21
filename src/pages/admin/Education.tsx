import { useEffect, useState } from "react";
import { academics as acadDefaults } from "../../data/academics";
import { courses as courseDefaults } from "../../data/courses";

type Acad = { title: string; sub: string; year: string; status: string; inst: string };
type Course = { title: string; provider: string; year: string; status: string; desc: string };
const ACAD_KEY = "admin_academics"; const COURSE_KEY = "admin_courses";
function load<T>(k: string, d: T[]): T[] { try { const v = JSON.parse(localStorage.getItem(k) || ""); if (Array.isArray(v) && v.length) return v; } catch { /* */ } return d; }
function save(k: string, d: unknown) { localStorage.setItem(k, JSON.stringify(d)); }
function toast(msg: string, err?: boolean) { const w = document.getElementById("toasts"); if (!w) return; const el = document.createElement("div"); el.className = "toast"; el.innerHTML = `<span class="dot ${err ? "dot-err" : "dot-ok"}"></span>${msg}`; w.appendChild(el); setTimeout(() => el.classList.add("out"), 3000); setTimeout(() => el.remove(), 3400); }


export function AdminEducation() {
  const [tab, setTab] = useState<"academics" | "courses">("academics");
  const [acad, setAcad] = useState<Acad[]>(() => load(ACAD_KEY, acadDefaults.map(a => ({ title: a.title, sub: a.subtitle, year: a.year, status: a.status, inst: a.institution }))));
  const [courses, setCourses] = useState<Course[]>(() => load(COURSE_KEY, courseDefaults.map(c => ({ title: c.title, provider: c.provider, year: c.year, status: c.status, desc: c.description }))));
  const [open, setOpen] = useState(false); const [editTab, setEditTab] = useState<"academics"|"courses">("academics"); const [idx, setIdx] = useState(-1);
  const [eTitle, setETitle] = useState(""); const [eSub, setESub] = useState(""); const [eYear, setEYear] = useState(""); const [eStatus, setEStatus] = useState("completed"); const [eInst, setEInst] = useState("");
  const [cTitle, setCTitle] = useState(""); const [cProv, setCProv] = useState(""); const [cYear, setCYear] = useState(""); const [cStatus, setCStatus] = useState("completed"); const [cDesc, setCDesc] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => { save(ACAD_KEY, acad); }, [acad]);
  useEffect(() => { save(COURSE_KEY, courses); }, [courses]);

  const openModal = (t?: "academics"|"courses", i?: number) => {
    const tv = t || tab; setEditTab(tv); setIdx(i ?? -1); setErr("");
    if (i !== undefined) {
      if (tv === "academics") { const a = acad[i]; setETitle(a.title); setESub(a.sub); setEYear(a.year); setEStatus(a.status); setEInst(a.inst); }
      else { const c = courses[i]; setCTitle(c.title); setCProv(c.provider); setCYear(c.year); setCStatus(c.status); setCDesc(c.desc); }
    } else { setETitle(""); setESub(""); setEYear(""); setEStatus("completed"); setEInst(""); setCTitle(""); setCProv(""); setCYear(""); setCStatus("completed"); setCDesc(""); }
    setOpen(true);
  };
  const close = () => setOpen(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    if (editTab === "academics") {
      if (!eTitle.trim()) { setErr("Title is required."); return; }
      const obj: Acad = { title: eTitle.trim(), sub: eSub.trim(), year: eYear.trim(), status: eStatus, inst: eInst.trim() };
      if (idx >= 0) { const n = [...acad]; n[idx] = obj; setAcad(n); toast("Entry updated"); } else { setAcad([...acad, obj]); toast("Entry added"); }
    } else {
      if (!cTitle.trim()) { setErr("Title is required."); return; }
      const obj: Course = { title: cTitle.trim(), provider: cProv.trim(), year: cYear.trim(), status: cStatus, desc: cDesc.trim() };
      if (idx >= 0) { const n = [...courses]; n[idx] = obj; setCourses(n); toast("Entry updated"); } else { setCourses([...courses, obj]); toast("Entry added"); }
    }
    setOpen(false);
  };
  const remove = (t: "academics"|"courses", i: number) => {
    const arr = t === "academics" ? acad : courses;
    if (!confirm(`Delete "${arr[i].title}" — are you sure?`)) return;
    if (t === "academics") setAcad(acad.filter((_, j) => j !== i)); else setCourses(courses.filter((_, j) => j !== i));
    toast("Entry deleted", true);
  };
  const delCurrent = () => { if (idx >= 0) { remove(editTab, idx); setOpen(false); } };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20 }}>Education</h1>
        <button className="btn btn-primary btn-sm" onClick={() => openModal()}>+ Add Entry</button>
      </div>
      <div className="tab-bar"><button className={tab === "academics" ? "active" : ""} onClick={() => setTab("academics")}>Academics</button><button className={tab === "courses" ? "active" : ""} onClick={() => setTab("courses")}>Professional Courses</button></div>
      {tab === "academics" ? (
        <div className="panel"><div className="table-wrap"><table>
          <thead><tr><th>Title</th><th>Subtitle</th><th>Year</th><th>Status</th><th>Institution</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>{acad.map((a, i) => (
            <tr key={i}><td style={{ fontWeight: 500 }}>{a.title}</td><td style={{ color: "var(--muted)" }}>{a.sub || "—"}</td><td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{a.year || "—"}</td><td>{a.status === "completed" ? <span className="badge badge-success">Completed</span> : <span className="badge badge-accent">In Progress</span>}</td><td style={{ color: "var(--muted)" }}>{a.inst || "—"}</td><td><div className="table-actions" style={{ justifyContent: "flex-end" }}><button className="act-edit" onClick={() => openModal("academics", i)}>Edit</button><button className="act-delete" onClick={() => remove("academics", i)}>Delete</button></div></td></tr>
          ))}</tbody>
        </table></div></div>
      ) : (
        <div className="panel"><div className="table-wrap"><table>
          <thead><tr><th>Title</th><th>Provider</th><th>Year</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>{courses.map((c, i) => (
            <tr key={i}><td style={{ fontWeight: 500 }}>{c.title}</td><td style={{ color: "var(--muted)" }}>{c.provider || "—"}</td><td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{c.year || "—"}</td><td>{c.status === "completed" ? <span className="badge badge-success">Completed</span> : <span className="badge badge-accent">In Progress</span>}</td><td><div className="table-actions" style={{ justifyContent: "flex-end" }}><button className="act-edit" onClick={() => openModal("courses", i)}>Edit</button><button className="act-delete" onClick={() => remove("courses", i)}>Delete</button></div></td></tr>
          ))}</tbody>
        </table></div></div>
      )}

      {open && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-labelledby="eduTitle">
            <div className="modal-header"><h2 id="eduTitle">{idx >= 0 ? "Edit Entry" : "Add Entry"}</h2><button className="modal-close" onClick={close} aria-label="Close">×</button></div>
            <form onSubmit={onSubmit} noValidate>
              {editTab === "academics" ? (
                <>
                  <div className="form-row"><div className="form-group"><label className="form-label">Title <span className="req">*</span></label><input className="form-input" value={eTitle} onChange={e => setETitle(e.target.value)} placeholder="BBA" required /></div><div className="form-group"><label className="form-label">Subtitle</label><input className="form-input" value={eSub} onChange={e => setESub(e.target.value)} placeholder="Bachelor of Business Administration" /></div></div>
                  <div className="form-row"><div className="form-group"><label className="form-label">Year</label><input className="form-input" value={eYear} onChange={e => setEYear(e.target.value)} placeholder="20— – 20—" style={{ fontFamily: "var(--font-mono)" }} /></div><div className="form-group"><label className="form-label">Status</label><select className="form-select" value={eStatus} onChange={e => setEStatus(e.target.value)}><option value="completed">Completed</option><option value="in-progress">In Progress</option></select></div></div>
                  <div className="form-group"><label className="form-label">Institution</label><input className="form-input" value={eInst} onChange={e => setEInst(e.target.value)} placeholder="University name" /></div>
                </>
              ) : (
                <>
                  <div className="form-row"><div className="form-group"><label className="form-label">Title <span className="req">*</span></label><input className="form-input" value={cTitle} onChange={e => setCTitle(e.target.value)} placeholder="Web Development" required /></div><div className="form-group"><label className="form-label">Provider</label><input className="form-input" value={cProv} onChange={e => setCProv(e.target.value)} placeholder="Programming Hero" /></div></div>
                  <div className="form-row"><div className="form-group"><label className="form-label">Year</label><input className="form-input" value={cYear} onChange={e => setCYear(e.target.value)} placeholder="2021" style={{ fontFamily: "var(--font-mono)" }} /></div><div className="form-group"><label className="form-label">Status</label><select className="form-select" value={cStatus} onChange={e => setCStatus(e.target.value)}><option value="completed">Completed</option><option value="in-progress">In Progress</option></select></div></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" rows={2} value={cDesc} onChange={e => setCDesc(e.target.value)} placeholder="Full-track bootcamp..." /></div>
                </>
              )}
              {err && <div className="form-error">{err}</div>}
              <div className="modal-footer">
                {idx >= 0 && <button type="button" className="btn btn-danger btn-sm" style={{ marginRight: "auto" }} onClick={delCurrent}>Delete</button>}
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
