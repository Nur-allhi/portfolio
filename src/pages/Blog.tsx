import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import "./Blog.css";

type Post = { id: string; title: string; slug: string; excerpt: string; date: string };
export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const q = query(collection(db, "blog"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map(d => ({ ...(d.data() as Post), id: d.id, ...(d.data() as { status?: string }) }));
      setPosts(all.filter((p: Post & { status?: string }) => (p.status || "published") === "published"));
    }, (e) => { console.error("Blog onSnapshot:", e); });
    return () => unsub();
  }, []);
  if (posts.length) {
    return (
      <main className="blog-main" style={{ placeItems: "start", paddingTop: "calc(var(--nav-h) + 40px)" }}>
        <div className="blog-inner" style={{ textAlign: "left", maxWidth: 720 }}>
          <span className="kicker">~/blog</span>
          <h1 style={{ marginTop: 16 }}>Blog</h1>
          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            {posts.map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article className="panel" style={{ padding: 20, transition: "border-color .2s" }}>
                  <h3>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{p.excerpt || "—"}</p>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>{p.date} · /{p.slug}</span>
                </article>
              </Link>
            ))}
          </div>
          <div className="blog-cta" style={{ textAlign: "center" }}><Link className="btn btn-ghost" to="/">Back to portfolio <span>←</span></Link></div>
        </div>
      </main>
    );
  }
  return (
    <main className="blog-main">
      <div className="blog-inner">
        <span className="kicker">~/blog</span>
        <h1>Coming soon</h1>
        <p className="blog-lead">Writing on networking, web development and the projects I ship.</p>
        <div className="term" role="presentation">
          <div className="term-bar">
            <span className="t-dot" /><span className="t-dot" /><span className="t-dot" />
            <span className="t-title">blog — draft</span>
          </div>
          <div className="term-body">
            <p><span className="t-prompt">nur@allhi:~/blog</span>$ <span className="t-cmd">git status</span></p>
            <p className="t-out"><span className="t-ok">[pending]</span> 3 drafts queued · first post being written</p>
            <p><span className="t-prompt">nur@allhi:~/blog</span>$ <span className="t-caret">▋</span></p>
          </div>
        </div>
        <div className="blog-cta">
          <Link className="btn btn-ghost" to="/">Back to portfolio <span>←</span></Link>
        </div>
      </div>
    </main>
  );
}
