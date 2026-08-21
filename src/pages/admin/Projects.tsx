import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { projects as defaults } from "../../data/projects";

type Row = { id?: string; title: string; num: string; desc: string; stack: string[]; repo: string; live: string; status: string; order: number };
const COL = "projects";
const STACK_DEFAULT = ["React", "TypeScript", "Tailwind"];
function toast(msg: string, err?: boolean) {
  const w = document.getElementById("toasts"); if (!w) return;
  const el = document.createElement("div"); el.className = "toast";
  el.innerHTML = `<span class="dot ${err ? "dot-err" : "dot-ok"}"></span>${msg}`; w.appendChild(el);
  setTimeout(() => el.classList.add("out"), 3000); setTimeout(() => el.remove(), 3400);
}

export function AdminProjects() {
  const [data, setData] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [title, setTitle] = useState(""); const [num, setNum] = useState(""); const [desc, setDesc] = useState("");
  const [repo, setRepo] = useState(""); const [live, setLive] = useState(""); const [status, setStatus] = useState("completed");
  const [tags, setTags] = useState<string[]>(STACK_DEFAULT); const [tagInput, setTagInput] = useState(""); const [err, setErr] = useState("");

  useEffect(() => {
    const q = query(collection(db, COL), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) {
        setData(defaults.map((d, i) => ({ title: d.title, num: d.number, desc: d.description, stack: d.stack, repo: d.repoUrl, live: d.liveUrl || "", status: d.status || "completed", order: i })));
      } else setData(snap.docs.map(d => ({ id: d.id, ...(d.data() as Row) })));
    });
    return () => unsub();
  }, []);

  const openModal = (i?: number) => {
    if (i !== undefined) {
      const p = data[i]; setIdx(i); setTitle(p.title); setNum(p.num); setDesc(p.desc); setRepo(p.repo === "#" ? "" : p.repo); setLive(p.live === "#" ? "" : p.live); setStatus(p.status); setTags(p.stack.slice());
    } else { setIdx(-1); setTitle(""); setNum(""); setDesc(""); setRepo(""); setLive(""); setStatus("completed"); setTags(STACK_DEFAULT.slice()); }
    setErr(""); setOpen(true);
  };
  const close = () => setOpen(false);
  const addTag = () => { const v = tagInput.trim(); if (v && !tags.includes(v)) setTags([...tags, v]); setTagInput(""); };
  const removeTag = (i: number) => setTags(tags.filter((_, j) => j !== i));

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) { setErr("Title and Description are required."); return; }
    const obj = { title: title.trim(), num: num.trim(), desc: desc.trim(), stack: tags.slice(), repo: repo.trim() || "#", live: live.trim(), status, order: idx >= 0 ? data[idx].order : data.length };
    try {
      if (idx >= 0 && data[idx].id) await updateDoc(doc(db, COL, data[idx].id!), obj);
      else if (idx >= 0) { const n = [...data]; n[idx] = { ...obj, id: undefined } as Row; setData(n); } else await addDoc(collection(db, COL), obj);
      toast(idx >= 0 ? "Project updated" : "Project added");
      setOpen(false);
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "Save failed"); }
  };
  const del = async (i: number) => {
    if (!confirm(`Delete "${data[i].title}" — are you sure?`)) return;
    try {
      if (data[i].id) await deleteDoc(doc(db, COL, data[i].id!));
      else setData(data.filter((_, j) => j !== i));
      toast("Project deleted", true);
    } catch (e: unknown) { toast(e instanceof Error ? e.message : "Delete failed", true); }
  };
  const delCurrent = async () => { if (idx >= 0) { await del(idx); setOpen(false); } };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20 }}>Projects</h1>
        <button className="btn btn-primary btn-sm" onClick={() => openModal()}>+ Add Project</button>
      </div>
      <div className="panel"><div className="table-wrap"><table>
        <thead><tr><th>#</th><th>Title</th><th>Stack</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
        <tbody>{data.map((p, i) => (
          <tr key={p.id || i}>
            <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{p.num || `/${String(i + 1).padStart(2, "0")}`}</td>
            <td style={{ fontWeight: 500 }}>{p.title}</td>
            <td><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{p.stack.map(s => <span key={s} className="chip">{s}</span>)}</div></td>
            <td>{p.status === "completed" ? <span className="badge badge-success">Completed</span> : <span className="badge badge-accent">In Development</span>}</td>
            <td><div className="table-actions" style={{ justifyContent: "flex-end" }}><button className="act-edit" onClick={() => openModal(i)}>Edit</button><button className="act-delete" onClick={() => del(i)}>Delete</button></div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {open && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-labelledby="modalTitle">
            <div className="modal-header"><h2 id="modalTitle">{idx >= 0 ? "Edit Project" : "Add Project"}</h2><button className="modal-close" onClick={close} aria-label="Close">×</button></div>
            <form onSubmit={onSave} noValidate>
              <div className="form-row">
                <div className="form-group"><label className="form-label" htmlFor="pTitle">Title <span className="req">*</span></label><input className="form-input" id="pTitle" value={title} onChange={e => setTitle(e.target.value)} placeholder="MoneyFlows" required /></div>
                <div className="form-group"><label className="form-label" htmlFor="pNum">Number</label><input className="form-input" id="pNum" value={num} onChange={e => setNum(e.target.value)} placeholder="/01" style={{ fontFamily: "var(--font-mono)" }} /></div>
              </div>
              <div className="form-group"><label className="form-label" htmlFor="pDesc">Description <span className="req">*</span></label><textarea className="form-textarea" id="pDesc" rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Family finance dashboard..." required /></div>
              <div className="form-group"><label className="form-label">Stack</label>
                <div className="tag-wrap" onClick={() => document.getElementById("stackInput")?.focus()}>
                  {tags.map((t, i) => <span key={t} className="chip">{t} <button type="button" onClick={() => removeTag(i)}>×</button></span>)}
                  <input id="stackInput" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } if (e.key === "Backspace" && !tagInput && tags.length) removeTag(tags.length - 1); }} placeholder="Type + Enter" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label" htmlFor="pRepo">Repo URL</label><input className="form-input" id="pRepo" value={repo} onChange={e => setRepo(e.target.value)} placeholder="https://github.com/..." /></div>
                <div className="form-group"><label className="form-label" htmlFor="pLive">Live URL</label><input className="form-input" id="pLive" value={live} onChange={e => setLive(e.target.value)} placeholder="https://..." /></div>
              </div>
              <div className="form-group"><label className="form-label" htmlFor="pStatus">Status</label><select className="form-select" id="pStatus" value={status} onChange={e => setStatus(e.target.value)}><option value="completed">Completed</option><option value="in development">In Development</option></select></div>
              {err && <div className="form-error">{err}</div>}
              <div className="modal-footer">
                {idx >= 0 && <button type="button" className="btn btn-danger btn-sm" style={{ marginRight: "auto" }} onClick={delCurrent}>Delete</button>}
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
