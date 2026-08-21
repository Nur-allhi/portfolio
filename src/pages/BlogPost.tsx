import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import "../pages/Blog.css";

type Post = { title: string; slug: string; excerpt: string; content: string; date: string; cover?: string };
function mdToHtml(md: string) {
  return md.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`(.+?)`/g, "<code>$1</code>").replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>");
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const q = query(collection(db, "blog"), where("slug", "==", slug), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) setNotFound(true);
      else setPost(snap.docs[0].data() as Post);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <main className="blog-main"><div className="blog-inner"><p style={{ color: "var(--muted)" }}>Loading…</p></div></main>;
  if (notFound || !post) return (
    <main className="blog-main"><div className="blog-inner">
      <h1>Not found</h1><p style={{ color: "var(--muted)", marginTop: 8 }}>No post at /{slug}</p>
      <div className="blog-cta"><Link className="btn btn-ghost" to="/blog">Back to blog ←</Link></div>
    </div></main>
  );

  return (
    <main className="blog-main" style={{ placeItems: "start", paddingTop: "calc(var(--nav-h) + 32px)" }}>
      <div className="blog-inner" style={{ textAlign: "left", maxWidth: 760 }}>
        <ScrollReveal><Link to="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>← Back to blog</Link></ScrollReveal>
        <ScrollReveal delay=".06s"><h1 style={{ marginTop: 16, fontSize: "clamp(28px,5vw,42px)" }}>{post.title}</h1></ScrollReveal>
        <ScrollReveal delay=".12s"><p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", marginTop: 8 }}>{post.date} · /{post.slug}</p></ScrollReveal>
        {post.cover && <ScrollReveal delay=".18s"><img src={post.cover} alt={post.title} style={{ width: "100%", borderRadius: "var(--rad)", marginTop: 20, border: "1px solid var(--border)" }} /></ScrollReveal>}
        {post.excerpt && <ScrollReveal delay=".24s"><p style={{ color: "var(--muted)", marginTop: 16, fontStyle: "italic" }}>{post.excerpt}</p></ScrollReveal>}
        <ScrollReveal delay=".30s"><div className="panel" style={{ marginTop: 20, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: mdToHtml(post.content || "") }} /></ScrollReveal>
      </div>
    </main>
  );
}
