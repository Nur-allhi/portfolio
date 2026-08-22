import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { defaultSocials, type SocialLink } from "../../data/socials";
import "./SocialIcons.css";

function Icon({ p }: { p: string }) {
  if (p === "github") return <svg viewBox="0 0 16 16" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>;
  if (p === "linkedin") return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>;
  if (p === "facebook") return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
  if (p === "instagram") return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>;
  if (p === "whatsapp") return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.72 14.9L2 22l5.24-1.38A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.08-1.1l-.29-.17-3.11.82.82-3.03-.2-.32A8.08 8.08 0 0 1 3.91 12c0-4.48 3.65-8.12 8.09-8.12 2.16 0 4.2.85 5.73 2.39A8.05 8.05 0 0 1 20.09 12c0 4.48-3.65 8-8.09 8zm4.6-6.12c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.65.8-.8.96-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.02-.38.11-.51.11-.12.25-.3.38-.46.12-.16.16-.27.24-.44.08-.17.04-.32-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.6 4.15 3.65.58.25 1.03.4 1.38.52.58.18 1.11.15 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.57.2-1.05.14-1.15-.06-.1-.23-.16-.48-.28z"/></svg>;
  return null;
}

export function SocialIcons() {
  const [rows, setRows] = useState<SocialLink[] | null>(null);
  useEffect(() => {
    const q = query(collection(db, "socials"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) setRows(defaultSocials.filter(r => r.url && r.url !== "#"));
      else setRows(snap.docs.map(d => ({ id: d.id, ...(d.data() as SocialLink) })).filter(r => r.url && r.url !== "#"));
    }, () => setRows(defaultSocials.filter(r => r.url && r.url !== "#")));
    return () => unsub();
  }, []);
  if (rows === null) {
    return (
      <div className="socials" aria-hidden="true">
        {[0, 1, 2, 3].map(i => <span key={i} className="soc soc-skeleton" />)}
      </div>
    );
  }
  if (!rows.length) return null;
  return (
    <div className="socials">
      {rows.map(r => (
        <a key={r.platform + r.url} className="soc" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.platform}>
          <Icon p={r.platform} />
        </a>
      ))}
    </div>
  );
}
