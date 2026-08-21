import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Post = { id?: string; title: string; slug: string; excerpt: string; content: string; status: string; cover: string; date: string; order: number };
const COL = "blog";
function toast(msg: string, err?: boolean) { const w = document.getElementById("toasts"); if (!w) return; const el = document.createElement("div"); el.className = "toast"; el.innerHTML = `<span class="dot ${err ? "dot-err" : "dot-ok"}"></span>${msg}`; w.appendChild(el); setTimeout(() => el.classList.add("out"), 3000); setTimeout(() => el.remove(), 3400); }
function mdToHtml(md: string) { return md.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`(.+?)`/g, "<code>$1</code>").replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>"); }

export function BlogAdmin() {
  const [data, setData] = useState<Post[]>([]);
  const [open, setOpen] = useState(false); const [idx, setIdx] = useState(-1);
  const [title, setTitle] = useState(""); const [slug, setSlug] = useState(""); const [excerpt, setExcerpt] = useState(""); const [content, setContent] = useState(""); const [status, setStatus] = useState("draft"); const [cover, setCover] = useState(""); const [preview, setPreview] = useState(false); const [err, setErr] = useState("");

  useEffect(() => {
    const q = query(collection(db, COL), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => setData(snap.docs.map(d => ({ id: d.id, ...(d.data() as Post) }))), () => setData([]));
    return () => unsub();
  }, []);

  const onTitle = (v: string) => { setTitle(v); setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); };
  const openModal = (i?: number) => {
    if (i !== undefined) { const p = data[i]; setIdx(i); setTitle(p.title); setSlug(p.slug); setExcerpt(p.excerpt); setContent(p.content); setStatus(p.status); setCover(p.cover); }
    else { setIdx(-1); setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setStatus("draft"); setCover(""); }
    setErr(""); setPreview(false); setOpen(true);
  };
  const close = () => setOpen(false);
  const getObj = (publish?: boolean): Omit<Post, "id"> => ({
    title: title.trim(), slug: slug.trim(), excerpt: excerpt.trim(), content, status: publish ? "published" : status, cover: cover.trim(),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), order: idx >= 0 ? data[idx].order : data.length
  });

  const onPublish = async (e: React.FormEvent) => {
    e.preventDefault(); if (!title.trim()) { setErr("Title is required."); return; }
    const obj = getObj(true);
    try {
      if (idx >= 0 && data[idx].id) await updateDoc(doc(db, COL, data[idx].id!), obj);
      else if (idx >= 0) { const n = [...data]; n[idx] = { ...obj, id: undefined } as Post; setData(n); } else await addDoc(collection(db, COL), obj);
      toast(idx >= 0 ? "Post published" : "Post published"); setOpen(false);
    } catch (ex: unknown) { setErr(ex instanceof Error ? ex.message : "Save failed"); }
  };
  const onDraft = async () => {
    if (!title.trim()) { setErr("Title is required."); return; }
    const obj = getObj(); obj.status = "draft";
    try {
      if (idx >= 0 && data[idx].id) await updateDoc(doc(db, COL, data[idx].id!), obj);
      else if (idx >= 0) { const n = [...data]; n[idx] = { ...obj, id: undefined } as Post; setData(n); } else await addDoc(collection(db, COL), obj);
      toast(idx >= 0 ? "Draft saved" : "Draft created"); setOpen(false);
    } catch (ex: unknown) { setErr(ex instanceof Error ? ex.message : "Save failed"); }
  };
  const del = async (i: number) => {
    if (!confirm(`Delete "${data[i].title}" — are you sure?`)) return;
    try { if (data[i].id) await deleteDoc(doc(db, COL, data[i].id!)); else setData(data.filter((_, j) => j !== i)); toast("Post deleted", true); }
    catch (ex: unknown) { toast(ex instanceof Error ? ex.message : "Delete failed", true); }
  };
  const delCurrent = async () => { if (idx >= 0) { await del(idx); setOpen(false); } };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20 }}>Blog</h1>
        <button className="btn btn-primary btn-sm" onClick={() => openModal()}>+ New Post</button>
      </div>
      {data.length === 0 ? (
        <div className="panel"><div className="empty-state">
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--rad-sm)", padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: 13, textAlign: "left", maxWidth: 400, width: "100%" }}>
            <p style={{ marginBottom: 8 }}><span style={{ color: "var(--accent)" }}>$</span> git log --oneline</p>
            <p style={{ color: "var(--muted)", marginBottom: 8 }}><span className="badge badge-muted" style={{ fontSize: 10 }}>empty</span> No commits yet</p>
            <p><span style={{ color: "var(--accent)" }}>$</span> <span style={{ color: "var(--muted)" }}>_</span></p>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>No posts yet — create your first post</p>
          <button className="btn btn-primary btn-sm" onClick={() => openModal()} style={{ marginTop: 8 }}>+ New Post</button>
        </div></div>
      ) : (
        <div className="panel"><div className="table-wrap"><table>
          <thead><tr><th>Title</th><th>Status</th><th>Date</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>{data.map((p, i) => (
            <tr key={p.id || i}><td style={{ fontWeight: 500 }}>{p.title}</td><td>{p.status === "published" ? <span className="badge badge-success">Published</span> : <span className="badge badge-muted">Draft</span>}</td><td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{p.date || "—"}</td><td><div className="table-actions" style={{ justifyContent: "flex-end" }}><button className="act-edit" onClick={() => openModal(i)}>Edit</button><button className="act-delete" onClick={() => del(i)}>Delete</button></div></td></tr>
          ))}</tbody>
        </table></div></div>
      )}

      {open && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-labelledby="blogTitle" style={{ maxWidth: 700 }}>
            <div className="modal-header"><h2 id="blogTitle">{idx >= 0 ? "Edit Post" : "New Post"}</h2><button className="modal-close" onClick={close} aria-label="Close">×</button></div>
            <form onSubmit={onPublish} noValidate>
              <div className="form-group"><label className="form-label">Title <span className="req">*</span></label><input className="form-input" value={title} onChange={e => onTitle(e.target.value)} placeholder="How I built my first network lab" required /></div>
              <div className="form-group"><label className="form-label">Slug</label><input className="form-input" value={slug} onChange={e => setSlug(e.target.value)} placeholder="auto-generated-from-title" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} /></div>
              <div className="form-group"><label className="form-label">Excerpt</label><input className="form-input" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A short summary..." /></div>
              <div className="form-group">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}><label className="form-label" style={{ marginBottom: 0 }}>Content (Markdown)</label><button type="button" className="btn btn-ghost btn-sm" onClick={() => setPreview(!preview)} style={{ padding: "4px 10px", fontSize: 11 }}>{preview ? "Hide Preview" : "Preview"}</button></div>
                <textarea className="form-textarea mono" rows={10} value={content} onChange={e => setContent(e.target.value)} placeholder="# Heading&#10;&#10;Write your post in markdown..." required />
                {preview && <div className="preview-panel open" style={{ display: "block", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--rad-sm)", padding: 20, marginTop: 12, fontSize: 14, lineHeight: 1.7, maxHeight: 400, overflowY: "auto" }} dangerouslySetInnerHTML={{ __html: mdToHtml(content) || '<p style="color:var(--muted)">Nothing to preview</p>' }} />}
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Status</label><select className="form-select" value={status} onChange={e => setStatus(e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div>
                <div className="form-group"><label className="form-label">Cover Image URL</label><input className="form-input" value={cover} onChange={e => setCover(e.target.value)} placeholder="https://..." /></div>
              </div>
              {err && <div className="form-error">{err}</div>}
              <div className="modal-footer">
                {idx >= 0 && <button type="button" className="btn btn-danger btn-sm" style={{ marginRight: "auto" }} onClick={delCurrent}>Delete</button>}
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>Cancel</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={onDraft}>Save Draft</button>
                <button type="submit" className="btn btn-primary btn-sm">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
