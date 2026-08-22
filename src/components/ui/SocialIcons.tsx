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
  if (p === "whatsapp") return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.05 2C6.6 2 2.15 6.45 2.15 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.26-1.38A9.83 9.83 0 0 0 12.05 21.8c5.46 0 9.91-4.45 9.91-9.9 0-2.65-1.03-5.13-2.91-6.99zm-7 15.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.82-3.04-.2-.31A8.13 8.13 0 0 1 3.9 11.9c0-4.49 3.65-8.14 8.15-8.14 2.17 0 4.21.85 5.75 2.39a8.07 8.07 0 0 1 2.39 5.75c0 4.5-3.65 8.11-8.14 8.11zm6.55-9.45c-.42-.21-2.5-1.23-2.89-1.37-.39-.14-.67-.21-1  .21-.32.42-1.13 1.37-1.38 1.65-.25.28-.5.32-.92.11-.42-.21-1.78-.66-3.39-2.1-1.25-1.11-2.1-2.48-2.35-2.9-.25-.42-.03-.65.19-.86.2-.2.42-.5.63-.75.21-.25.28-.42.42-.7.14-.28.07-.53-.03-.74-.1-.21-1-2.41-1.37-3.3-.36-.87-.73-.75-1-.76h-.85c-.29 0-.76.11-1.16.53-.4.42-1.53 1.5-1.53 3.66s1.57 4.24 1.79 4.53c.21.28 3.09 4.71 7.3 6.31.42.18.8.32 1.32.42.56.18 1.05.15 1.45.09.44-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.42-.21z"/></svg>;
  return null;
}

export function SocialIcons() {
  const [rows, setRows] = useState<SocialLink[]>(defaultSocials);
  useEffect(() => {
    const q = query(collection(db, "socials"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) setRows(snap.docs.map(d => ({ id: d.id, ...(d.data() as SocialLink) })).filter(r => r.url && r.url !== "#"));
    });
    return () => unsub();
  }, []);
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
