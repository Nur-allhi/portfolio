import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { defaultSocials, type SocialLink, type SocialPlatform } from "../../data/socials";

const COL = "socials";
const PLATFORMS: SocialPlatform[] = ["github", "linkedin", "facebook", "instagram", "whatsapp"];
function toast(msg: string, err?: boolean) { const w = document.getElementById("toasts"); if (!w) return; const el = document.createElement("div"); el.className = "toast"; el.innerHTML = `<span class="dot ${err ? "dot-err" : "dot-ok"}"></span>${msg}`; w.appendChild(el); setTimeout(() => el.classList.add("out"), 3000); setTimeout(() => el.remove(), 3400); }

export function AdminSocials() {
  const [rows, setRows] = useState<SocialLink[]>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [platform, setPlatform] = useState<SocialPlatform>("github");
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const q = query(collection(db, COL), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) setRows(defaultSocials);
      else setRows(snap.docs.map(d => ({ id: d.id, ...(d.data() as SocialLink) })));
    });
    return () => unsub();
  }, []);

  const openModal = (i?: number) => {
    if (i !== undefined) { setIdx(i); setPlatform(rows[i].platform); setUrl(rows[i].url); }
    else { setIdx(-1); setPlatform("github"); setUrl(""); }
    setErr(""); setOpen(true);
  };
  const close = () => setOpen(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) { setErr("URL is required."); return; }
    try { new URL(url.trim()); } catch { setErr("Enter a valid URL (https://... or https://wa.me/...)"); return; }
    const obj = { platform, url: url.trim(), order: idx >= 0 ? rows[idx].order : rows.length };
    try {
      if (idx >= 0 && rows[idx].id) await updateDoc(doc(db, COL, rows[idx].id!), obj);
      else if (idx >= 0) { const n = [...rows]; n[idx] = { ...obj } as SocialLink; setRows(n); } else await addDoc(collection(db, COL), obj);
      toast(idx >= 0 ? "Link updated" : "Link added"); setOpen(false);
    } catch (ex: unknown) { setErr(ex instanceof Error ? ex.message : "Save failed"); }
  };

  const del = async (i: number) => {
    if (!confirm(`Delete ${rows[i].platform} link?`)) return;
    try { if (rows[i].id) await deleteDoc(doc(db, COL, rows[i].id!)); else setRows(rows.filter((_, j) => j !== i)); toast("Link deleted", true); }
    catch (ex: unknown) { toast(ex instanceof Error ? ex.message : "Delete failed", true); }
  };
  const delCurrent = async () => { if (idx >= 0) { await del(idx); setOpen(false); } };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20 }}>Social Links</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Manage icons shown in Hero + Contact (GitHub, LinkedIn, Facebook, Instagram, WhatsApp)</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => openModal()}>+ Add Link</button>
      </div>

      <div className="panel"><div className="table-wrap"><table>
        <thead><tr><th>Platform</th><th>URL</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={r.id || i}>
            <td style={{ textTransform: "capitalize", fontWeight: 500 }}>{r.platform}</td>
            <td style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12, maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.url}</td>
            <td><div className="table-actions" style={{ justifyContent: "flex-end" }}><button className="act-edit" onClick={() => openModal(i)}>Edit</button><button className="act-delete" onClick={() => del(i)}>Delete</button></div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {open && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-labelledby="socialTitle">
            <div className="modal-header"><h2 id="socialTitle">{idx >= 0 ? "Edit Link" : "Add Link"}</h2><button className="modal-close" onClick={close} aria-label="Close">×</button></div>
            <form onSubmit={onSave} noValidate>
              <div className="form-group"><label className="form-label">Platform <span className="req">*</span></label>
                <select className="form-select" value={platform} onChange={e => setPlatform(e.target.value as SocialPlatform)}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">URL <span className="req">*</span></label>
                <input className="form-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://facebook.com/yourpage or https://wa.me/8801XXXXXXXXX" required style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} />
                <p style={{ color: "var(--muted)", fontSize: 11, marginTop: 6, fontFamily: "var(--font-mono)" }}>WhatsApp: use https://wa.me/8801XXXXXXXXX — Instagram/Facebook: full profile URL</p>
              </div>
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
