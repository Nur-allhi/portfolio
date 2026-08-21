import "./Blog.css";

export function Blog() {
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
          <a className="btn btn-ghost" href="/">Back to portfolio <span>←</span></a>
        </div>
      </div>
    </main>
  );
}
